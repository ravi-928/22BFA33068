import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logRequest } from '../middleware/logger';

interface Click {
  timestamp: string;
  location?: string;
  source?: string;
}

interface ShortURL {
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  expiresAt: string;
  clicks: Click[];
}

const StatsPage = () => {
  const [urls, setUrls] = useState<ShortURL[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchStats = async () => {
      try {
        await logRequest({
          endpoint: '/stats',
          method: 'GET',
        });

        const res = await axios.get('http://localhost:3000/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUrls(res.data.urls || []);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || 'Failed to fetch stats.'
        );
      }
    };

    fetchStats();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {urls.map((url, idx) => (
        <Card key={idx} style={{ marginTop: '1rem' }
