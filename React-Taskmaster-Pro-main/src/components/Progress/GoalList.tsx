import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Flag as GoalIcon,
  CheckCircle as CompletedIcon,
  Cancel as FailedIcon,
  PlayArrow as InProgressIcon,
  Schedule as PendingIcon,
  Star as MilestoneIcon,
} from '@mui/icons-material';
import { GoalProgress } from '../../types/progress';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../../store/slices/progressSlice';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface GoalListProps {
  goals: GoalProgress[];
}

const GoalList = ({ goals }: GoalListProps) => {
  const dispatch = useDispatch();
  const [menuAnchor, setMenuAnchor] = useState<{
    element: null | HTMLElement;
    goalId: string;
  }>({ element: null, goalId: '' });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, goalId: string) => {
    setMenuAnchor({ element: event.currentTarget, goalId });
  };

  const handleMenuClose = () => {
    setMenuAnchor({ element: null, goalId: '' });
  };

  const handleDelete = () => {
    dispatch(deleteGoal(menuAnchor.goalId));
    handleMenuClose();
  };

  const getStatusIcon = (status: GoalProgress['status']) => {
    switch (status) {
      case 'completed':
        return <CompletedIcon color="success" />;
      case 'failed':
        return <FailedIcon color="error" />;
      case 'in_progress':
        return <InProgressIcon color="primary" />;
      default:
        return <PendingIcon color="disabled" />;
    }
  };

  const getStatusText = (status: GoalProgress['status']) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'failed':
        return 'Başarısız';
      case 'in_progress':
        return 'Devam Ediyor';
      default:
        return 'Başlanmadı';
    }
  };

  const getStatusColor = (status: GoalProgress['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'in_progress':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      {goals.map(goal => (
        <Grid item xs={12} key={goal.id}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <GoalIcon sx={{ mr: 2, mt: 0.5 }} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">{goal.title}</Typography>
                  <Chip
                    size="small"
                    icon={getStatusIcon(goal.status)}
                    label={getStatusText(goal.status)}
                    color={getStatusColor(goal.status)}
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {goal.description}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => handleMenuOpen(e, goal.id)}
              >
                <MoreIcon />
              </IconButton>
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
                  {goal.currentValue} / {goal.targetValue} {goal.unit}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(goal.currentValue / goal.targetValue) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {goal.milestones.map((milestone, index) => (
                <Tooltip
                  key={index}
                  title={`${milestone.value} ${goal.unit}${
                    milestone.achieved
                      ? ` - ${format(
                          new Date(milestone.achievedAt!),
                          'dd MMM yyyy',
                          { locale: tr }
                        )}`
                      : ''
                  }`}
                >
                  <Chip
                    size="small"
                    icon={<MilestoneIcon />}
                    label={`${milestone.value} ${goal.unit}`}
                    color={milestone.achieved ? 'success' : 'default'}
                    variant={milestone.achieved ? 'filled' : 'outlined'}
                  />
                </Tooltip>
              ))}
            </Box>

            <Typography variant="caption" color="text.secondary">
              {format(new Date(goal.startDate), 'dd MMM yyyy', { locale: tr })} -{' '}
              {format(new Date(goal.endDate), 'dd MMM yyyy', { locale: tr })}
            </Typography>
          </Paper>
        </Grid>
      ))}

      <Menu
        anchorEl={menuAnchor.element}
        open={Boolean(menuAnchor.element)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Sil</MenuItem>
      </Menu>
    </Grid>
  );
};

export default GoalList;