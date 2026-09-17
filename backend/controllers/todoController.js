const Todo = require('../models/Todo');

// Get todos belonging to the logged-in user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    console.error('Get todos error:', error);

    res.status(500).json({
      message: 'Failed to fetch todos',
    });
  }
};

// Create a todo for the logged-in user
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Todo title is required',
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      user: req.user.userId,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Create todo error:', error);

    res.status(500).json({
      message: 'Failed to create todo',
    });
  }
};

// Update a todo belonging to the logged-in user
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId,
      },
      {
        title,
        completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error('Update todo error:', error);

    res.status(500).json({
      message: 'Failed to update todo',
    });
  }
};

// Delete a todo belonging to the logged-in user
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }

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
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};