import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteCategory, NoteFilter, NoteSortOption } from '../../types/notes';

interface NotesState {
  items: Note[];
  categories: NoteCategory[];
  selectedNote?: string;
  filter: NoteFilter;
  sort: NoteSortOption;
  view: 'grid' | 'list';
}

const defaultCategories: NoteCategory[] = [
  {
    id: 'personal',
    name: 'Kişisel',
    color: '#4CAF50',
    icon: 'Person',
    order: 0,
  },
  {
    id: 'work',
    name: 'İş',
    color: '#2196F3',
    icon: 'Work',
    order: 1,
  },
  {
    id: 'study',
    name: 'Eğitim',
    color: '#9C27B0',
    icon: 'School',
    order: 2,
  },
  {
    id: 'ideas',
    name: 'Fikirler',
    color: '#FF9800',
    icon: 'LightBulb',
    order: 3,
  },
];

const initialState: NotesState = {
  items: [],
  categories: defaultCategories,
  filter: {},
  sort: {
    field: 'updatedAt',
    direction: 'desc',
  },
  view: 'grid',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.items.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.items.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        // Versiyon kontrolü ve geçmiş kaydı
        const oldNote = state.items[index];
        const newNote = {
          ...action.payload,
          version: oldNote.version + 1,
          history: [
            ...(oldNote.history || []),
            {
              id: crypto.randomUUID(),
              content: oldNote.content,
              updatedAt: oldNote.updatedAt,
            },
          ],
        };
        state.items[index] = newNote;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(note => note.id !== action.payload);
    },
    setSelectedNote: (state, action: PayloadAction<string | undefined>) => {
      state.selectedNote = action.payload;
    },
    setFilter: (state, action: PayloadAction<NoteFilter>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<NoteSortOption>) => {
      state.sort = action.payload;
    },
    setView: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.view = action.payload;
    },
    togglePinNote: (state, action: PayloadAction<string>) => {
      const note = state.items.find(note => note.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
        note.updatedAt = new Date();
      }
    },
    toggleArchiveNote: (state, action: PayloadAction<string>) => {
      const note = state.items.find(note => note.id === action.payload);
      if (note) {
        note.isArchived = !note.isArchived;
        note.updatedAt = new Date();
      }
    },
    addCategory: (state, action: PayloadAction<NoteCategory>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<NoteCategory>) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
      // İlgili notların kategorisini kaldır
      state.items.forEach(note => {
        if (note.category === action.payload) {
          note.category = undefined;
        }
      });
    },
    reorderCategories: (state, action: PayloadAction<{ id: string; order: number }[]>) => {
      action.payload.forEach(({ id, order }) => {
        const category = state.categories.find(cat => cat.id === id);
        if (category) {
          category.order = order;
        }
      });
    },
    addTag: (state, action: PayloadAction<{ noteId: string; tag: string }>) => {
      const note = state.items.find(note => note.id === action.payload.noteId);
      if (note && !note.tags.includes(action.payload.tag)) {
        note.tags.push(action.payload.tag);
        note.updatedAt = new Date();
      }
    },
    removeTag: (state, action: PayloadAction<{ noteId: string; tag: string }>) => {
      const note = state.items.find(note => note.id === action.payload.noteId);
      if (note) {
        note.tags = note.tags.filter(tag => tag !== action.payload.tag);
        note.updatedAt = new Date();
      }
    },
    addCollaborator: (
      state,
      action: PayloadAction<{ noteId: string; collaborator: Note['collaborators'][0] }>
    ) => {
      const note = state.items.find(note => note.id === action.payload.noteId);
      if (note) {
        if (!note.collaborators) {
          note.collaborators = [];
        }
        note.collaborators.push(action.payload.collaborator);
        note.updatedAt = new Date();
      }
    },
    removeCollaborator: (
      state,
      action: PayloadAction<{ noteId: string; collaboratorId: string }>
    ) => {
      const note = state.items.find(note => note.id === action.payload.noteId);
      if (note && note.collaborators) {
        note.collaborators = note.collaborators.filter(
          c => c.id !== action.payload.collaboratorId
        );
        note.updatedAt = new Date();
      }
    },
    updateCollaboratorRole: (
      state,
      action: PayloadAction<{
        noteId: string;
        collaboratorId: string;
        role: 'viewer' | 'editor';
      }>
    ) => {
      const note = state.items.find(note => note.id === action.payload.noteId);
      if (note && note.collaborators) {
        const collaborator = note.collaborators.find(
          c => c.id === action.payload.collaboratorId
        );
        if (collaborator) {
          collaborator.role = action.payload.role;
          note.updatedAt = new Date();
        }
      }
    },
    reorderNotes: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.items.splice(startIndex, 1);
      state.items.splice(endIndex, 0, removed);
      
      // Order değerlerini güncelle
      state.items.forEach((note, index) => {
        note.order = index;
        note.updatedAt = new Date();
      });
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  setSelectedNote,
  setFilter,
  setSort,
  setView,
  togglePinNote,
  toggleArchiveNote,
  addCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  addTag,
  removeTag,
  addCollaborator,
  removeCollaborator,
  updateCollaboratorRole,
  reorderNotes,
} = notesSlice.actions;

export default notesSlice.reducer;