const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required.'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: "Priority must be restricted to 'low', 'medium', or 'high'."
    },
    default: 'medium'
  }
});

// Pre-save hook that automatically trims whitespace from the title field
taskSchema.pre('save', function() {
  if (this.title && typeof this.title === 'string') {
    this.title = this.title.trim();
  }
});

// Pre-update hook that automatically trims whitespace from the title field during updates
taskSchema.pre('findOneAndUpdate', function() {
  const update = this.getUpdate();
  if (update) {
    if (update.title && typeof update.title === 'string') {
      update.title = update.title.trim();
    } else if (update.$set && update.$set.title && typeof update.$set.title === 'string') {
      update.$set.title = update.$set.title.trim();
    }
  }
});

module.exports = mongoose.model('Task', taskSchema);
