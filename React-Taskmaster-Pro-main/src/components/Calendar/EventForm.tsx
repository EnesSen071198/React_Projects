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
  Switch,
  FormControlLabel,
  Stack,
  Chip,
  Collapse,
  Typography,
  IconButton,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../../store/slices/calendarSlice';
import { CalendarEvent } from '../../types/calendar';
import { RRule } from 'rrule';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import ReminderSection from './ReminderSection';

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: CalendarEvent;
}

const EventForm = ({ open, onClose, onSave, initialData }: EventFormProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
    backgroundColor: '#1976d2',
    extendedProps: {
      location: '',
      attendees: [],
      reminders: [],
      tags: [],
      status: 'confirmed',
      notes: '',
    },
  });

  const [recurrenceExpanded, setRecurrenceExpanded] = useState(false);
  const [recurrence, setRecurrence] = useState({
    freq: 'NONE',
    interval: 1,
    until: null as Date | null,
    byweekday: [] as number[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        start: new Date(initialData.start),
        end: new Date(initialData.end),
      });

      // Tekrarlama kuralını ayrıştır
      if (initialData.rrule) {
        try {
          const rule = RRule.fromString(initialData.rrule);
          setRecurrence({
            freq: rule.options.freq.toString(),
            interval: rule.options.interval || 1,
            until: rule.options.until ? new Date(rule.options.until) : null,
            byweekday: rule.options.byweekday?.map(day => day.weekday) || [],
          });
          setRecurrenceExpanded(true);
        } catch (error) {
          console.error('RRule parsing error:', error);
        }
      }
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExtendedPropsChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      extendedProps: {
        ...prev.extendedProps,
        [field]: value,
      },
    }));
  };

  const generateRRule = () => {
    if (recurrence.freq === 'NONE') return '';

    try {
      const options: any = {
        freq: RRule[recurrence.freq as keyof typeof RRule],
        interval: recurrence.interval,
        dtstart: formData.start,
      };

      if (recurrence.until) {
        options.until = recurrence.until;
      }

      if (recurrence.byweekday.length > 0) {
        options.byweekday = recurrence.byweekday.map(
          day => RRule[`${['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][day]}` as keyof typeof RRule]
        );
      }

      return new RRule(options).toString();
    } catch (error) {
      console.error('RRule generation error:', error);
      return '';
    }
  };

  const handleSubmit = () => {
    const eventData: CalendarEvent = {
      id: initialData?.id || crypto.randomUUID(),
      title: formData.title || '',
      description: formData.description || '',
      start: formData.start || new Date(),
      end: formData.end || new Date(),
      allDay: formData.allDay || false,
      backgroundColor: formData.backgroundColor,
      rrule: generateRRule(),
      extendedProps: {
        ...formData.extendedProps,
        createdAt: initialData?.extendedProps?.createdAt || new Date(),
        updatedAt: new Date(),
      },
    };

    if (initialData) {
      dispatch(updateEvent(eventData));
    } else {
      dispatch(addEvent(eventData));
    }

    onSave();
    onClose();
  };

  const statusOptions = [
    { value: 'confirmed', label: 'Onaylandı' },
    { value: 'tentative', label: 'Geçici' },
    { value: 'cancelled', label: 'İptal Edildi' },
  ];

  const colorOptions = [
    { value: '#1976d2', label: 'Mavi' },
    { value: '#2e7d32', label: 'Yeşil' },
    { value: '#d32f2f', label: 'Kırmızı' },
    { value: '#ed6c02', label: 'Turuncu' },
    { value: '#9c27b0', label: 'Mor' },
  ];

  const frequencyOptions = [
    { value: 'NONE', label: 'Tekrarlama Yok' },
    { value: 'DAILY', label: 'Günlük' },
    { value: 'WEEKLY', label: 'Haftalık' },
    { value: 'MONTHLY', label: 'Aylık' },
    { value: 'YEARLY', label: 'Yıllık' },
  ];

  const weekDays = [
    { value: 0, label: 'Pazar' },
    { value: 1, label: 'Pazartesi' },
    { value: 2, label: 'Salı' },
    { value: 3, label: 'Çarşamba' },
    { value: 4, label: 'Perşembe' },
    { value: 5, label: 'Cuma' },
    { value: 6, label: 'Cumartesi' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Etkinliği Düzenle' : 'Yeni Etkinlik'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
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

          <FormControlLabel
            control={
              <Switch
                checked={formData.allDay}
                onChange={e => handleChange('allDay', e.target.checked)}
              />
            }
            label="Tüm Gün"
          />

          <DateTimePicker
            label="Başlangıç"
            value={formData.start}
            onChange={value => handleChange('start', value)}
          />

          <DateTimePicker
            label="Bitiş"
            value={formData.end}
            onChange={value => handleChange('end', value)}
          />

          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                mb: 1,
              }}
              onClick={() => setRecurrenceExpanded(!recurrenceExpanded)}
            >
              <IconButton
                size="small"
                sx={{
                  transform: recurrenceExpanded ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Typography variant="subtitle1">Tekrarlama</Typography>
            </Box>

            <Collapse in={recurrenceExpanded}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Sıklık</InputLabel>
                  <Select
                    value={recurrence.freq}
                    onChange={e => setRecurrence({ ...recurrence, freq: e.target.value })}
                    label="Sıklık"
                  >
                    {frequencyOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {recurrence.freq !== 'NONE' && (
                  <>
                    <TextField
                      label="Aralık"
                      type="number"
                      value={recurrence.interval}
                      onChange={e => setRecurrence({ ...recurrence, interval: parseInt(e.target.value) })}
                      inputProps={{ min: 1 }}
                    />

                    <DateTimePicker
                      label="Bitiş Tarihi"
                      value={recurrence.until}
                      onChange={value => setRecurrence({ ...recurrence, until: value })}
                    />

                    {recurrence.freq === 'WEEKLY' && (
                      <FormControl fullWidth>
                        <InputLabel>Günler</InputLabel>
                        <Select
                          multiple
                          value={recurrence.byweekday}
                          onChange={e => setRecurrence({ ...recurrence, byweekday: e.target.value as number[] })}
                          label="Günler"
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map(value => (
                                <Chip
                                  key={value}
                                  label={weekDays.find(day => day.value === value)?.label}
                                  size="small"
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {weekDays.map(day => (
                            <MenuItem key={day.value} value={day.value}>
                              {day.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </>
                )}
              </Stack>
            </Collapse>
          </Box>

          <TextField
            label="Konum"
            value={formData.extendedProps?.location}
            onChange={e => handleExtendedPropsChange('location', e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Durum</InputLabel>
            <Select
              value={formData.extendedProps?.status}
              onChange={e => handleExtendedPropsChange('status', e.target.value)}
              label="Durum"
            >
              {statusOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Renk</InputLabel>
            <Select
              value={formData.backgroundColor}
              onChange={e => handleChange('backgroundColor', e.target.value)}
              label="Renk"
            >
              {colorOptions.map(option => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ color: option.value }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ReminderSection
            reminders={formData.extendedProps?.reminders || []}
            onAdd={(type, minutes) => {
              handleExtendedPropsChange('reminders', [
                ...(formData.extendedProps?.reminders || []),
                { type, minutes },
              ]);
            }}
            onRemove={(index) => {
              const newReminders = [...(formData.extendedProps?.reminders || [])];
              newReminders.splice(index, 1);
              handleExtendedPropsChange('reminders', newReminders);
            }}
          />

          <TextField
            label="Notlar"
            value={formData.extendedProps?.notes}
            onChange={e => handleExtendedPropsChange('notes', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
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

export default EventForm;