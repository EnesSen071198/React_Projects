import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Slider,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateSettings } from '../../store/slices/pomodoroSlice';
import { useState } from 'react';

interface SettingsProps {
  onClose: () => void;
}

const Settings = ({ onClose }: SettingsProps) => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.pomodoro.settings);
  const [formData, setFormData] = useState(settings);

  const handleSave = () => {
    dispatch(updateSettings(formData));
    onClose();
  };

  const handleDurationChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setFormData(prev => ({
        ...prev,
        [field]: value * 60, // Dakikayı saniyeye çevir
      }));
    }
  };

  const handleSwitchChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setFormData(prev => ({
      ...prev,
      volume: newValue as number,
    }));
  };

  const alarmSounds = [
    { value: 'bell', label: 'Zil' },
    { value: 'digital', label: 'Dijital' },
    { value: 'chime', label: 'Çan' },
    { value: 'notification', label: 'Bildirim' },
  ];

  return (
    <>
      <DialogTitle>Pomodoro Ayarları</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Süre Ayarları (Dakika)
          </Typography>
          <TextField
            label="Çalışma Süresi"
            type="number"
            value={formData.workDuration / 60}
            onChange={handleDurationChange('workDuration')}
            inputProps={{ min: 1 }}
            fullWidth
          />
          <TextField
            label="Kısa Mola Süresi"
            type="number"
            value={formData.breakDuration / 60}
            onChange={handleDurationChange('breakDuration')}
            inputProps={{ min: 1 }}
            fullWidth
          />
          <TextField
            label="Uzun Mola Süresi"
            type="number"
            value={formData.longBreakDuration / 60}
            onChange={handleDurationChange('longBreakDuration')}
            inputProps={{ min: 1 }}
            fullWidth
          />
          <TextField
            label="Uzun Mola Öncesi Oturum Sayısı"
            type="number"
            value={formData.sessionsUntilLongBreak}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                setFormData(prev => ({
                  ...prev,
                  sessionsUntilLongBreak: value,
                }));
              }
            }}
            inputProps={{ min: 1 }}
            fullWidth
          />

          <Typography variant="h6" gutterBottom>
            Otomatik Başlatma
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={formData.autoStartBreaks}
                onChange={handleSwitchChange('autoStartBreaks')}
              />
            }
            label="Molaları otomatik başlat"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.autoStartPomodoros}
                onChange={handleSwitchChange('autoStartPomodoros')}
              />
            }
            label="Pomodoro'ları otomatik başlat"
          />

          <Typography variant="h6" gutterBottom>
            Ses Ayarları
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Alarm Sesi</InputLabel>
            <Select
              value={formData.alarmSound}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                alarmSound: e.target.value,
              }))}
              label="Alarm Sesi"
            >
              {alarmSounds.map(sound => (
                <MenuItem key={sound.value} value={sound.value}>
                  {sound.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={formData.tickSound}
                onChange={handleSwitchChange('tickSound')}
              />
            }
            label="Tik sesi çal"
          />

          <Box>
            <Typography gutterBottom>Ses Seviyesi</Typography>
            <Slider
              value={formData.volume}
              onChange={handleVolumeChange}
              aria-labelledby="volume-slider"
              step={0.1}
              marks
              min={0}
              max={1}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </>
  );
};

export default Settings;