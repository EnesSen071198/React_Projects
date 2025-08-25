import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Chip,
  Box,
  Menu,
  MenuItem,
  LinearProgress,
  Collapse,
  Badge,
  Tooltip,
  useTheme,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  Label as LabelIcon,
  Comment as CommentIcon,
  Attachment as AttachmentIcon,
  SubdirectoryArrowRight as SubTaskIcon,
  History as HistoryIcon,
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CollapseIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Todo, SubTask } from '../../types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface TaskListProps {
  todos?: Todo[]; // Opsiyonel, eğer verilmezse Redux'tan alır
  onEditTask: (task: Todo) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTask?: (taskId: string) => void;
  onUpdateStatus?: (taskId: string, status: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled') => void;
  onReorderTasks?: (startIndex: number, endIndex: number) => void;
}

const TaskList = ({ todos, onEditTask, onDeleteTask, onToggleTask, onUpdateStatus, onReorderTasks }: TaskListProps) => {
  const theme = useTheme();
  const reduxTasks = useSelector((state: RootState) => state.todos.items);
  const tasks = todos || reduxTasks || []; // Props'tan gelirse onu kullan, yoksa Redux'tan al
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [statusMenuTask, setStatusMenuTask] = useState<Todo | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, task: Todo) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedTask(null);
  };

  const handleEdit = () => {
    if (selectedTask) {
      onEditTask(selectedTask);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedTask) {
      onDeleteTask(selectedTask.id);
    }
    handleMenuClose();
  };

  const handleExpandTask = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'in_progress':
        return theme.palette.warning.main;
      case 'on_hold':
        return theme.palette.grey[500];
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'Başlamadı';
      case 'in_progress':
        return 'Devam Ediyor';
      case 'completed':
        return 'Tamamlandı';
      case 'on_hold':
        return 'Beklemede';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleStatusClick = (task: Todo, event: React.MouseEvent) => {
    event.stopPropagation();
    setStatusMenuAnchorEl(event.currentTarget);
    setStatusMenuTask(task);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
    setStatusMenuTask(null);
  };

  const handleStatusSelect = (status: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled') => {
    if (statusMenuTask) {
      onUpdateStatus?.(statusMenuTask.id, status);
    }
    handleStatusMenuClose();
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorderTasks?.(result.source.index, result.destination.index);
  };

  const renderSubTasks = (subTasks: SubTask[]) => (
    <List dense>
      {subTasks?.map((subTask) => (
        <ListItem
          key={subTask.id}
          sx={{
            pl: 4,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={subTask.completed}
              size="small"
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                sx={{
                  textDecoration: subTask.completed ? 'line-through' : 'none',
                }}
              >
                {subTask.title}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ padding: 0, margin: 0 }}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListItem
                      sx={{
                        mb: 0.5,
                        py: 0.5,
                        px: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        borderLeft: 6,
                        borderColor: task.category?.color || 'divider',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={task.completed}
                          onChange={() => onToggleTask?.(task.id)}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography
                              variant="body1"
                              sx={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                              }}
                            >
                              {task.title}
                            </Typography>
                            <Chip
                              size="small"
                              label={getStatusLabel(task.status)}
                              onClick={(e) => handleStatusClick(task, e)}
                              sx={{
                                bgcolor: getStatusColor(task.status),
                                color: 'white',
                                cursor: 'pointer',
                                '&:hover': {
                                  opacity: 0.8,
                                },
                              }}
                            />
                            {task.labels?.map((label) => (
                              <Chip
                                key={label}
                                size="small"
                                label={label}
                                icon={<LabelIcon />}
                              />
                            ))}
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                {task.category?.name || 'Kategori Yok'}
                              </Typography>
                              {task.dueDate && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <TimeIcon fontSize="small" color="action" />
                                  <Typography variant="body2" color="text.secondary">
                                    {format(new Date(task.dueDate), 'dd MMMM yyyy', { locale: tr })}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={task.progress}
                              sx={{ height: 4, borderRadius: 2 }}
                            />
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {task.subTasks?.length > 0 && (
                          <Tooltip title="Alt Görevler">
                            <Badge badgeContent={task.subTasks?.length || 0} color="primary">
                              <IconButton
                                size="small"
                                onClick={() => handleExpandTask(task.id)}
                              >
                                {expandedTasks.includes(task.id) ? <CollapseIcon /> : <ExpandIcon />}
                              </IconButton>
                            </Badge>
                          </Tooltip>
                        )}
                        {task.comments?.length > 0 && (
                          <Tooltip title="Yorumlar">
                            <Badge badgeContent={task.comments?.length || 0} color="info">
                              <CommentIcon fontSize="small" />
                            </Badge>
                          </Tooltip>
                        )}
                        {task.attachments?.length > 0 && (
                          <Tooltip title="Ekler">
                            <Badge badgeContent={task.attachments?.length || 0} color="secondary">
                              <AttachmentIcon fontSize="small" />
                            </Badge>
                          </Tooltip>
                        )}
                        <IconButton
                          edge="end"
                          onClick={(e) => handleMenuClick(e, task)}
                        >
                          <MoreIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Collapse in={expandedTasks.includes(task.id)}>
                      {renderSubTasks(task.subTasks || [])}
                    </Collapse>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Düzenle</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sil</ListItemText>
        </MenuItem>
        {selectedTask?.history && selectedTask.history.length > 0 && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Geçmiş</ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* Durum Seçim Menüsü */}
      <Menu
        anchorEl={statusMenuAnchorEl}
        open={Boolean(statusMenuAnchorEl)}
        onClose={handleStatusMenuClose}
      >
        <MenuItem onClick={() => handleStatusSelect('not_started')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.info.main }} />
            <Typography>Başlamadı</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('in_progress')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.warning.main }} />
            <Typography>Devam Ediyor</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('on_hold')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.grey[500] }} />
            <Typography>Beklemede</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('completed')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.success.main }} />
            <Typography>Tamamlandı</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('cancelled')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.error.main }} />
            <Typography>İptal Edildi</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </DragDropContext>
  );
};

export default TaskList;