import { Box, Grid, Paper, Typography } from '@mui/material';
import { format, addDays, startOfWeek, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarEvent } from '../../types/calendar';

interface WeekViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onRangeSelect: (start: Date, end: Date) => void;
}

const WeekView = ({ events, selectedDate, onEventClick, onRangeSelect }: WeekViewProps) => {
  const weekStart = startOfWeek(selectedDate, { locale: tr });
  const hours = eachHourOfInterval({
    start: startOfDay(selectedDate),
    end: endOfDay(selectedDate),
  });

  const renderTimeColumn = () => (
    <Box sx={{ width: 60, pr: 1 }}>
      <Box sx={{ height: 50 }} /> {/* Header boşluğu */}
      {hours.map((hour, i) => (
        <Box
          key={i}
          sx={{
            height: 60,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="caption" color="textSecondary">
            {format(hour, 'HH:mm')}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const renderDayColumn = (date: Date) => {
    const dayEvents = events.filter(
      event =>
        format(new Date(event.start), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return (
      <Box
        sx={{
          flex: 1,
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            height: 50,
            p: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              ? 'action.hover'
              : 'transparent',
          }}
        >
          <Typography
            align="center"
            color={
              format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ? 'primary'
                : 'textPrimary'
            }
          >
            {format(date, 'EEEE', { locale: tr })}
          </Typography>
          <Typography align="center" variant="caption" color="textSecondary">
            {format(date, 'd MMMM', { locale: tr })}
          </Typography>
        </Box>

        <Box sx={{ position: 'relative' }}>
          {hours.map((_, i) => (
            <Box
              key={i}
              sx={{
                height: 60,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
          ))}

          {dayEvents.map((event, i) => {
            const startTime = new Date(event.start);
            const endTime = new Date(event.end);
            const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

            return (
              <Box
                key={i}
                onClick={() => onEventClick(event)}
                sx={{
                  position: 'absolute',
                  top: `${(startMinutes / 60) * 60}px`,
                  left: '4px',
                  right: '4px',
                  height: `${(duration / 60) * 60}px`,
                  bgcolor: event.backgroundColor || 'primary.main',
                  color: event.textColor || 'white',
                  borderRadius: 1,
                  p: 0.5,
                  fontSize: '0.75rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    filter: 'brightness(0.9)',
                  },
                }}
              >
                <Typography variant="caption" noWrap>
                  {event.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'auto' }}>
      {renderTimeColumn()}
      {Array.from({ length: 7 }, (_, i) => (
        <Box key={i} sx={{ flex: 1 }}>
          {renderDayColumn(addDays(weekStart, i))}
        </Box>
      ))}
    </Box>
  );
};

export default WeekView;