import { useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SkipNext as SkipIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  tick,
  switchPhase,
  updateStats,
} from '../../store/slices/pomodoroSlice';

const Timer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    settings,
    isActive,
    timeRemaining,
    isBreak,
    currentSession,
    totalFocusTime,
  } = useSelector((state: RootState) => state.pomodoro);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch(tick());
      }, 1000);
    } else if (timeRemaining === 0) {
      // Ses çal
      const audio = new Audio(isBreak ? '/sounds/break.mp3' : '/sounds/complete.mp3');
      audio.volume = settings.volume;
      audio.play();

      dispatch(switchPhase());
      dispatch(updateStats());
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive, timeRemaining, dispatch, isBreak, settings.volume]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const totalTime = isBreak
      ? currentSession % settings.sessionsUntilLongBreak === 0
        ? settings.longBreakDuration
        : settings.breakDuration
      : settings.workDuration;

    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  const handleStart = () => {
    if (settings.tickSound) {
      const audio = new Audio('/sounds/tick.mp3');
      audio.volume = settings.volume;
      audio.play();
    }
    dispatch(startTimer());
  };

  const handlePause = () => {
    dispatch(pauseTimer());
  };

  const handleStop = () => {
    dispatch(resetTimer());
  };

  const handleSkip = () => {
    dispatch(switchPhase());
    dispatch(updateStats());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        position: 'relative',
      }}
    >
      <Typography
        variant="h6"
        color="inherit"
        sx={{ mb: 2, opacity: 0.9 }}
      >
        {isBreak ? 'Mola Zamanı' : 'Çalışma Zamanı'}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          mb: 3,
        }}
      >
        <CircularProgress
          variant="determinate"
          value={calculateProgress()}
          size={200}
          thickness={4}
          sx={{
            color: 'inherit',
            opacity: 0.3,
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="div"
            color="inherit"
            sx={{ fontWeight: 'light' }}
          >
            {formatTime(timeRemaining)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {!isActive ? (
          <Tooltip title="Başlat">
            <IconButton
              onClick={handleStart}
              color="inherit"
              size="large"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <PlayIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Duraklat">
            <IconButton
              onClick={handlePause}
              color="inherit"
              size="large"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <PauseIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Sıfırla">
          <IconButton
            onClick={handleStop}
            color="inherit"
            size="large"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <StopIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Atla">
          <IconButton
            onClick={handleSkip}
            color="inherit"
            size="large"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <SkipIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="body1" color="inherit" sx={{ opacity: 0.9 }}>
        Oturum: {currentSession + 1} / {settings.sessionsUntilLongBreak}
      </Typography>

      <Typography variant="body2" color="inherit" sx={{ mt: 1, opacity: 0.7 }}>
        Bugün Toplam: {Math.floor(totalFocusTime / 60)} saat{' '}
        {totalFocusTime % 60} dakika
      </Typography>
    </Box>
  );
};

export default Timer;