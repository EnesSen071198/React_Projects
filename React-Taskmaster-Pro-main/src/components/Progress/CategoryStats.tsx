import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import { CategoryProgress } from '../../types/progress';
import { Pie, Bar } from 'react-chartjs-2';

interface CategoryStatsProps {
  categories: CategoryProgress[];
}

const CategoryStats = ({ categories }: CategoryStatsProps) => {
  // Pasta grafik verisi
  const pieData = {
    labels: categories.map(cat => cat.categoryName),
    datasets: [
      {
        data: categories.map(cat => cat.tasks.completed),
        backgroundColor: categories.map(cat => cat.color),
        borderColor: categories.map(cat => cat.color),
        borderWidth: 1,
      },
    ],
  };

  // Çubuk grafik verisi
  const barData = {
    labels: categories.map(cat => cat.categoryName),
    datasets: [
      {
        label: 'Tamamlanan',
        data: categories.map(cat => cat.tasks.completed),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
      {
        label: 'Toplam',
        data: categories.map(cat => cat.tasks.total),
        backgroundColor: 'rgba(201, 203, 207, 0.5)',
        borderColor: 'rgb(201, 203, 207)',
        borderWidth: 1,
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
  };

  return (
    <Grid container spacing={3}>
      {/* Kategori Kartları */}
      {categories.map(category => (
        <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: category.color,
                  mr: 1,
                }}
              />
              <Typography variant="subtitle1">
                {category.categoryName}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="body2">İlerleme</Typography>
                <Typography variant="body2">
                  {category.tasks.completed} / {category.tasks.total}
                </Typography>
              </Box>
              <Tooltip
                title={`${Math.round(category.tasks.percentage)}% tamamlandı`}
              >
                <LinearProgress
                  variant="determinate"
                  value={category.tasks.percentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: category.color,
                    },
                  }}
                />
              </Tooltip>
            </Box>

            {category.subCategories && category.subCategories.length > 0 && (
              <Box>
                <Typography variant="body2" gutterBottom>
                  Alt Kategoriler
                </Typography>
                {category.subCategories.map(subCat => (
                  <Box key={subCat.categoryId} sx={{ mb: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="caption">
                        {subCat.categoryName}
                      </Typography>
                      <Typography variant="caption">
                        {subCat.tasks.completed} / {subCat.tasks.total}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={subCat.tasks.percentage}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: subCat.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      ))}

      {/* Grafikler */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Kategori Dağılımı
          </Typography>
          <Box sx={{ height: 300 }}>
            <Pie data={pieData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Kategori Karşılaştırması
          </Typography>
          <Box sx={{ height: 300 }}>
            <Bar data={barData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CategoryStats;