import TodoItem from '../TodoItem/TodoItem';

function TodoList({
  todos,
  filter,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}) {
  if (todos.length === 0) {
    const emptyMessages = {
      all: 'No todos yet.',
      active: 'No active todos.',
      completed: 'No completed todos.',
    };

    return (
      <p className="mt-8 text-center text-gray-500">
        {emptyMessages[filter]}
      </p>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;