import apiClient from './apiClient';

// Get all todos
export const getTodos = async (token) => {
  return apiClient('/todos', {
    method: 'GET',
    token,
  });
};

// Create a todo
export const createTodo = async (title, token) => {
  return apiClient('/todos', {
    method: 'POST',
    token,
    body: {
      title,
    },
  });
};

// Update a todo
export const updateTodo = async (id, data, token) => {
  return apiClient(`/todos/${id}`, {
    method: 'PATCH',
    token,
    body: data,
  });
};

// Delete a todo
export const deleteTodo = async (id, token) => {
  return apiClient(`/todos/${id}`, {
    method: 'DELETE',
    token,
  });
};