import { Todo } from '../types';
import { CalendarEvent } from '../types/calendar';
import { TaskCategory } from '../types/categories';

// LocalStorage anahtarları
const STORAGE_KEYS = {
  TODOS: 'taskmaster_todos',
  CATEGORIES: 'taskmaster_categories',
  CALENDAR_EVENTS: 'taskmaster_events',
  POMODORO_STATS: 'taskmaster_pomodoro_stats',
  USER_PREFERENCES: 'taskmaster_preferences',
  NOTES: 'taskmaster_notes',
} as const;

// Generic storage functions
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Storage save error:', error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Storage load error:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Storage remove error:', error);
  }
};

// Specific storage functions
export const saveTodos = (todos: Todo[]): void => {
  saveToStorage(STORAGE_KEYS.TODOS, todos);
};

export const loadTodos = (): Todo[] => {
  return loadFromStorage(STORAGE_KEYS.TODOS, []);
};

export const saveCategories = (categories: TaskCategory[]): void => {
  saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
};

export const loadCategories = (): TaskCategory[] => {
  return loadFromStorage(STORAGE_KEYS.CATEGORIES, []);
};

export const saveCalendarEvents = (events: CalendarEvent[]): void => {
  saveToStorage(STORAGE_KEYS.CALENDAR_EVENTS, events);
};

export const loadCalendarEvents = (): CalendarEvent[] => {
  return loadFromStorage(STORAGE_KEYS.CALENDAR_EVENTS, []);
};

export const savePomodoroStats = (stats: any): void => {
  saveToStorage(STORAGE_KEYS.POMODORO_STATS, stats);
};

export const loadPomodoroStats = (): any => {
  return loadFromStorage(STORAGE_KEYS.POMODORO_STATS, {
    totalSessions: 0,
    totalWorkTime: 0,
    dailyStats: [],
    weeklyStats: [],
    streaks: {
      current: 0,
      longest: 0,
      history: [],
    },
  });
};

export const saveUserPreferences = (preferences: any): void => {
  saveToStorage(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

export const loadUserPreferences = (): any => {
  return loadFromStorage(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'system',
    language: 'tr',
    pomodoroSettings: {
      workDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      sessionsUntilLongBreak: 4,
    },
  });
};

export const saveNotes = (notes: any[]): void => {
  saveToStorage(STORAGE_KEYS.NOTES, notes);
};

export const loadNotes = (): any[] => {
  return loadFromStorage(STORAGE_KEYS.NOTES, []);
};

// Clear all data
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
};

// Export/Import functionality
export const exportAllData = (): string => {
  const data = {
    todos: loadTodos(),
    categories: loadCategories(),
    events: loadCalendarEvents(),
    pomodoroStats: loadPomodoroStats(),
    preferences: loadUserPreferences(),
    notes: loadNotes(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

export const importAllData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.todos) saveTodos(data.todos);
    if (data.categories) saveCategories(data.categories);
    if (data.events) saveCalendarEvents(data.events);
    if (data.pomodoroStats) savePomodoroStats(data.pomodoroStats);
    if (data.preferences) saveUserPreferences(data.preferences);
    if (data.notes) saveNotes(data.notes);
    
    return true;
  } catch (error) {
    console.error('Import error:', error);
    return false;
  }
};