const express = require('express');

const {
  getUsers,
  updateUserRole,
  deleteUser,
  getAllTodos,
  deleteAnyTodo,
} = require('../controllers/adminController');

const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

const router = express.Router();

// Get all users — Admin only
router.get('/users', protect, adminOnly, getUsers);

// Change a user's role — Admin only
router.patch('/users/:id/role', protect, adminOnly, updateUserRole);

// Delete a user and their todos — Admin only
router.delete('/users/:id', protect, adminOnly, deleteUser);

// Get all todos — Admin only
router.get('/todos', protect, adminOnly, getAllTodos);

// Delete any todo — Admin only
router.delete('/todos/:id', protect, adminOnly, deleteAnyTodo);

module.exports = router;