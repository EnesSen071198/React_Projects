import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Fab,
  Menu,
  MenuItem,
} from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
  Label as TagIcon,
  Category as CategoryIcon,
  Archive as ArchiveIcon,
  Folder as FolderIcon,
  FolderSpecial as FolderSpecialIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  setView,
  setSort,
  setFilter,
  setSelectedNote,
  reorderNotes,
} from '../store/slices/notesSlice';
import { NoteSortOption, NoteFilter } from '../types/notes';
import NoteList from '../components/Notes/NoteList';
import NoteGrid from '../components/Notes/NoteGrid';
import NoteForm from '../components/Notes/NoteForm';
import CategoryForm from '../components/Notes/CategoryForm';

const NotesPage = () => {
  const dispatch = useDispatch();
  const {
    items: notes,
    categories,
    view,
    sort,
    filter,
  } = useSelector((state: RootState) => state.notes);

  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: 'grid' | 'list') => {
    if (newView !== null) {
      dispatch(setView(newView));
    }
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (option: NoteSortOption) => {
    dispatch(setSort(option));
    handleSortClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    dispatch(setFilter({ ...filter, search: query }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    if (startIndex !== endIndex) {
      dispatch(reorderNotes({ startIndex, endIndex }));
    }
  };

  const handleFilterChange = (newFilter: Partial<NoteFilter>) => {
    dispatch(setFilter({ ...filter, ...newFilter }));
  };

  const filteredNotes = notes.filter(note => {
    if (filter.search && !note.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !note.content.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    if (filter.categories?.length && !filter.categories.includes(note.category || '')) {
      return false;
    }
    if (filter.tags?.length && !note.tags.some(tag => filter.tags?.includes(tag))) {
      return false;
    }
    if (filter.isArchived !== undefined && note.isArchived !== filter.isArchived) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];
    const direction = sort.direction === 'asc' ? 1 : -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    if (aValue instanceof Date && bValue instanceof Date) {
      return (aValue.getTime() - bValue.getTime()) * direction;
    }
    return 0;
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Üst Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5">Notlar</Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Ara..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <Tooltip title="Izgara Görünümü">
                <GridIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <Tooltip title="Liste Görünümü">
                <ListIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>

          <Tooltip title="Sırala">
            <IconButton onClick={handleSortClick}>
              <SortIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSortClose}
          >
            <MenuItem
              onClick={() => handleSortChange({ field: 'updatedAt', direction: 'desc' })}
              selected={sort.field === 'updatedAt' && sort.direction === 'desc'}
            >
              En Son Güncellenen
            </MenuItem>
            <MenuItem
              onClick={() => handleSortChange({ field: 'createdAt', direction: 'desc' })}
              selected={sort.field === 'createdAt' && sort.direction === 'desc'}
            >
              En Son Oluşturulan
            </MenuItem>
            <MenuItem
              onClick={() => handleSortChange({ field: 'title', direction: 'asc' })}
              selected={sort.field === 'title' && sort.direction === 'asc'}
            >
              Başlığa Göre (A-Z)
            </MenuItem>
            <MenuItem
              onClick={() => handleSortChange({ field: 'title', direction: 'desc' })}
              selected={sort.field === 'title' && sort.direction === 'desc'}
            >
              Başlığa Göre (Z-A)
            </MenuItem>
          </Menu>

          <Tooltip title="Filtrele">
            <IconButton onClick={() => setIsFilterDrawerOpen(true)}>
              <FilterIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Ana İçerik */}
      <Paper sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {view === 'grid' ? (
            <NoteGrid
              notes={filteredNotes}
              onNoteClick={(id) => {
                dispatch(setSelectedNote(id));
                setIsNoteFormOpen(true);
              }}
            />
          ) : (
            <NoteList
              notes={filteredNotes}
              onNoteClick={(id) => {
                dispatch(setSelectedNote(id));
                setIsNoteFormOpen(true);
              }}
            />
          )}
        </DragDropContext>
      </Paper>

      {/* Yeni Not Ekleme Butonu */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => {
          dispatch(setSelectedNote(undefined));
          setIsNoteFormOpen(true);
        }}
      >
        <AddIcon />
      </Fab>

      {/* Filtre Çekmecesi */}
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filtreler
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Kategoriler" />
              <IconButton
                edge="end"
                onClick={() => setIsCategoryFormOpen(true)}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </ListItem>
            {categories.map((category) => (
              <ListItemButton
                key={category.id}
                selected={filter.categories?.includes(category.id)}
                onClick={() => {
                  const currentCategories = filter.categories || [];
                  const newCategories = currentCategories.includes(category.id)
                    ? currentCategories.filter(id => id !== category.id)
                    : [...currentCategories, category.id];
                  handleFilterChange({ categories: newCategories });
                }}
              >
                <ListItemIcon>
                  <FolderIcon sx={{ color: category.color }} />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            ))}

            <Divider sx={{ my: 2 }} />

            <ListItem>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <ListItemText primary="Etiketler" />
            </ListItem>
            {Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (
              <ListItemButton
                key={tag}
                selected={filter.tags?.includes(tag)}
                onClick={() => {
                  const currentTags = filter.tags || [];
                  const newTags = currentTags.includes(tag)
                    ? currentTags.filter(t => t !== tag)
                    : [...currentTags, tag];
                  handleFilterChange({ tags: newTags });
                }}
              >
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                <ListItemText primary={tag} />
              </ListItemButton>
            ))}

            <Divider sx={{ my: 2 }} />

            <ListItemButton
              selected={filter.isArchived === true}
              onClick={() => handleFilterChange({ isArchived: !filter.isArchived })}
            >
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Arşivlenmiş Notlar" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Not Formu */}
      <NoteForm
        open={isNoteFormOpen}
        onClose={() => setIsNoteFormOpen(false)}
      />

      {/* Kategori Formu */}
      <CategoryForm
        open={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
      />
    </Box>
  );
};

export default NotesPage;