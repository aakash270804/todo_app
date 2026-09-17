import apiClient from './apiClient';

// Get all users
export const getUsers = async (token) => {
  return apiClient('/admin/users', {
    method: 'GET',
    token,
  });
};

// Update a user's role
export const updateUserRole = async (userId, role, token) => {
  return apiClient(`/admin/users/${userId}/role`, {
    method: 'PATCH',
    token,
    body: {
      role,
    },
  });
};

// Delete a user
export const deleteUser = async (userId, token) => {
  return apiClient(`/admin/users/${userId}`, {
    method: 'DELETE',
    token,
  });
};

// Get all todos — Admin only
export const getAllTodos = async (token) => {
  return apiClient('/admin/todos', {
    method: 'GET',
    token,
  });
};

// Delete any todo — Admin only
export const deleteAnyTodo = async (todoId, token) => {
  return apiClient(`/admin/todos/${todoId}`, {
    method: 'DELETE',
    token,
  });
};