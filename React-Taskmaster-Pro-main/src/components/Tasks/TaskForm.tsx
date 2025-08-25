import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  SelectChangeEvent,
  FormControlLabel,
  Switch,
  IconButton,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Todo, TaskCategory } from '../../types';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Partial<Todo>) => void;
  initialData?: Todo;
}

const TaskForm = ({ open, onClose, onSave, initialData }: TaskFormProps) => {
  const categories = useSelector((state: RootState) => state.categories.items);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCategory(initialData.category);
      setPriority(initialData.priority);
      setDueDate(initialData.dueDate || null);
      setLabels(initialData.labels);
      setEstimatedTime(initialData.estimatedTime?.toString() || '');
      setIsRecurring(!!initialData.recurring);
      if (initialData.recurring) {
        setRecurringFrequency(initialData.recurring.frequency);
      }
    }
  }, [initialData]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Başlık alanı zorunludur!');
      return;
    }
    
    if (!category) {
      alert('Kategori seçimi zorunludur!');
      return;
    }

    const taskData: Partial<Todo> = {
      title: title.trim(),
      description: description.trim(),
      category: category,
      priority,
      dueDate: dueDate,
      labels,
      estimatedTime: estimatedTime ? parseInt(estimatedTime) : undefined,
      status: 'not_started',
      ...(isRecurring && {
        recurring: {
          frequency: recurringFrequency,
          interval: 1,
        },
      }),
    };

    onSave(taskData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCategory(null);
    setPriority('medium');
    setDueDate(null);
    setLabels([]);
    setNewLabel('');
    setEstimatedTime('');
    setIsRecurring(false);
    onClose();
  };

  const handleAddLabel = () => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    setLabels(labels.filter(label => label !== labelToRemove));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Görevi Düzenle' : 'Yeni Görev'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={category?.id || ''}
              onChange={(e: SelectChangeEvent) => {
                const selectedCategory = categories.find(cat => cat.id === e.target.value);
                setCategory(selectedCategory || null);
              }}
              label="Kategori"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Öncelik</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              label="Öncelik"
            >
              <MenuItem value="low">Düşük</MenuItem>
              <MenuItem value="medium">Orta</MenuItem>
              <MenuItem value="high">Yüksek</MenuItem>
            </Select>
          </FormControl>

          <DateTimePicker
            label="Bitiş Tarihi"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
          />

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Etiket Ekle"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddLabel()}
            />
            <IconButton onClick={handleAddLabel} color="primary">
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {labels.map((label) => (
              <Chip
                key={label}
                label={label}
                onDelete={() => handleRemoveLabel(label)}
              />
            ))}
          </Box>

          <TextField
            label="Tahmini Süre (dakika)"
            type="number"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
            }
            label="Tekrarlanan Görev"
          />

          {isRecurring && (
            <FormControl fullWidth>
              <InputLabel>Tekrarlama Sıklığı</InputLabel>
              <Select
                value={recurringFrequency}
                onChange={(e) => setRecurringFrequency(e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')}
                label="Tekrarlama Sıklığı"
              >
                <MenuItem value="daily">Günlük</MenuItem>
                <MenuItem value="weekly">Haftalık</MenuItem>
                <MenuItem value="monthly">Aylık</MenuItem>
                <MenuItem value="yearly">Yıllık</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;