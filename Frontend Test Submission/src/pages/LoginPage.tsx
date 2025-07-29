import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!rollNumber.trim()) {
      setError('Roll number is required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/login', {
        rollNumber: rollNumber.trim(),
      });

      const token = res.data.token;
      localStorage.setItem('token', token);

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Login failed. Try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleLogin} fullWidth>
          Submit
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
