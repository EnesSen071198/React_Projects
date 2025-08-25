import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRefresh = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 3 
          }}
        >
          <Paper sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Oops! Bir şeyler yanlış gitti
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uygulama beklenmedik bir hatayla karşılaştı. 
                Sayfayı yenileyerek sorunu çözmeyi deneyebilirsiniz.
              </Typography>
            </Alert>
            
            {this.state.error && (
              <Typography 
                variant="caption" 
                component="pre" 
                sx={{ 
                  display: 'block', 
                  textAlign: 'left', 
                  bgcolor: 'grey.100', 
                  p: 2, 
                  borderRadius: 1,
                  mb: 3,
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  maxHeight: 200
                }}
              >
                {this.state.error.message}
              </Typography>
            )}
            
            <Button
              variant="contained"
              onClick={this.handleRefresh}
              startIcon={<RefreshIcon />}
              size="large"
            >
              Sayfayı Yenile
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;