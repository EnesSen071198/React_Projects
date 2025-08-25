import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Folder as FolderIcon,
  ColorLens as ColorIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addCategory, updateCategory } from '../../store/slices/notesSlice';
import { NoteCategory } from '../../types/notes';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  initialCategory?: NoteCategory;
}

const CategoryForm = ({ open, onClose, initialCategory }: CategoryFormProps) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.notes.categories);

  const [formData, setFormData] = useState<Partial<NoteCategory>>({
    name: '',
    color: '#1976d2',
    icon: 'Folder',
    description: '',
    parentId: undefined,
    order: 0,
  });

  useEffect(() => {
    if (initialCategory) {
      setFormData(initialCategory);
    } else {
      setFormData({
        name: '',
        color: '#1976d2',
        icon: 'Folder',
        description: '',
        parentId: undefined,
        order: categories.length,
      });
    }
  }, [initialCategory, categories.length]);

  const handleSubmit = () => {
    const categoryData: NoteCategory = {
      id: initialCategory?.id || crypto.randomUUID(),
      name: formData.name || '',
      color: formData.color || '#1976d2',
      icon: formData.icon || 'Folder',
      description: formData.description,
      parentId: formData.parentId,
      order: formData.order || 0,
    };

    if (initialCategory) {
      dispatch(updateCategory(categoryData));
    } else {
      dispatch(addCategory(categoryData));
    }

    onClose();
  };

  const colorOptions = [
    { value: '#1976d2', label: 'Mavi' },
    { value: '#2e7d32', label: 'Yeşil' },
    { value: '#d32f2f', label: 'Kırmızı' },
    { value: '#ed6c02', label: 'Turuncu' },
    { value: '#9c27b0', label: 'Mor' },
    { value: '#0288d1', label: 'Açık Mavi' },
    { value: '#388e3c', label: 'Açık Yeşil' },
    { value: '#f44336', label: 'Açık Kırmızı' },
    { value: '#ff9800', label: 'Açık Turuncu' },
    { value: '#673ab7', label: 'Açık Mor' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FolderIcon sx={{ color: formData.color }} />
          <Typography variant="h6">
            {initialCategory ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Kategori Adı"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            fullWidth
            required
          />

          <TextField
            label="Açıklama"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            fullWidth
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Üst Kategori</InputLabel>
            <Select
              value={formData.parentId || ''}
              onChange={e => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
              label="Üst Kategori"
            >
              <MenuItem value="">
                <em>Üst kategori yok</em>
              </MenuItem>
              {categories
                .filter(cat => cat.id !== initialCategory?.id && !cat.parentId)
                .map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FolderIcon sx={{ color: category.color }} />
                      {category.name}
                    </Box>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Renk</InputLabel>
            <Select
              value={formData.color}
              onChange={e => setFormData(prev => ({ ...prev, color: e.target.value }))}
              label="Renk"
            >
              {colorOptions.map(option => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    color: option.value,
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
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!formData.name}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;