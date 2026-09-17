const User = require('../models/User');
const Todo = require('../models/Todo');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error('Get users error:', error);

    res.status(500).json({
      message: 'Failed to fetch users',
    });
  }
};

// Change a user's role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        message: 'Invalid role',
      });
    }

    // Find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Prevent admin from changing their own role
    if (user._id.toString() === req.user.userId.toString()) {
      return res.status(400).json({
        message: 'You cannot change your own role',
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Update user role error:', error);

    res.status(500).json({
      message: 'Failed to update user role',
    });
  }
};

// Delete a user and all of their todos
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.userId.toString()) {
      return res.status(400).json({
        message: 'You cannot delete your own account',
      });
    }

    // Delete all todos belonging to this user
    await Todo.deleteMany({
      user: user._id,
    });

    // Delete the user
    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      message: 'User and their todos deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);

    res.status(500).json({
      message: 'Failed to delete user',
    });
  }
};

// Get all todos — Admin only
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    console.error('Get all todos error:', error);

    res.status(500).json({
      message: 'Failed to fetch all todos',
    });
  }
};

// Delete any todo — Admin only
const deleteAnyTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error('Delete todo error:', error);

    res.status(500).json({
      message: 'Failed to delete todo',
    });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
  deleteUser,
  getAllTodos,
  deleteAnyTodo,
};