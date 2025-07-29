import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodoContext';

export function TodoList() {
  const { filteredTodos } = useTodos();
  if (!filteredTodos.length) {
    return (
      <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        No todos found.
      </div>
    );
  }
  return (
    <ul className="mt-4 space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}