import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Chip,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  PushPin as PinIcon,
  Archive as ArchiveIcon,
  Label as TagIcon,
  Folder as CategoryIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { togglePinNote, toggleArchiveNote } from '../../store/slices/notesSlice';
import { Note } from '../../types/notes';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown-light.css';

interface NoteListProps {
  notes: Note[];
  onNoteClick: (id: string) => void;
}

const NoteList = ({ notes, onNoteClick }: NoteListProps) => {
  const dispatch = useDispatch();

  const handlePinClick = (event: React.MouseEvent, noteId: string) => {
    event.stopPropagation();
    dispatch(togglePinNote(noteId));
  };

  const handleArchiveClick = (event: React.MouseEvent, noteId: string) => {
    event.stopPropagation();
    dispatch(toggleArchiveNote(noteId));
  };

  // Notları önce pinlenmiş olanlara göre sırala
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <List>
      {sortedNotes.map((note, index) => (
        <Box key={note.id}>
          <ListItem
            disablePadding
            sx={{
              bgcolor: note.color || 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemButton onClick={() => onNoteClick(note.id)}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {note.title}
                    </Typography>
                    {note.isPinned && (
                      <PinIcon fontSize="small" color="primary" />
                    )}
                    {note.isArchived && (
                      <ArchiveIcon fontSize="small" color="primary" />
                    )}
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Box
                      sx={{
                        maxHeight: 60,
                        overflow: 'hidden',
                        mb: 1,
                      }}
                      className="markdown-body"
                    >
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                      {note.category && (
                        <Chip
                          icon={<CategoryIcon />}
                          label={note.category}
                          size="small"
                        />
                      )}

                      {note.tags.map(tag => (
                        <Chip
                          key={tag}
                          icon={<TagIcon />}
                          label={tag}
                          size="small"
                        />
                      ))}

                      <Typography variant="caption" color="textSecondary">
                        Son güncelleme: {format(new Date(note.updatedAt), 'dd MMMM yyyy HH:mm', { locale: tr })}
                      </Typography>
                    </Box>
                  </Box>
                }
              />

              <ListItemSecondaryAction>
                <Tooltip title={note.isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}>
                  <IconButton
                    edge="end"
                    onClick={(e) => handlePinClick(e, note.id)}
                    color={note.isPinned ? 'primary' : 'default'}
                  >
                    <PinIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={note.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}>
                  <IconButton
                    edge="end"
                    onClick={(e) => handleArchiveClick(e, note.id)}
                    color={note.isArchived ? 'primary' : 'default'}
                  >
                    <ArchiveIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          {index < sortedNotes.length - 1 && <Divider />}
        </Box>
      ))}

      {notes.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ py: 4 }}
        >
          Henüz not bulunmuyor.
        </Typography>
      )}
    </List>
  );
};

export default NoteList;