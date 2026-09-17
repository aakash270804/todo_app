const express = require('express');

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getTodos);
router.post('/', protect, createTodo);
router.patch('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);

module.exports = router;