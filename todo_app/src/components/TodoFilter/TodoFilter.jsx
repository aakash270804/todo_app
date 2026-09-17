function TodoFilter({ filter, onFilterChange }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="mt-6 flex justify-center">
      <div className="flex rounded-lg bg-gray-100 p-1">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
            className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition ${
              filter === item
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilter;