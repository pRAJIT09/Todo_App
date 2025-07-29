import { useTodos } from '../context/TodoContext';
import { Spinner } from './Spinner';

export function LoadingOverlay() {
  const { isLoading } = useTodos();
  if (!isLoading) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <Spinner size={48} />
    </div>
  );
}