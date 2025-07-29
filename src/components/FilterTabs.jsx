import { useTodos } from '../context/TodoContext';
import { clsx } from 'clsx';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
];

const SORTS = [
  { value: 'created-desc', label: 'Newest' },
  { value: 'created-asc', label: 'Oldest' },
  { value: 'due-asc', label: 'Due Soon' },
  { value: 'due-desc', label: 'Due Latest' },
];

export function FilterTabs() {
  const { filter, setFilter, sort, setSort, isLoading } = useTodos();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            disabled={isLoading}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'rounded-md border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-60',
              filter === f.value && 'border-blue-600 text-blue-600'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm">Sort:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          disabled={isLoading}
          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}