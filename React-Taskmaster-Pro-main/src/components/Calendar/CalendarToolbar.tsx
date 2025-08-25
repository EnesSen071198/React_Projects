import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarViewType } from '../../types/calendar';

interface CalendarToolbarProps {
  date: Date;
  view: CalendarViewType;
  onNavigate: (action: 'prev' | 'next' | 'today') => void;
  onViewChange: (view: CalendarViewType) => void;
}

const CalendarToolbar = ({
  date,
  view,
  onNavigate,
  onViewChange,
}: CalendarToolbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getTitle = () => {
    switch (view) {
      case 'month':
        return format(date, 'MMMM yyyy', { locale: tr });
      case 'week':
        return `${format(date, 'd MMMM', { locale: tr })} Haftası`;
      case 'day':
        return format(date, 'd MMMM yyyy', { locale: tr });
      case 'agenda':
        return 'Ajanda Görünümü';
      default:
        return '';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ButtonGroup size={isMobile ? 'small' : 'medium'}>
          <IconButton onClick={() => onNavigate('prev')}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={() => onNavigate('today')}>
            <TodayIcon />
          </IconButton>
          <IconButton onClick={() => onNavigate('next')}>
            <ChevronRightIcon />
          </IconButton>
        </ButtonGroup>

        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{ ml: 2, minWidth: isMobile ? 'auto' : 200 }}
        >
          {getTitle()}
        </Typography>
      </Box>

      <ButtonGroup size={isMobile ? 'small' : 'medium'}>
        <Button
          variant={view === 'month' ? 'contained' : 'outlined'}
          onClick={() => onViewChange('month')}
        >
          {isMobile ? 'A' : 'Ay'}
        </Button>
        <Button
          variant={view === 'week' ? 'contained' : 'outlined'}
          onClick={() => onViewChange('week')}
        >
          {isMobile ? 'H' : 'Hafta'}
        </Button>
        <Button
          variant={view === 'day' ? 'contained' : 'outlined'}
          onClick={() => onViewChange('day')}
        >
          {isMobile ? 'G' : 'Gün'}
        </Button>
        <Button
          variant={view === 'agenda' ? 'contained' : 'outlined'}
          onClick={() => onViewChange('agenda')}
        >
          {isMobile ? 'L' : 'Liste'}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default CalendarToolbar;