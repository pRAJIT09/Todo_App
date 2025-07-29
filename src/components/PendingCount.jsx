import { useTodos } from '../context/TodoContext';

export function PendingCount() {
  const { pendingCount } = useTodos();
  return (
    <div className="text-sm text-gray-600 dark:text-gray-300">
      Pending: <span className="font-semibold">{pendingCount}</span>
    </div>
  );
}