import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSingleTourById } from '../utils/tour-utils';
import { ajax } from '../utils/ajax-adapter';



const FormTour = (props) => {
  const theme = createTheme();

  const tours = useSelector((state) => state.tours);
  const routeParams = useSelector((state) => state.routeParams);
  const tour_id = routeParams.tour_id;

  const modeEdit = props.modeEdit;

  const preset = {
    name: '',
    description: '',
    date: '06/14/2022',
    difficulty: 'EASY',
    trail_length: 14,
    max_participants: 99
  };

  const [formState, setFormState] = useState(preset);

  useEffect(() => {
    const editingTour = getSingleTourById(tour_id, tours);
    if (editingTour !== null){
      setFormState(editingTour);
    }
  }, [tour_id, tours]);

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

    if (formState.name === '') {
      test = false;
    }
    if (formState.description === '') {
      test = false;
    }
    if (formState.trail_length < 1) {
      test = false;
    }
    return test;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator(formState)) {
      console.log('submit...');
      console.log(formState);
      if (modeEdit) {

      } else {
        ajax.tourCreate(formState)
        .then((response) => {
          console.log(response);
        })
      }
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
          <Typography component="h1" variant="h3">
            {modeEdit ? 'Edit Tour' : 'Create Tour'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id="tourname"
              label="Tour Name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <TextField
              id="description"
              label="Description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
              fullWidth
              autoFocus
            />
            <TextField
              id="date"
              label="Date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <FormLabel id="difficulty">Difficulty</FormLabel>
            <RadioGroup
              row
              defaultValue="EASY"
              name="difficulty"
              value={formState.difficulty}
              onChange={handleChange}
            >
              <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
              <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
            </RadioGroup>
            <TextField
              id="trail_length"
              label="Trail Length"
              name="trail_length"
              value={formState.trail_length}
              onChange={handleChange}
              margin="normal"
              type='number'
              required
              fullWidth
              autoFocus
            />
            <TextField
              id="max_participants"
              label="Max Number Of Participants"
              name="max_participants"
              value={formState.max_participants}
              onChange={handleChange}
              margin="normal"
              type='number'
              required
              fullWidth
              autoFocus
            />
            {modeEdit ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            )
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormTour;