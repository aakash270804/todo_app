import apiClient from './apiClient';

// Register a user
export const registerUser = async (userData) => {
  return apiClient('/auth/register', {
    method: 'POST',
    body: userData,
  });
};

// Login a user
export const loginUser = async (credentials) => {
  return apiClient('/auth/login', {
    method: 'POST',
    body: credentials,
  });
};