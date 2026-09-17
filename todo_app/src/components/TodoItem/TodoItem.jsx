import { useState } from 'react';

function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleSave = async () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    setIsSaving(true);

    try {
      await onEditTodo(todo._id, trimmedTitle);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  const handleToggle = async () => {
    setIsToggling(true);

    try {
      await onToggleTodo(todo._id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${todo.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDeleteTodo(todo._id);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(event) =>
              setEditTitle(event.target.value)
            }
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            autoFocus
            disabled={isSaving}
          />

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  const isBusy =
    isToggling || isDeleting;

  return (
    <li className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <span
        className={`min-w-0 flex-1 break-words ${
          todo.completed
            ? 'text-gray-400 line-through'
            : 'text-gray-800'
        }`}
      >
        {todo.title}
      </span>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isBusy}
          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isToggling
            ? 'Updating...'
            : todo.completed
              ? 'Undo'
              : 'Complete'}
        </button>

        <button
          type="button"
          onClick={handleStartEditing}
          disabled={isBusy}
          className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isBusy}
          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
}

export default TodoItem;