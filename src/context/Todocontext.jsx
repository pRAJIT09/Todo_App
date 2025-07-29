import { createcontext, usecontext, useEffect, useMemo, useReducer, useState } from 'react';
import toast from 'react-hot-toast';

// ------------------ Types & Helpers ------------------
// Todo shape: { id, text, completed, dueDate, createdAt }

function uuid() {
  // Use browser crypto if available
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  // Fallback simple uid
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const LS_KEY_TODOS = 'todoapp.todos.v1';
const LS_KEY_FILTER = 'todoapp.filter.v1';
const LS_KEY_SORT = 'todoapp.sort.v1';

// ------------------ Reducer ------------------
function todosReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload || [];
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload.updates } : t));
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload.id);
    default:
      return state;
  }
}

// ------------------ Context ------------------
const Todocontext = createcontext(null);

export function useTodos() {
  const ctx = usecontext(Todocontext);
  if (!ctx) throw new Error('useTodos must be used within <TodoProvider>');
  return ctx;
}

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('created-desc');
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_KEY_TODOS) || '[]');
      dispatch({ type: 'INIT', payload: stored });
      const storedFilter = localStorage.getItem(LS_KEY_FILTER) || 'all';
      setFilter(storedFilter);
      const storedSort = localStorage.getItem(LS_KEY_SORT) || 'created-desc';
      setSort(storedSort);
    } catch (err) {
      console.error('Failed to load todos:', err);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY_TODOS, JSON.stringify(todos));
    } catch {}
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(LS_KEY_FILTER, filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem(LS_KEY_SORT, sort);
  }, [sort]);

  // Simulated async wrapper for UX loading indicator
  function withLoading(fn) {
    return async (...args) => {
      setIsLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 300));
        return fn(...args);
      } finally {
        setIsLoading(false);
      }
    };
  }

  // CRUD APIs
  const addTodo = withLoading((text, dueDate = null) => {
    const trimmed = text.trim();
    if (!trimmed) {
      toast.error('Todo cannot be empty.');
      return;
    }
    const newTodo = {
      id: uuid(),
      text: trimmed,
      completed: false,
      dueDate: dueDate || null,
      createdAt: Date.now(),
    };
    dispatch({ type: 'ADD', payload: newTodo });
    toast.success('Todo added');
  });

  const updateTodo = withLoading((id, updates) => {
    dispatch({ type: 'UPDATE', payload: { id, updates } });
    toast.success('Todo updated');
  });

  const toggleComplete = withLoading((id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    dispatch({ type: 'UPDATE', payload: { id, updates: { completed: !todo.completed } } });
    toast.success(todo?.completed ? 'Marked pending' : 'Marked complete');
  });

  const deleteTodo = withLoading((id) => {
    dispatch({ type: 'DELETE', payload: { id } });
    toast.success('Todo deleted');
  });

  // Derived lists
  const filteredTodos = useMemo(() => {
    let list = [...todos];
    if (filter === 'completed') list = list.filter((t) => t.completed);
    if (filter === 'pending') list = list.filter((t) => !t.completed);

    switch (sort) {
      case 'created-asc':
        list.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'created-desc':
        list.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'due-asc':
        list.sort((a, b) => {
          const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          return da - db;
        });
        break;
      case 'due-desc':
        list.sort((a, b) => {
          const da = a.dueDate ? new Date(a.dueDate).getTime() : -Infinity;
          const db = b.dueDate ? new Date(b.dueDate).getTime() : -Infinity;
          return db - da;
        });
        break;
      default:
        break;
    }
    return list;
  }, [todos, filter, sort]);

  const pendingCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  const value = {
    todos,
    filteredTodos,
    filter,
    setFilter,
    sort,
    setSort,
    pendingCount,
    isLoading,
    addTodo,
    updateTodo,
    toggleComplete,
    deleteTodo,
  };

  return <Todocontext.Provider value={value}>{children}</Todocontext.Provider>;
}