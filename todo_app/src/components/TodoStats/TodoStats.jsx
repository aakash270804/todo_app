function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return (
    <div className="mt-6 flex justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
      <span className="text-gray-600">
        Total: <strong className="text-gray-900">{total}</strong>
      </span>

      <span className="text-blue-600">
        Active: <strong>{active}</strong>
      </span>

      <span className="text-green-600">
        Completed: <strong>{completed}</strong>
      </span>
    </div>
  );
}

export default TodoStats;