import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || isAdding) {
      return;
    }

    setIsAdding(true);

    try {
      await onAddTodo(trimmedTitle);
      setTitle('');
    } catch {
      // Error is handled by useTodos and displayed by TodoPage.
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex gap-3"
    >
      <input
        type="text"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        placeholder="Add a new todo..."
        disabled={isAdding}
        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
      />

      <button
        type="submit"
        disabled={isAdding || !title.trim()}
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isAdding ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}

export default TodoForm;