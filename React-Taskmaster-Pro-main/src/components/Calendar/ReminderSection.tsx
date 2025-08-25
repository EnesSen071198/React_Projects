import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  NotificationsActive as NotificationIcon,
} from '@mui/icons-material';
import { useState } from 'react';

interface ReminderSectionProps {
  reminders: Array<{ type: string; minutes: number }>;
  onAdd: (type: string, minutes: number) => void;
  onRemove: (index: number) => void;
}

const ReminderSection = ({ reminders, onAdd, onRemove }: ReminderSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'popup',
    minutes: 15,
  });

  const handleAdd = () => {
    onAdd(newReminder.type, newReminder.minutes);
    setIsDialogOpen(false);
    setNewReminder({ type: 'popup', minutes: 15 });
  };

  const formatReminderText = (reminder: { type: string; minutes: number }) => {
    const typeText = reminder.type === 'popup' ? 'Uygulama Bildirimi' : 'Masaüstü Bildirimi';
    return `${reminder.minutes} dakika önce - ${typeText}`;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <NotificationIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle1">Hatırlatıcılar</Typography>
        <IconButton
          size="small"
          onClick={() => setIsDialogOpen(true)}
          sx={{ ml: 'auto' }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <List dense>
        {reminders.map((reminder, index) => (
          <ListItem key={index}>
            <ListItemText primary={formatReminderText(reminder)} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="sil"
                onClick={() => onRemove(index)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {reminders.length === 0 && (
          <Typography variant="body2" color="textSecondary" sx={{ py: 1 }}>
            Henüz hatırlatıcı eklenmemiş
          </Typography>
        )}
      </List>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Yeni Hatırlatıcı</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, width: 300 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Bildirim Türü</InputLabel>
              <Select
                value={newReminder.type}
                onChange={e => setNewReminder({ ...newReminder, type: e.target.value })}
                label="Bildirim Türü"
              >
                <MenuItem value="popup">Uygulama Bildirimi</MenuItem>
                <MenuItem value="desktop">Masaüstü Bildirimi</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Dakika"
              type="number"
              value={newReminder.minutes}
              onChange={e => setNewReminder({ ...newReminder, minutes: parseInt(e.target.value) })}
              inputProps={{ min: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>İptal</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReminderSection;