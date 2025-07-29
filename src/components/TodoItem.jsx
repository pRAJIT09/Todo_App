import { useState } from 'react';
import { useTodos } from '../context/TodoContext';

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

export function TodoItem({ todo }) {
  const { updateTodo, toggleComplete, deleteTodo, isLoading } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDue, setEditDue] = useState(todo.dueDate || '');

  async function handleToggle() {
    await toggleComplete(todo.id);
  }

  async function handleDelete() {
    if (!confirm('Delete this todo?')) return;
    await deleteTodo(todo.id);
  }

  function startEdit() {
    setEditText(todo.text);
    setEditDue(todo.dueDate || '');
    setIsEditing(true);
  }

  async function saveEdit(e) {
    e.preventDefault();
    await updateTodo(todo.id, { text: editText.trim() || todo.text, dueDate: editDue || null });
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  return (
    <li className="flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      {isEditing ? (
        <form onSubmit={saveEdit} className="flex w-full flex-col gap-2 sm:flex-row sm:items-end">
          <input
            type="text"
            className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="date"
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            value={editDue}
            onChange={(e) => setEditDue(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              disabled={isLoading}
              className="rounded-md bg-gray-300 px-3 py-1 text-xs font-semibold text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <input
              id={`chk-${todo.id}`}
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              disabled={isLoading}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`chk-${todo.id}`} className="select-none text-sm leading-5">
              <span className={todo.completed ? 'line-through opacity-60' : ''}>{todo.text}</span>
              {todo.dueDate && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">Due: {formatDate(todo.dueDate)}</span>
              )}
            </label>
          </div>
          <div className="flex gap-2 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={startEdit}
              disabled={isLoading}
              className="rounded-md bg-yellow-500 px-3 py-1 text-xs font-semibold text-white hover:bg-yellow-600 disabled:opacity-60"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}