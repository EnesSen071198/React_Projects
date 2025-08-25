import {
  Paper,
  Box,
  Typography,
  LinearProgress,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Info as InfoIcon,
  Assignment as TaskIcon,
  Timer as TimeIcon,
  Repeat as ConsistencyIcon,
} from '@mui/icons-material';
import { ProductivityScore as ProductivityScoreType } from '../../types/progress';
import { Line } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

interface ProductivityScoreProps {
  score: ProductivityScoreType;
}

const ProductivityScore = ({ score }: ProductivityScoreProps) => {
  // Son 7 günün verilerini hazırla
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const dayScore = score.history.find(h => h.date === date)?.score || 0;
    return {
      date,
      score: dayScore,
    };
  }).reverse();

  const chartData = {
    labels: last7Days.map(day =>
      format(new Date(day.date), 'EEEE', { locale: tr })
    ),
    datasets: [
      {
        label: 'Üretkenlik Puanı',
        data: last7Days.map(day => day.score),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'success.main';
    if (value >= 60) return 'warning.main';
    return 'error.main';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Ana Puan */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Üretkenlik Puanı
              <Tooltip title="Görev tamamlama, odaklanma süresi ve tutarlılık puanlarının ortalaması">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: getScoreColor(score.overall) }}
            >
              {Math.round(score.overall)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={score.overall}
              sx={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getScoreColor(score.overall),
                },
              }}
            />
          </Box>
        </Grid>

        {/* Alt Puanlar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Puan Dağılımı
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <TaskIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Görev Tamamlama</Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 'auto', color: getScoreColor(score.taskCompletion) }}
                  >
                    {Math.round(score.taskCompletion)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={score.taskCompletion}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getScoreColor(score.taskCompletion),
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <TimeIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Odaklanma Süresi</Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 'auto', color: getScoreColor(score.focusTime) }}
                  >
                    {Math.round(score.focusTime)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={score.focusTime}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getScoreColor(score.focusTime),
                    },
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <ConsistencyIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Tutarlılık</Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 'auto', color: getScoreColor(score.consistency) }}
                  >
                    {Math.round(score.consistency)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={score.consistency}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getScoreColor(score.consistency),
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Grafik */}
        <Grid item xs={12} md={5}>
          <Box sx={{ height: '100%', minHeight: 200 }}>
            <Typography variant="subtitle1" gutterBottom>
              7 Günlük Trend
            </Typography>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductivityScore;