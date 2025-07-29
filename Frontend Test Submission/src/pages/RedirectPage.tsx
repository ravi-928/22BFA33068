import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, CircularProgress } from '@mui/material';
import { logRequest } from '../middleware/logger';

const RedirectPage = () => {
  const { shortcode } = useParams<{ shortcode: string }>();
  const [error, setError] = useState('');

  useEffect(() => {
    const redirect = async () => {
      try {
        await logRequest({
          endpoint: `/redirect/${shortcode}`,
          method: 'GET',
        });

        const res = await axios.get(
          `http://localhost:3000/redirect/${shortcode}`
        );

        window.location.href = res.data.originalUrl;
      } catch (err: any) {
        setError(
          err?.response?.data?.message || 'Invalid or expired short URL.'
        );
      }
    };

    redirect();
  }, [shortcode]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem', textAlign: 'center' }}>
      {!error ? (
        <>
          <CircularProgress />
          <Typography variant="body1" mt={2}>
            Redirecting...
          </Typography>
        </>
      ) : (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default RedirectPage;
