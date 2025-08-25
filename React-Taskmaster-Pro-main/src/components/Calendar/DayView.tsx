import { Box, Typography } from '@mui/material';
import { format, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarEvent } from '../../types/calendar';

interface DayViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onRangeSelect: (start: Date, end: Date) => void;
}

const DayView = ({ events, selectedDate, onEventClick, onRangeSelect }: DayViewProps) => {
  const hours = eachHourOfInterval({
    start: startOfDay(selectedDate),
    end: endOfDay(selectedDate),
  });

  const dayEvents = events.filter(
    event =>
      format(new Date(event.start), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'auto' }}>
      {/* Zaman sütunu */}
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

      {/* Gün sütunu */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Box
          sx={{
            height: 50,
            p: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              ? 'action.hover'
              : 'transparent',
          }}
        >
          <Typography
            align="center"
            color={
              format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ? 'primary'
                : 'textPrimary'
            }
          >
            {format(selectedDate, 'EEEE', { locale: tr })}
          </Typography>
          <Typography align="center" variant="caption" color="textSecondary">
            {format(selectedDate, 'd MMMM yyyy', { locale: tr })}
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
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              onClick={() => {
                const start = new Date(selectedDate);
                start.setHours(i, 0, 0);
                const end = new Date(start);
                end.setHours(i + 1, 0, 0);
                onRangeSelect(start, end);
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
                  p: 1,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    filter: 'brightness(0.9)',
                  },
                }}
              >
                <Typography variant="subtitle2" noWrap>
                  {event.title}
                </Typography>
                {event.description && (
                  <Typography variant="caption" noWrap>
                    {event.description}
                  </Typography>
                )}
                {event.extendedProps?.location && (
                  <Typography variant="caption" noWrap sx={{ display: 'block', mt: 0.5 }}>
                    📍 {event.extendedProps.location}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default DayView;