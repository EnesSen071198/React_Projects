import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Label as LabelIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarEvent } from '../../types/calendar';

interface ListViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onRangeSelect: (start: Date, end: Date) => void;
}

const ListView = ({ events, selectedDate, onEventClick }: ListViewProps) => {
  // Etkinlikleri tarihe göre sırala
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);
    return dateA.getTime() - dateB.getTime();
  });

  const renderEventTime = (event: CalendarEvent) => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    if (event.allDay) {
      return 'Tüm gün';
    }

    return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  };

  const renderEventStatus = (status?: string) => {
    let color: 'success' | 'warning' | 'error' = 'success';
    let label = 'Onaylandı';

    switch (status) {
      case 'tentative':
        color = 'warning';
        label = 'Geçici';
        break;
      case 'cancelled':
        color = 'error';
        label = 'İptal Edildi';
        break;
    }

    return (
      <Chip
        size="small"
        color={color}
        label={label}
        sx={{ ml: 1 }}
      />
    );
  };

  return (
    <List sx={{ width: '100%' }}>
      {sortedEvents.map((event, index) => (
        <Box key={event.id}>
          <ListItem
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Box
              sx={{
                width: 4,
                height: '100%',
                bgcolor: event.backgroundColor || 'primary.main',
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            />
            
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" component="span">
                    {event.title}
                  </Typography>
                  {event.extendedProps?.status && renderEventStatus(event.extendedProps.status)}
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <TimeIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                    <Typography variant="body2" color="textSecondary">
                      {renderEventTime(event)}
                    </Typography>
                  </Box>

                  {event.extendedProps?.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                      <Typography variant="body2" color="textSecondary">
                        {event.extendedProps.location}
                      </Typography>
                    </Box>
                  )}

                  {event.extendedProps?.tags && event.extendedProps.tags.length > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <LabelIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {event.extendedProps.tags.map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {event.description && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.description}
                    </Typography>
                  )}
                </Box>
              }
            />

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="düzenle"
                onClick={() => onEventClick(event)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="sil"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < sortedEvents.length - 1 && <Divider />}
        </Box>
      ))}

      {sortedEvents.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ py: 4 }}
        >
          Bu dönemde etkinlik bulunmuyor.
        </Typography>
      )}
    </List>
  );
};

export default ListView;