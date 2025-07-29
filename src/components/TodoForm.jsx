import { useState } from 'react';
import { useTodos } from '../context/TodoContext';

export function TodoForm() {
  const { addTodo, isLoading } = useTodos();
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await addTodo(text, dueDate || null);
    setText('');
    setDueDate('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="todo-text" className="mb-1 block text-sm font-medium">Todo</label>
        <input
          id="todo-text"
          type="text"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="What do you need to do?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div>
        <label htmlFor="todo-due" className="mb-1 block text-sm font-medium">Due</label>
        <input
          id="todo-due"
          type="date"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="h-10 w-full rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        Add Todo
      </button>
    </form>
  );
}