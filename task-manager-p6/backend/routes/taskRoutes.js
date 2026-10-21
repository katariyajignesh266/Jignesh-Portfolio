const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { validateTaskInput } = require('../middleware/validateInput');

// ---------------------------------------------------------------------------
// Practical 7: Protect all task routes with JWT authentication middleware
// ---------------------------------------------------------------------------
router.use(auth);

router.route('/')
  .get(getAllTasks)
  .post(validateTaskInput, createTask);

router.route('/:id')
  .get(validateObjectId, getTaskById)
  .put(validateObjectId, validateTaskInput, updateTask)
  .delete(validateObjectId, deleteTask);

module.exports = router;
