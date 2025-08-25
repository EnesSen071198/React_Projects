import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types';
import { saveTodos, loadTodos } from '../../utils/storage';

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: loadTodos(),
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
      saveTodos(state.items);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date();
        if (todo.completed) {
          todo.completedAt = new Date();
          todo.status = 'completed';
        } else {
          todo.completedAt = undefined;
          todo.status = 'not_started';
        }
      }
      saveTodos(state.items);
    },
    updateTodo: (state, action: PayloadAction<Partial<Todo> & { id: string }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload, updatedAt: new Date() };
      }
      saveTodos(state.items);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveTodos(state.items);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      saveTodos(state.items);
    },
    updateTodoStatus: (state, action: PayloadAction<{id: string, status: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled'}>) => {
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.status = action.payload.status;
        todo.updatedAt = new Date();
        if (action.payload.status === 'completed') {
          todo.completed = true;
          todo.completedAt = new Date();
        } else {
          todo.completed = false;
          todo.completedAt = undefined;
        }
      }
      saveTodos(state.items);
    },
  },
});

export const { addTodo, toggleTodo, updateTodo, deleteTodo, setTodos, updateTodoStatus } = todosSlice.actions;
export default todosSlice.reducer;