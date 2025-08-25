import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Tooltip,
  Stack,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Label as TagIcon,
  Folder as CategoryIcon,
  PushPin as PinIcon,
  Archive as ArchiveIcon,
  ColorLens as ColorIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addNote, updateNote } from '../../store/slices/notesSlice';
import { Note } from '../../types/notes';
import MDEditor from '@uiw/react-md-editor';

interface NoteFormProps {
  open: boolean;
  onClose: () => void;
}

const NoteForm = ({ open, onClose }: NoteFormProps) => {
  const dispatch = useDispatch();
  const selectedNoteId = useSelector((state: RootState) => state.notes.selectedNote);
  const notes = useSelector((state: RootState) => state.notes.items);
  const categories = useSelector((state: RootState) => state.notes.categories);

  const [formData, setFormData] = useState<Partial<Note>>({
    title: '',
    content: '',
    category: undefined,
    tags: [],
    color: undefined,
    isPinned: false,
    isArchived: false,
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (selectedNoteId) {
      const note = notes.find(n => n.id === selectedNoteId);
      if (note) {
        setFormData(note);
      }
    } else {
      setFormData({
        title: '',
        content: '',
        category: undefined,
        tags: [],
        color: undefined,
        isPinned: false,
        isArchived: false,
      });
    }
  }, [selectedNoteId, notes]);

  const handleSubmit = () => {
    const noteData: Note = {
      id: selectedNoteId || crypto.randomUUID(),
      title: formData.title || '',
      content: formData.content || '',
      createdAt: selectedNoteId ? formData.createdAt! : new Date(),
      updatedAt: new Date(),
      category: formData.category,
      tags: formData.tags || [],
      color: formData.color,
      isPinned: formData.isPinned || false,
      isArchived: formData.isArchived || false,
      version: (formData.version || 0) + 1,
      metadata: {
        wordCount: formData.content?.split(/\s+/).length || 0,
        readTime: Math.ceil((formData.content?.split(/\s+/).length || 0) / 200), // 200 kelime/dakika
        lastViewed: new Date(),
        viewCount: (formData.metadata?.viewCount || 0) + 1,
      },
    };

    if (selectedNoteId) {
      dispatch(updateNote(noteData));
    } else {
      dispatch(addNote(noteData));
    }

    onClose();
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  const colorOptions = [
    { value: '#ffffff', label: 'Varsayılan' },
    { value: '#f28b82', label: 'Kırmızı' },
    { value: '#fbbc04', label: 'Turuncu' },
    { value: '#fff475', label: 'Sarı' },
    { value: '#ccff90', label: 'Yeşil' },
    { value: '#a7ffeb', label: 'Turkuaz' },
    { value: '#cbf0f8', label: 'Mavi' },
    { value: '#aecbfa', label: 'Lacivert' },
    { value: '#d7aefb', label: 'Mor' },
    { value: '#fdcfe8', label: 'Pembe' },
  ];

  // Tüm notlardan benzersiz etiketleri topla
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: formData.color || 'background.paper',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {selectedNoteId ? 'Notu Düzenle' : 'Yeni Not'}
          </Typography>
          <Box>
            <Tooltip title={formData.isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}>
              <IconButton
                onClick={() => setFormData(prev => ({ ...prev, isPinned: !prev.isPinned }))}
                color={formData.isPinned ? 'primary' : 'default'}
              >
                <PinIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={formData.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}>
              <IconButton
                onClick={() => setFormData(prev => ({ ...prev, isArchived: !prev.isArchived }))}
                color={formData.isArchived ? 'primary' : 'default'}
              >
                <ArchiveIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Başlık"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            fullWidth
            required
          />

          <Box data-color-mode="light">
            <MDEditor
              value={formData.content}
              onChange={value => setFormData(prev => ({ ...prev, content: value || '' }))}
              height={400}
              preview="edit"
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={formData.category || ''}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              label="Kategori"
            >
              <MenuItem value="">
                <em>Kategorisiz</em>
              </MenuItem>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CategoryIcon sx={{ color: category.color }} />
                    {category.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Etiketler
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Autocomplete
                freeSolo
                options={allTags}
                value={newTag}
                onChange={(_, value) => {
                  if (value) {
                    setNewTag(value);
                  }
                }}
                onInputChange={(_, value) => setNewTag(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Yeni etiket..."
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                )}
                sx={{ flex: 1 }}
              />
              <IconButton onClick={handleAddTag} size="small">
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {formData.tags?.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  icon={<TagIcon />}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Renk</InputLabel>
            <Select
              value={formData.color || '#ffffff'}
              onChange={e => setFormData(prev => ({ ...prev, color: e.target.value }))}
              label="Renk"
            >
              {colorOptions.map(option => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    bgcolor: option.value,
                    '&:hover': {
                      bgcolor: option.value,
                      filter: 'brightness(0.95)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ColorIcon />
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.metadata && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="textSecondary">
                {formData.metadata.wordCount} kelime • {formData.metadata.readTime} dk okuma süresi •{' '}
                {formData.metadata.viewCount} görüntülenme
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteForm;