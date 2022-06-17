import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ajax } from '../utils/ajax-adapter';
import { useDispatch } from 'react-redux';

const FormRegister = () => {

  const dispatch = useDispatch();

  const theme = createTheme();

  const preset = {
    username: '',
    password: '',
    password2: ''
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

  const validator = () => {
    let test = true;

    if(formState.username === ''){
      test = false;
    }
    if(formState.password === ''){
      test = false;
    }
    if(formState.password2 === ''){
      test = false;
    }
    if (formState.password !== formState.password2){
      test = false;
    }

    return test;
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if(validator(formState)){
      console.log('click submit...');
      console.log(formState);
      ajax.authRegister(formState)
      .then(() => {
        dispatch({
          type: 'ROUTE_SET',
          payload: 'LOGIN'
        })
      })
    } else{
      window.alert('Error')
    }
  };


  return(
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
            <TextField
              id="email"
              name="username"
              value={formState.username}
              onChange={handleChange}
              label="Username"
              margin="normal"
              required
              fullWidth
              autoComplete="email"
              autoFocus
            />
            <TextField
              name="password"
              label="Password"
              value={formState.password}
              onChange={handleChange}
              type="password"
              id="password"
              margin="normal"
              required
              fullWidth
            />
            <TextField
              name="password2"
              label="Confirm Password"
              value={formState.password2}
              onChange={handleChange}
              type="password"
              margin="normal"
              id="password2"
              required
              fullWidth
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClickSubmit}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormRegister;