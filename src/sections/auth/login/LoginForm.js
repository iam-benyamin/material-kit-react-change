import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit'

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------


export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showError, SetShowError] = useState(false);
  const signIn = useSignIn();




  const handleClick = () => {
    if (email === "abc@mail.com" && password === "123456") {
      signIn(
        {
          token: "we think this is a token", 
          expiresIn: 3600,
          tokenType: "barrer",
        }
      );
      navigate('/dashboard/app', { replace: true });
    } else {
      console.log('out');
      SetShowError(true)
    }
  };

  return (
    <>
      <Alert severity="error" style={{ marginBottom: '20px', display: showError ? 'block' : 'none' }}>
        <AlertTitle>Error</AlertTitle>
        wrong Email Or Password — <strong>check it out!</strong>
      </Alert>

      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          onChange={e => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" /><span >Remember me</span>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>


    </>
  );
}
