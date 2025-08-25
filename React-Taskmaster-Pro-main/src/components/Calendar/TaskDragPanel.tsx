import { useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  DragIndicator as DragIcon,
  Task as TaskIcon,
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  Flag as FlagIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { useDraggable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { format, isToday, isTomorrow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Todo } from '../../types';

const DraggableTask = ({ task }: { task: Todo }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-task-${task.id}`,
    data: {
      type: 'task',
      task,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : {};

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const formatDueDate = (dueDate: Date | undefined) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    if (isToday(date)) return 'Bugün';
    if (isTomorrow(date)) return 'Yarın';
    return format(date, 'd MMM', { locale: tr });
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        mb: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        cursor: isDragging ? 'grabbing' : 'grab',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 1,
        },
      }}
    >
      <ListItemIcon>
        <DragIcon color="action" />
      </ListItemIcon>
      
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ flex: 1 }}>
              {task.title}
            </Typography>
            {task.priority === 'high' && (
              <FlagIcon color="error" fontSize="small" />
            )}
          </Box>
        }
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Chip
              size="small"
              label={task.category.name}
              sx={{
                backgroundColor: task.category.color,
                color: 'white',
                fontSize: '0.7rem',
                height: 20,
              }}
            />
            {task.dueDate && (
              <Chip
                size="small"
                icon={<TodayIcon />}
                label={formatDueDate(task.dueDate)}
                color={new Date(task.dueDate) < new Date() ? 'error' : 'default'}
                sx={{ fontSize: '0.7rem', height: 20 }}
              />
            )}
          </Box>
        }
      />
      
      <Avatar
        sx={{
          width: 24,
          height: 24,
          bgcolor: getPriorityColor(task.priority) + '.main',
          fontSize: '0.7rem',
        }}
      >
        {task.priority === 'high' ? 'Y' : task.priority === 'medium' ? 'O' : 'D'}
      </Avatar>
    </ListItem>
  );
};

const TaskDragPanel = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Aktif görevleri filtrele (tamamlanmamış)
  const activeTasks = todos.filter(task => 
    !task.completed && 
    task.status !== 'cancelled' &&
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Kategori olup olmadığını kontrol et
  const hasTasksToShow = activeTasks.length > 0;

  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TaskIcon color="primary" />
          <Typography variant="h6">
            Görevler
          </Typography>
          <Chip 
            size="small" 
            label={activeTasks.length} 
            color="primary"
          />
        </Box>
        <Tooltip title={isExpanded ? "Daralt" : "Genişlet"}>
          <IconButton 
            size="small" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Tooltip>
      </Box>

      <Collapse in={isExpanded}>
        <TextField
          size="small"
          placeholder="Görev ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Takvime sürükleyin
        </Typography>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {hasTasksToShow ? (
            <List dense>
              {activeTasks.map(task => (
                <DraggableTask key={task.id} task={task} />
              ))}
            </List>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                color: 'text.secondary',
              }}
            >
              <TaskIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="body2">
                {searchTerm ? 'Görev bulunamadı' : 'Aktif görev yok'}
              </Typography>
              <Typography variant="caption">
                {searchTerm ? 'Arama kriterini değiştirin' : 'Yeni görev ekleyin'}
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default TaskDragPanel;