import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, FormLabel, Radio, RadioGroup, Rating } from '@mui/material';
import { ajax } from '../utils/ajax-adapter';

const FormReview = (props) => {
  const theme = createTheme();

  const tour_id = props.tour_id;

  const preset = {
    rating: 0,
    text: ''
  };

  const [formState, setFormState] = useState(preset);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const validator = (formState) => {
    let test = true;

    if (!(parseInt(formState.rating) > 0)) {
      test = false;
    }
    if (formState.text === '') {
      test = false;
    }
    return test;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator(formState)) {
      console.log('submit...');
      console.log(formState);
      const submitData = {
        ...formState,
        rating: parseInt(formState.rating),
        tour_id: tour_id,
        // user_id: '???'
      };
      console.log(submitData);
      ajax.reviewCreate(submitData)
        .then((response) => {
          console.log('response za create review stigao', response);
        })
    } else {
      window.alert('Form validation error')
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h5">
            Your Review
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="legend">Your Review</Typography>
            <Rating
              name="rating"
              value={formState.rating}
              onChange={handleChange}
            />
            <TextField
              label="Your Review"
              name="text"
              value={formState.text}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              fullWidth
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Review
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormReview;