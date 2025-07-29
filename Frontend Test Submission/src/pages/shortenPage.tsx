import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import URLForm from '../components/URLForm';

const ShortenPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <URLForm />
      </Box>
    </Container>
  );
};

export default ShortenPage;
