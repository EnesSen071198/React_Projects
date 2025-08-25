import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Tooltip,
  Paper,
  Checkbox,
} from '@mui/material';
import { 
  format, 
  startOfWeek, 
  addDays, 
  startOfMonth, 
  isSameMonth, 
  isSameDay,
  parseISO,
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarEvent } from '../../types/calendar';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { MoreHoriz as MoreIcon } from '@mui/icons-material';

interface MonthViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onRangeSelect: (start: Date, end: Date) => void;
  onTaskToggle?: (taskId: string) => void;
}

interface DraggableEventProps {
  event: CalendarEvent;
  onClick: () => void;
  onTaskToggle?: (taskId: string) => void;
}

const DraggableEvent = ({ event, onClick, onTaskToggle }: DraggableEventProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: event.id,
    data: event,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  const eventColor = event.color || event.category?.color || (event.type === 'task' ? '#2196f3' : '#1976d2');

  return (
    <Tooltip title={`${event.title}${event.type === 'task' ? ' (Görev)' : ''}`}>
      <Box
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        sx={{
          bgcolor: eventColor,
          color: 'white',
          p: 0.5,
          borderRadius: 1,
          mb: 0.5,
          fontSize: '0.7rem',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          cursor: isDragging ? 'grabbing' : 'grab',
          border: event.type === 'task' ? '2px dashed rgba(255,255,255,0.5)' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          '&:hover': {
            filter: 'brightness(1.1)',
            transform: 'translateY(-1px)',
            boxShadow: 2,
          },
          transition: 'all 0.2s ease',
        }}
      >
        {event.type === 'task' && event.taskId && onTaskToggle && (
          <Checkbox
            size="small"
            checked={event.completed || false}
            onChange={(e) => {
              e.stopPropagation();
              onTaskToggle(event.taskId!);
            }}
            sx={{
              color: 'white',
              '&.Mui-checked': {
                color: 'white',
              },
              p: 0,
              '& .MuiSvgIcon-root': {
                fontSize: '0.8rem',
              },
            }}
          />
        )}
        <Box sx={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {event.type === 'task' && '📋 '}{event.title}
        </Box>
      </Box>
    </Tooltip>
  );
};

interface DroppableDayProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  onTaskToggle?: (taskId: string) => void;
}

const DroppableDay = ({ 
  date, 
  events, 
  isCurrentMonth, 
  isToday, 
  onEventClick, 
  onDateClick,
  onTaskToggle 
}: DroppableDayProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: format(date, 'yyyy-MM-dd'),
    data: { date },
  });

  const dayEvents = events.filter(event => {
    const eventDate = typeof event.start === 'string' ? parseISO(event.start) : event.start;
    return isSameDay(eventDate, date);
  });

  const visibleEvents = dayEvents.slice(0, 3);
  const hiddenEventsCount = dayEvents.length - visibleEvents.length;

  return (
    <Card
      ref={setNodeRef}
      onClick={() => onDateClick(date)}
      sx={{
        height: 120,
        cursor: 'pointer',
        bgcolor: isOver ? 'action.hover' : 'background.paper',
        border: isToday ? 2 : 1,
        borderColor: isToday ? 'primary.main' : 'divider',
        opacity: isCurrentMonth ? 1 : 0.6,
        '&:hover': {
          boxShadow: 2,
          bgcolor: 'action.hover',
        },
        transition: 'all 0.2s ease',
      }}
    >
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="body2"
            fontWeight={isToday ? 'bold' : 'normal'}
            sx={{
              color: isToday ? 'primary.main' : isCurrentMonth ? 'text.primary' : 'text.secondary',
              fontSize: isToday ? '1rem' : '0.875rem',
            }}
          >
            {format(date, 'd')}
          </Typography>
          {dayEvents.length > 0 && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                bgcolor: 'primary.light',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
              }}
            >
              {dayEvents.length}
            </Typography>
          )}
        </Box>
        
        <Box sx={{ height: 80, overflow: 'hidden' }}>
          {visibleEvents.map((event) => (
            <DraggableEvent
              key={event.id}
              event={event}
              onClick={() => onEventClick(event)}
              onTaskToggle={onTaskToggle}
            />
          ))}
          
          {hiddenEventsCount > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                fontSize: '0.7rem',
                mt: 0.5,
              }}
            >
              <MoreIcon fontSize="small" />
              <Typography variant="caption">
                +{hiddenEventsCount} daha
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const MonthView = ({ events, selectedDate, onEventClick, onRangeSelect, onTaskToggle }: MonthViewProps) => {
  const monthStart = startOfMonth(selectedDate);
  const startDate = startOfWeek(monthStart, { locale: tr });
  
  // 6 hafta göster (42 gün)
  const days = Array.from({ length: 42 }, (_, i) => addDays(startDate, i));
  
  const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  
  const handleDateClick = (date: Date) => {
    onRangeSelect(date, date);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Gün başlıkları */}
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {dayNames.map((day) => (
          <Grid item xs={12/7} key={day}>
            <Paper
              sx={{
                p: 1,
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold" sx={{ color: 'inherit' }}>
                {day}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Takvim günleri */}
      <Grid container spacing={1} sx={{ flex: 1 }}>
        {days.map((date) => (
          <Grid item xs={12/7} key={date.toISOString()}>
            <DroppableDay
              date={date}
              events={events}
              isCurrentMonth={isSameMonth(date, selectedDate)}
              isToday={isSameDay(date, new Date())}
              onEventClick={onEventClick}
              onDateClick={handleDateClick}
              onTaskToggle={onTaskToggle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MonthView;