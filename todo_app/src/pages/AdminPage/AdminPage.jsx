import { useAuth } from '../../context/AuthContext';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminStats from '../../components/AdminStats/AdminStats';

import { useEffect, useState } from 'react';

import {    
  getUsers,
  updateUserRole,
  deleteUser,
  getAllTodos,
  deleteAnyTodo,
} from '../../services/adminService';

function AdminPage() {
  const { token, user } = useAuth();

  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);


  const [error, setError] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [deletingTodoId, setDeletingTodoId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    const loadTodos = async () => {
      try {
        const data = await getAllTodos(token);
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingTodos(false);
      }
    };

    loadUsers();
    loadTodos();
  }, [token]);

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';

    setError('');
    setUpdatingUserId(userId);

    try {
      const data = await updateUserRole(
        userId,
        newRole,
        token
      );

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser._id === userId
            ? {
                ...currentUser,
                role: data.user.role,
              }
            : currentUser
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${userName}? Their todos will also be deleted.`
    );

    if (!confirmed) {
      return;
    }

    setError('');
    setDeletingUserId(userId);

    try {
      await deleteUser(userId, token);

      setUsers((currentUsers) =>
        currentUsers.filter(
          (currentUser) => currentUser._id !== userId
        )
      );

      setTodos((currentTodos) =>
        currentTodos.filter(
          (todo) => todo.user?._id !== userId
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleDeleteTodo = async (todoId, todoTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${todoTitle}"?`
    );

    if (!confirmed) {
      return;
    }

    setError('');
    setDeletingTodoId(todoId);

    try {
      await deleteAnyTodo(todoId, token);

      setTodos((currentTodos) =>
        currentTodos.filter(
          (todo) => todo._id !== todoId
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingTodoId(null);
    }
  };

  if (isLoadingUsers || isLoadingTodos) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Loading admin dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <AdminHeader />

        {/* Statistics */}
        <AdminStats
        users={users}
        todos={todos}
        />

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Users Section */}
        <section className="mb-10 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Registered Users
            </h2>
          </div>

          {users.length === 0 ? (
            <p className="px-6 py-8 text-center text-gray-500">
              No users found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Name
                    </th>

                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Email
                    </th>

                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Role
                    </th>

                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((currentUser) => {
                    const isCurrentUser =
                      currentUser._id === user?.id;

                    const isUpdating =
                      updatingUserId === currentUser._id;

                    const isDeleting =
                      deletingUserId === currentUser._id;

                    return (
                      <tr
                        key={currentUser._id}
                        className="border-t border-gray-100"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {currentUser.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {currentUser.email}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              currentUser.role === 'admin'
                                ? 'bg-purple-50 text-purple-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {currentUser.role}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {isCurrentUser ? (
                            <span className="text-xs text-gray-400">
                              Current account
                            </span>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRoleChange(
                                    currentUser._id,
                                    currentUser.role
                                  )
                                }
                                disabled={
                                  isUpdating || isDeleting
                                }
                                className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isUpdating
                                  ? 'Updating...'
                                  : currentUser.role === 'admin'
                                    ? 'Make User'
                                    : 'Make Admin'}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteUser(
                                    currentUser._id,
                                    currentUser.name
                                  )
                                }
                                disabled={
                                  isUpdating || isDeleting
                                }
                                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isDeleting
                                  ? 'Deleting...'
                                  : 'Delete'}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Todos Section */}
        <section className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              All Todos
            </h2>
          </div>

          {todos.length === 0 ? (
            <p className="px-6 py-8 text-center text-gray-500">
              No todos found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Todo
                    </th>

                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Owner
                    </th>

                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Status
                    </th>

                    <th className="px-6 py-3 text-sm font-medium text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {todos.map((todo) => {
                    const isDeleting =
                      deletingTodoId === todo._id;

                    return (
                      <tr
                        key={todo._id}
                        className="border-t border-gray-100"
                      >
                        <td
                          className={`px-6 py-4 text-sm ${
                            todo.completed
                              ? 'text-gray-400 line-through'
                              : 'text-gray-800'
                          }`}
                        >
                          {todo.title}
                        </td>

                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {todo.user?.name || 'Unknown user'}
                            </p>

                            <p className="text-xs text-gray-500">
                              {todo.user?.email || 'Unknown email'}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              todo.completed
                                ? 'bg-green-50 text-green-600'
                                : 'bg-yellow-50 text-yellow-600'
                            }`}
                          >
                            {todo.completed
                              ? 'Completed'
                              : 'Active'}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteTodo(
                                todo._id,
                                todo.title
                              )
                            }
                            disabled={isDeleting}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isDeleting
                              ? 'Deleting...'
                              : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminPage;