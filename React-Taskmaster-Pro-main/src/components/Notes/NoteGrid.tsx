import { Grid, Card, CardContent, CardActionArea, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material';
import {
  PushPin as PinIcon,
  Archive as ArchiveIcon,
  Label as TagIcon,
  Folder as CategoryIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { togglePinNote, toggleArchiveNote, reorderNotes } from '../../store/slices/notesSlice';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Note } from '../../types/notes';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown-light.css';

interface NoteGridProps {
  notes: Note[];
  onNoteClick: (id: string) => void;
}

const NoteGrid = ({ notes, onNoteClick }: NoteGridProps) => {
  const dispatch = useDispatch();

  const handlePinClick = (event: React.MouseEvent, noteId: string) => {
    event.stopPropagation();
    dispatch(togglePinNote(noteId));
  };

  const handleArchiveClick = (event: React.MouseEvent, noteId: string) => {
    event.stopPropagation();
    dispatch(toggleArchiveNote(noteId));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    if (startIndex === endIndex) return;

    dispatch(reorderNotes({ startIndex, endIndex }));
  };

  // Notları önce pinlenmiş olanlara göre sırala
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="notes" direction="horizontal">
        {(provided) => (
          <Grid 
            container 
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sortedNotes.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id} index={index}>
                {(provided, snapshot) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        bgcolor: note.color || 'background.paper',
                        transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                        boxShadow: snapshot.isDragging ? 8 : 1,
                        '&:hover': {
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => onNoteClick(note.id)}
                        sx={{ height: '100%' }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="h6" noWrap>
                              {note.title}
                            </Typography>
                            <Box>
                              <IconButton
                                {...provided.dragHandleProps}
                                size="small"
                                sx={{ cursor: 'grab' }}
                              >
                                <DragIcon />
                              </IconButton>
                              <Tooltip title={note.isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}>
                                <IconButton
                                  size="small"
                                  onClick={(e) => handlePinClick(e, note.id)}
                                  color={note.isPinned ? 'primary' : 'default'}
                                >
                                  <PinIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={note.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}>
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleArchiveClick(e, note.id)}
                                  color={note.isArchived ? 'primary' : 'default'}
                                >
                                  <ArchiveIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>

                <Box
                  sx={{
                    height: 150,
                    overflow: 'hidden',
                    mb: 2,
                  }}
                  className="markdown-body"
                >
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </Box>

                {note.category && (
                  <Box sx={{ mb: 1 }}>
                    <Chip
                      icon={<CategoryIcon />}
                      label={note.category}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  </Box>
                )}

                {note.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {note.tags.map(tag => (
                      <Chip
                        key={tag}
                        icon={<TagIcon />}
                        label={tag}
                        size="small"
                      />
                    ))}
                  </Box>
                )}

                          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                            Son güncelleme: {format(new Date(note.updatedAt), 'dd MMMM yyyy HH:mm', { locale: tr })}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NoteGrid;