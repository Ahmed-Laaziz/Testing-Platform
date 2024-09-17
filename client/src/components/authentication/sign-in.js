import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthImg from '../../images/authentication/data_management2.gif';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../authentication/tokenContext';
import { useUser } from '../../context/userContext';


const backLink = "http://localhost:5000";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        QA Automation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {

  const { updateUser} = useUser();


  const navigate = useNavigate();
  const { setToken } = useToken();
  const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');


    // Reset previous error messages
  setEmailError('');
  setPasswordError('');

  if (!email) {
    // Display an error message if email or password is empty
    setEmailError('Email requis');
    // return;
  }
  if (!password) {
    // Display an error message if email or password is empty
    setPasswordError('Mot de passe requis');
    // return;
  }
  
    try {
        console.log(backLink);
        
      // Send a POST request to the /login endpoint with user credentials
      // const response = await axios.post('https://grh-ensaj-backend.adaptable.app/auth/login', { email, password });
      const response = await axios.post(backLink+'/auth/login', { email, password });
      // If authentication is successful, you will receive a JWT token in the response
      const token = response.data.token;

      updateUser(response.data.user);
      localStorage.setItem('user', response.data.user)
      localStorage.setItem('type', response.data.user.__t)

      setToken(token);
      // Save the token in localStorage
    localStorage.setItem('token', token);
      navigate(`/home`);
      // Redirect the user or perform any necessary actions upon successful login
    } catch (error) {
      if (error.response.status === 400 && password !== ''){
        setPasswordError('Mot de passe incorrect');
      }
      else if (error.response.status === 404 && email !== ''){
        setEmailError('Email incorrect');
      }
      // Handle authentication errors
      if (error.response) {
        console.error('Authentication failed:', error.response.data.error);
      } else {
        console.error('An error occurred during authentication:', error.message);
      }
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${AuthImg})`,
            // backgroundImage: "https://statusneo.com/wp-content/uploads/2023/03/GIF-image-1.gif",
             backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              &nbsp;
            </Typography>
            <Grid>&nbsp;</Grid>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
  margin="normal"
  required
  fullWidth
  id="email"
  label="Email"
  name="email"
  autoComplete="email"
  autoFocus
/>
<span style={{ color: 'red' , fontSize: '70%'}}>{emailError}</span>

<TextField
  margin="normal"
  required
  fullWidth
  name="password"
  label="Mot de passe"
  type="password"
  id="password"
  autoComplete="current-password"
/>
<span style={{ color: 'red' , fontSize: '70%'}}>{passwordError}</span>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="se souvenir de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/retrieve" variant="body2">
                    Forgotten your password?
                  </Link>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}