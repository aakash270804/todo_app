import useTodos from '../../hooks/useTodos';

import TodoForm from '../../components/TodoForm/TodoForm';
import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoList from '../../components/TodoList/TodoList';
import TodoFilter from '../../components/TodoFilter/TodoFilter';
import TodoStats from '../../components/TodoStats/TodoStats';

function TodoPage() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    isLoading,
    error,
  } = useTodos();

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <TodoHeader />

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {/* Add Todo */}
        <TodoForm onAddTodo={addTodo} />

        {/* Filters */}
        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Todo List */}
        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Loading your todos...
            </p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        )}

        {/* Stats */}
        {!isLoading && <TodoStats todos={allTodos} />}
      </div>
    </main>
  );
}

export default TodoPage;