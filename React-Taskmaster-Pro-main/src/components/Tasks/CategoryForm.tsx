import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Favorite as HealthIcon,
  Assignment as ProjectIcon,
  Event as MeetingIcon,
  Alarm as DeadlineIcon,
  Label as DefaultIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../store/slices/categoriesSlice';
import { TaskCategory, CategoryColors } from '../../types/categories';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
}

const CategoryForm = ({ open, onClose }: CategoryFormProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(CategoryColors.OTHER);
  const [icon, setIcon] = useState('label');
  const [allowsSubcategories, setAllowsSubcategories] = useState(true);

  const availableColors = [
    { name: 'Kırmızı', value: CategoryColors.WORK },
    { name: 'Yeşil', value: CategoryColors.PERSONAL },
    { name: 'Mavi', value: CategoryColors.STUDY },
    { name: 'Pembe', value: CategoryColors.HEALTH },
    { name: 'Turkuaz', value: CategoryColors.PROJECT },
    { name: 'Sarı', value: CategoryColors.MEETING },
    { name: 'Turuncu', value: CategoryColors.DEADLINE },
    { name: 'Gri', value: CategoryColors.OTHER },
  ];

  const availableIcons = [
    { name: 'İş', value: 'work', icon: <WorkIcon /> },
    { name: 'Kişisel', value: 'person', icon: <PersonIcon /> },
    { name: 'Eğitim', value: 'school', icon: <SchoolIcon /> },
    { name: 'Sağlık', value: 'favorite', icon: <HealthIcon /> },
    { name: 'Proje', value: 'assignment', icon: <ProjectIcon /> },
    { name: 'Toplantı', value: 'event', icon: <MeetingIcon /> },
    { name: 'Son Tarih', value: 'alarm', icon: <DeadlineIcon /> },
    { name: 'Genel', value: 'label', icon: <DefaultIcon /> },
  ];

  const handleSave = () => {
    if (!name.trim()) {
      alert('Kategori adı zorunludur!');
      return;
    }

    const newCategory: TaskCategory = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      description: description.trim(),
      color,
      icon,
      isDefault: false,
      allowsSubcategories,
    };

    dispatch(addCategory(newCategory));
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setColor(CategoryColors.OTHER);
    setIcon('label');
    setAllowsSubcategories(true);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Yeni Kategori Ekle</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <TextField
            label="Kategori Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Renk Seçin
            </Typography>
            <Grid container spacing={1}>
              {availableColors.map((colorOption) => (
                <Grid item key={colorOption.value}>
                  <Paper
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: colorOption.value,
                      cursor: 'pointer',
                      border: color === colorOption.value ? '3px solid #000' : '1px solid #ddd',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => setColor(colorOption.value)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              İkon Seçin
            </Typography>
            <Grid container spacing={1}>
              {availableIcons.map((iconOption) => (
                <Grid item key={iconOption.value}>
                  <Tooltip title={iconOption.name}>
                    <Paper
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: icon === iconOption.value ? '2px solid' : '1px solid #ddd',
                        borderColor: icon === iconOption.value ? 'primary.main' : '#ddd',
                        color: icon === iconOption.value ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                      onClick={() => setIcon(iconOption.value)}
                    >
                      {iconOption.icon}
                    </Paper>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Alt Kategoriler</InputLabel>
            <Select
              value={allowsSubcategories}
              onChange={(e) => setAllowsSubcategories(e.target.value as boolean)}
              label="Alt Kategoriler"
            >
              <MenuItem value={true}>İzin Ver</MenuItem>
              <MenuItem value={false}>İzin Verme</MenuItem>
            </Select>
          </FormControl>

          {/* Önizleme */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Önizleme
            </Typography>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderLeft: 4,
                borderColor: color,
              }}
            >
              <Box sx={{ color }}>
                {availableIcons.find(i => i.value === icon)?.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2">
                  {name || 'Kategori Adı'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description || 'Kategori açıklaması'}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Kategori Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;