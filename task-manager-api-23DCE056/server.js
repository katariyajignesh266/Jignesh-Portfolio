require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Establish connection to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task_manager')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 2. Content-Type Validation Middleware for POST/PUT requests
// Rejects requests without a Content-Type: application/json header
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: "Bad Request: Content-Type header must be 'application/json' for POST/PUT requests."
      });
    }
  }
  next();
});


const validateTaskId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Bad Request: Invalid task ID format. Task ID must be a valid 24-character hexadecimal string."
    });
  }
  next();
};


app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});


app.get('/tasks/:id', validateTaskId, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found.` });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});


app.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    
    const newTask = await Task.create({
      title,
      description,
      completed,
      priority
    });
    
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

app.put('/tasks/:id', validateTaskId, async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found.` });
    }
    
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
});

app.delete('/tasks/:id', validateTaskId, async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found.` });
    }
    
    res.status(200).json({
      message: "Task deleted successfully.",
      task: deletedTask
    });
  } catch (err) {
    next(err);
  }
});

app.get('/trigger-error', (req, res, next) => {
  next(new Error("This is a deliberately thrown server error to test global error handling."));
});


app.use((req, res, next) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}. Route not found.` });
});

app.use((err, req, res, next) => {
  console.error("Global Error Caught:");
  console.error(err.stack || err); 
  
  if (err.name === 'ValidationError') {
    const details = {};
    for (let field in err.errors) {
      details[field] = err.errors[field].message;
    }
    return res.status(400).json({
      error: "Validation Error",
      message: "The request data failed schema validation.",
      details
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: "Bad Request",
      message: `Invalid value for field '${err.path}': ${err.value}`
    });
  }

  res.status(500).json({
    error: "Something went wrong",
    message: err.message
  });
});


app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});
