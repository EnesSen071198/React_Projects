import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Favorite as HealthIcon,
  Assignment as ProjectIcon,
  Event as MeetingIcon,
  Alarm as DeadlineIcon,
  Label as DefaultIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedCategory } from '../../store/slices/categoriesSlice';
import { TaskCategory } from '../../types/categories';

interface CategoryListProps {
  onAddCategory: () => void;
}

const CategoryList = ({ onAddCategory }: CategoryListProps) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.items);
  const selectedCategoryId = useSelector((state: RootState) => state.categories.selectedCategory);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'work':
        return <WorkIcon />;
      case 'person':
        return <PersonIcon />;
      case 'school':
        return <SchoolIcon />;
      case 'favorite':
        return <HealthIcon />;
      case 'assignment':
        return <ProjectIcon />;
      case 'event':
        return <MeetingIcon />;
      case 'alarm':
        return <DeadlineIcon />;
      default:
        return <DefaultIcon />;
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
  };

  const handleExpandClick = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderCategory = (category: TaskCategory) => {
    const hasSubcategories = categories.some(cat => cat.parentId === category.id);
    const isExpanded = expandedCategories.includes(category.id);
    const subCategories = categories.filter(cat => cat.parentId === category.id);

    return (
      <Box key={category.id}>
        <ListItem
          disablePadding
          secondaryAction={
            category.allowsSubcategories && (
              <IconButton edge="end" onClick={() => handleExpandClick(category.id)}>
                {hasSubcategories && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
              </IconButton>
            )
          }
          sx={{ margin: 0, padding: 0 }}
        >
          <ListItemButton
            selected={selectedCategoryId === category.id}
            onClick={() => handleCategoryClick(category.id)}
            sx={{
              pl: category.parentId ? 1 : 0,
              pr: 0,
              py: 0.125,
              margin: 0,
              borderRadius: 0,
              minHeight: 32,
              width: '100%',
              justifyContent: 'flex-start',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: category.color, minWidth: 24, pr: 0.5, mr: 0 }}>
              {getCategoryIcon(category.icon)}
            </ListItemIcon>
            <ListItemText
              primary={category.name}
              secondary={
                <Typography variant="body2" color="text.secondary" noWrap>
                  {category.description}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>

        {hasSubcategories && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subCategories.map(subCategory => renderCategory(subCategory))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        padding: 0,
        margin: 0,
        '& .MuiListItem-root': {
          padding: 0,
          margin: 0,
        },
        '& .MuiCollapse-root': {
          margin: 0,
        },
      }}
    >
      {categories
        .filter(category => !category.parentId)
        .map(category => renderCategory(category))}

      <ListItem
        disablePadding
        sx={{
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <ListItemButton onClick={onAddCategory}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Yeni Kategori Ekle" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default CategoryList;