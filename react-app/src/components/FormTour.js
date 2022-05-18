import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const FormTour = () => {

  const theme = createTheme();

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
            Create Tour
          </Typography>
          <Box component="form" onSubmit={() => { }} noValidate sx={{ mt: 1 }}>
            <TextField
              id="tourname"
              label="Tour Name"
              name="tourname"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <TextField
              id="description"
              label="Description"
              name="description"
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
            >
              <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
              <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
            </RadioGroup>
            <TextField
              id="trail_length"
              label="Trail Length"
              name="trail_length"
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
              margin="normal"
              type='number'
              required
              fullWidth
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormTour;