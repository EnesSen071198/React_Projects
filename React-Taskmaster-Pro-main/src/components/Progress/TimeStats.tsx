import {
  Grid,
  Paper,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Info as InfoIcon,
  Timer as TimerIcon,
  Coffee as CoffeeIcon,
  Repeat as SessionIcon,
  Schedule as DurationIcon,
  WatchLater as HourIcon,
  Today as DayIcon,
} from '@mui/icons-material';
import { TimeProgress } from '../../types/progress';
import { Line } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

interface TimeStatsProps {
  daily: TimeProgress;
  weekly: TimeProgress;
  monthly: TimeProgress;
}

const TimeStats = ({ daily, weekly, monthly }: TimeStatsProps) => {
  // Son 7 günün verilerini hazırla (örnek veri)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    return {
      date,
      focusTime: Math.floor(Math.random() * 480), // Örnek veri (dakika)
      breakTime: Math.floor(Math.random() * 120), // Örnek veri (dakika)
    };
  }).reverse();

  const chartData = {
    labels: last7Days.map(day =>
      format(new Date(day.date), 'EEEE', { locale: tr })
    ),
    datasets: [
      {
        label: 'Odaklanma Süresi',
        data: last7Days.map(day => day.focusTime / 60), // Saate çevir
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
      },
      {
        label: 'Mola Süresi',
        data: last7Days.map(day => day.breakTime / 60), // Saate çevir
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Saat',
        },
      },
    },
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    unit,
    info,
  }: {
    icon: typeof TimerIcon;
    title: string;
    value: number | string;
    unit: string;
    info: string;
  }) => (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ mr: 1 }} />
        <Typography variant="subtitle1">{title}</Typography>
        <Tooltip title={info}>
          <IconButton size="small" sx={{ ml: 'auto' }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h4" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {unit}
      </Typography>
    </Paper>
  );

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}dk`;
  };

  return (
    <Grid container spacing={3}>
      {/* Günlük İstatistikler */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Bugünün İstatistikleri
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={TimerIcon}
          title="Odaklanma Süresi"
          value={formatTime(daily.focusTime)}
          unit="toplam süre"
          info="Bugün odaklanarak çalışılan toplam süre"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={CoffeeIcon}
          title="Mola Süresi"
          value={formatTime(daily.breakTime)}
          unit="toplam süre"
          info="Bugün molalarda geçirilen toplam süre"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={SessionIcon}
          title="Oturumlar"
          value={daily.totalSessions}
          unit="tamamlanan oturum"
          info="Bugün tamamlanan pomodoro oturumu sayısı"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={DurationIcon}
          title="Ortalama Oturum"
          value={formatTime(daily.averageSessionLength)}
          unit="ortalama süre"
          info="Bugünkü oturumların ortalama süresi"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={HourIcon}
          title="En Verimli Saat"
          value={`${daily.mostProductiveHour}:00`}
          unit="günün en verimli saati"
          info="Bugün en çok odaklanılan saat dilimi"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          icon={DayIcon}
          title="En Verimli Gün"
          value={format(new Date(), 'EEEE', { locale: tr })}
          unit="haftanın en verimli günü"
          info="Bu hafta en çok odaklanılan gün"
        />
      </Grid>

      {/* Zaman Grafiği */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Son 7 Gün - Odaklanma ve Mola Süreleri
          </Typography>
          <Box sx={{ height: 300 }}>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>

      {/* Özet İstatistikler */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Özet İstatistikler
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Bu Hafta
                </Typography>
                <Typography variant="body2">
                  Toplam Odaklanma: {formatTime(weekly.focusTime)}
                </Typography>
                <Typography variant="body2">
                  Toplam Mola: {formatTime(weekly.breakTime)}
                </Typography>
                <Typography variant="body2">
                  Tamamlanan Oturum: {weekly.totalSessions}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Bu Ay
                </Typography>
                <Typography variant="body2">
                  Toplam Odaklanma: {formatTime(monthly.focusTime)}
                </Typography>
                <Typography variant="body2">
                  Toplam Mola: {formatTime(monthly.breakTime)}
                </Typography>
                <Typography variant="body2">
                  Tamamlanan Oturum: {monthly.totalSessions}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Ortalamalar
                </Typography>
                <Typography variant="body2">
                  Günlük Odaklanma: {formatTime(monthly.focusTime / 30)}
                </Typography>
                <Typography variant="body2">
                  Oturum Başına: {formatTime(monthly.averageSessionLength)}
                </Typography>
                <Typography variant="body2">
                  Günlük Oturum: {Math.round(monthly.totalSessions / 30)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TimeStats;