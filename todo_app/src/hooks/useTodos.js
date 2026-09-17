import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAuth } from '../context/AuthContext';

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoApi,
} from '../services/todoService';

function useTodos() {
  const { token } = useAuth();

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Load todos from the backend
  useEffect(() => {
    if (!token) {
      setTodos([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadTodos = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await getTodos(token);

        if (isMounted) {
          setTodos(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTodos();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

// Add a todo
const addTodo = async (title) => {
  setError('');

  try {
    const newTodo = await createTodo(title, token);

    setTodos((currentTodos) => [
      newTodo,
      ...currentTodos,
    ]);

    return newTodo;
  } catch (error) {
    setError(error.message);
    throw error;
  }
};

  // Complete / Undo a todo
  const toggleTodo = async (id) => {
  const todo = todos.find((item) => item._id === id);

  if (!todo) {
    return;
  }

  setError('');

  try {
    const updatedTodo = await updateTodo(
      id,
      {
        title: todo.title,
        completed: !todo.completed,
      },
      token
    );

    setTodos((currentTodos) =>
      currentTodos.map((item) =>
        item._id === id ? updatedTodo : item
      )
    );

    return updatedTodo;
  } catch (error) {
    setError(error.message);
    throw error;
  }
};

  // Delete a todo
  const deleteTodo = async (id) => {
  setError('');

  try {
    const result = await deleteTodoApi(id, token);

    setTodos((currentTodos) =>
      currentTodos.filter(
        (todo) => todo._id !== id
      )
    );

    return result;
  } catch (error) {
    setError(error.message);
    throw error;
  }
};

  // Edit a todo
  const editTodo = async (id, title) => {
  const todo = todos.find((item) => item._id === id);

  if (!todo) {
    return;
  }

  setError('');

  try {
    const updatedTodo = await updateTodo(
      id,
      {
        title,
        completed: todo.completed,
      },
      token
    );

    setTodos((currentTodos) =>
      currentTodos.map((item) =>
        item._id === id ? updatedTodo : item
      )
    );

    return updatedTodo;
  } catch (error) {
    setError(error.message);
    throw error;
  }
};

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    isLoading,
    error,
  };
}

export default useTodos;