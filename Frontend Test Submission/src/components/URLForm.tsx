import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';
import { logRequest } from '../middleware/logger';

const URLForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiry, setExpiry] = useState(30); // default 30 mins
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!originalUrl.trim()) {
      setError('Please enter the original URL');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await logRequest({
        endpoint: '/shorten',
        method: 'POST',
      });

      const res = await axios.post(
        'http://localhost:3000/shorten',
        {
          originalUrl: originalUrl.trim(),
          customCode: customCode.trim() || undefined,
          expiryMinutes: expiry,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShortUrl(`http://localhost:3000/${res.data.shortCode}`);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'Failed to shorten URL. Try again.'
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Shorten Your URL
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Original URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Custom Code (Optional)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Expiry (in minutes)"
              value={expiry}
              onChange={(e) => setExpiry(parseInt(e.target.value))}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit} fullWidth>
              Shorten
            </Button>
          </Grid>

          {shortUrl && (
            <Grid item xs={12}>
              <Typography color="primary">Short URL: {shortUrl}</Typography>
            </Grid>
          )}

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default URLForm;
