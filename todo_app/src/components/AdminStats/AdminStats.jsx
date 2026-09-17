function AdminStats({ users, todos }) {
  const totalUsers = users.length;
  const totalTodos = todos.length;

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const activeTodos = totalTodos - completedTodos;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
    },
    {
      label: 'Total Todos',
      value: totalTodos,
    },
    {
      label: 'Completed',
      value: completedTodos,
    },
    {
      label: 'Active',
      value: activeTodos,
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;