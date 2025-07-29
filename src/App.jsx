import { TodoProvider } from './context/TodoContext';
import { TodoForm } from './components/TodoForm';
import { FilterTabs } from './components/FilterTabs';
import { PendingCount } from './components/PendingCount';
import { TodoList } from './components/TodoList';
import { LoadingOverlay } from './components/LoadingOverlay';
import { DarkModeToggle } from './components/DarkModeToggle';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <TodoProvider>
      <LoadingOverlay />
      <Toaster position="top-right" />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:py-16 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Todo App</h1>
          <div className="flex items-center gap-4">
            <PendingCount />
            <DarkModeToggle />
          </div>
        </header>

        <section className="mb-8">
          <TodoForm />
        </section>

        <section className="mb-4">
          <FilterTabs />
        </section>

        <section>
          <TodoList />
        </section>
      </main>
    </TodoProvider>
  );
}

export default App;