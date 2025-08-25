import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box, Typography, Button } from '@mui/material';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        setLoading(true);
        const search = location.search;
        
        console.log('📍 Location search:', search);
        
        if (search && search.includes('code=')) {
          const params = new URLSearchParams(search.substring(1));
          const authorizationCode = params.get('code');
          const state = params.get('state');
          const error = params.get('error');
          
          if (error) {
            setError(`Google authentication error: ${error}`);
            setLoading(false);
            return;
          }
          
          if (authorizationCode) {
            console.log('✅ Authorization code received');
            
            // Here you would typically send this code to your backend
            // Backend would exchange it for access token
            console.log('Authorization code:', authorizationCode);
            console.log('State (role):', state);
            
            // For now, simulate successful login
            const userRole = state || 'admin';
            localStorage.setItem('isGoogleLogin', 'true');
            localStorage.setItem('userRole', userRole);
            
            navigate(`/${userRole.toLowerCase()}/dashboard`, { replace: true });
          }
        } else {
          setError('No authorization code found. Please try logging in again.');
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Google callback error:', error);
        setError('Authentication failed. Please try again.');
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [navigate, location]);

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
        padding: 3,
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={60} sx={{ color: 'white', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
            Completing Google authentication...
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={handleRetry}
            sx={{
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(to right, #5a0fbf, #1f65e0)'
              }
            }}
          >
            Return to Home
          </Button>
        </>
      )}
    </Box>
  );
};

export default GoogleCallback;