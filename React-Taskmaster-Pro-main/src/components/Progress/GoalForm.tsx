import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../../store/slices/progressSlice';
import { GoalProgress } from '../../types/progress';

interface GoalFormProps {
  onClose: () => void;
}

const GoalForm = ({ onClose }: GoalFormProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<GoalProgress>>({
    title: '',
    description: '',
    targetValue: 0,
    currentValue: 0,
    unit: '',
    startDate: new Date(),
    endDate: new Date(),
    type: 'custom',
    status: 'not_started',
    milestones: [],
  });

  const [newMilestone, setNewMilestone] = useState<number>(0);

  const handleChange = (field: keyof GoalProgress, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddMilestone = () => {
    if (newMilestone > 0 && formData.milestones) {
      setFormData(prev => ({
        ...prev,
        milestones: [
          ...(prev.milestones || []),
          { value: newMilestone, achieved: false },
        ].sort((a, b) => a.value - b.value),
      }));
      setNewMilestone(0);
    }
  };

  const handleRemoveMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const goalData: GoalProgress = {
      id: crypto.randomUUID(),
      title: formData.title || '',
      description: formData.description || '',
      targetValue: formData.targetValue || 0,
      currentValue: formData.currentValue || 0,
      unit: formData.unit || '',
      startDate: formData.startDate || new Date(),
      endDate: formData.endDate || new Date(),
      type: formData.type || 'custom',
      status: formData.status || 'not_started',
      milestones: formData.milestones || [],
      history: [],
    };

    dispatch(addGoal(goalData));
    onClose();
  };

  const goalTypes = [
    { value: 'task_completion', label: 'Görev Tamamlama' },
    { value: 'focus_time', label: 'Odaklanma Süresi' },
    { value: 'custom', label: 'Özel' },
  ];

  const commonUnits = [
    { value: 'görev', label: 'Görev' },
    { value: 'saat', label: 'Saat' },
    { value: 'dakika', label: 'Dakika' },
    { value: 'adet', label: 'Adet' },
    { value: '%', label: 'Yüzde' },
  ];

  return (
    <>
      <DialogTitle>Yeni Hedef</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Başlık"
            value={formData.title}
            onChange={e => handleChange('title', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Açıklama"
            value={formData.description}
            onChange={e => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Hedef Türü</InputLabel>
            <Select
              value={formData.type}
              onChange={e => handleChange('type', e.target.value)}
              label="Hedef Türü"
            >
              {goalTypes.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Hedef Değer"
              type="number"
              value={formData.targetValue}
              onChange={e => handleChange('targetValue', Number(e.target.value))}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel>Birim</InputLabel>
              <Select
                value={formData.unit}
                onChange={e => handleChange('unit', e.target.value)}
                label="Birim"
              >
                {commonUnits.map(unit => (
                  <MenuItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="Başlangıç Tarihi"
              value={formData.startDate}
              onChange={value => handleChange('startDate', value)}
              sx={{ flex: 1 }}
            />

            <DatePicker
              label="Bitiş Tarihi"
              value={formData.endDate}
              onChange={value => handleChange('endDate', value)}
              sx={{ flex: 1 }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Kilometre Taşları
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                label="Değer"
                type="number"
                value={newMilestone}
                onChange={e => setNewMilestone(Number(e.target.value))}
                size="small"
              />
              <IconButton
                onClick={handleAddMilestone}
                disabled={newMilestone <= 0}
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.milestones?.map((milestone, index) => (
                <Chip
                  key={index}
                  label={`${milestone.value} ${formData.unit}`}
                  onDelete={() => handleRemoveMilestone(index)}
                  size="small"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!formData.title || !formData.targetValue || !formData.unit}
        >
          Kaydet
        </Button>
      </DialogActions>
    </>
  );
};

export default GoalForm;