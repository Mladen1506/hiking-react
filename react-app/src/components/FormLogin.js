import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ajax } from '../utils/ajax-adapter';
import { useDispatch } from 'react-redux';

const FormLogin = () => {
  const dispatch = useDispatch();

  const theme = createTheme();

  const preset = {
    username: '',
    password: '',
    rememberme: true
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

    if (formState.username === '') {
      test = false;
    }
    if (formState.password === '') {
      test = false;
    }
    return test;
  }

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (validator(formState)) {
      console.log('click submit...');
      console.log(formState);
      ajax.authLogin(formState)
        .then((response)=> {
          console.log(response);
          if (response && response.data && response.data.data && response.data.data.authLogin){
            const token = response.data.data.authLogin;
            ajax.storeToken(token);
            // form login procedura zavrsena
            // auto login procedura 
            ajax.myUserData()
              .then((response) => {
                console.log('test 2')
                console.log('.then() response za myuserdata primljen', response)
                if (response && response.data && response.data.data && response.data.data.myUserData._id) {
                  console.log(response.data.data.myUserData)
                  const myUserData = response.data.data.myUserData && response.data.data.myUserData;
                  dispatch({
                    // type: 'MY_USER_DATA_FETCHED',
                    type: 'LOGIN_SUCCESS',
                    payload: myUserData
                  });
                }
              })
          }
        })
    } else {
      window.alert('Error')
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={() => { }} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              name="rememberme"
              checked={formState.rememberme}
              onChange={handleChange}
            />
            <Button
              type="button"
              onClick={handleClickSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormLogin;