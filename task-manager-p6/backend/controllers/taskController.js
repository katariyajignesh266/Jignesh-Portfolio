const Task = require('../models/Task');

// ---------------------------------------------------------------------------
// Practical 7: Task Controller (JWT Protected & User Associated)
// ---------------------------------------------------------------------------

// @desc    Get all tasks (associated with the logged-in user or legacy unassigned)
// @route   GET /tasks or GET /api/tasks
// @access  Private (JWT required)
exports.getAllTasks = async (req, res, next) => {
  try {
    const filter = req.user
      ? { $or: [{ user: req.user.id }, { user: { $exists: false } }, { user: null }] }
      : {};
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single task by ID
// @route   GET /tasks/:id or GET /api/tasks/:id
// @access  Private (JWT required)
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id ${req.params.id}`
      });
    }

    // Check user ownership if task belongs to a specific user
    if (task.user && req.user && task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this task'
      });
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new task (associated with the logged-in user)
// @route   POST /tasks or POST /api/tasks
// @access  Private (JWT required)
exports.createTask = async (req, res, next) => {
  try {
    if (req.user) {
      req.body.user = req.user.id;
    }
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a task by ID
// @route   PUT /tasks/:id or PUT /api/tasks/:id
// @access  Private (JWT required)
exports.updateTask = async (req, res, next) => {
  try {
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id ${req.params.id}`
      });
    }

    // Check ownership if task has an assigned user
    if (existingTask.user && req.user && existingTask.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this task'
      });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a task by ID
// @route   DELETE /tasks/:id or DELETE /api/tasks/:id
// @access  Private (JWT required)
exports.deleteTask = async (req, res, next) => {
  try {
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id ${req.params.id}`
      });
    }

    // Check ownership if task has an assigned user
    if (existingTask.user && req.user && existingTask.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this task'
      });
    }

    await existingTask.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
