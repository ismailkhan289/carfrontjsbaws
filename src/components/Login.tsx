import { useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography, Stack, InputAdornment, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Dispatch, SetStateAction } from 'react';
import Carlist from "./Carlist";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginProps {
  setUsername: Dispatch<SetStateAction<string | null>>;
}

type User = {
  username: string;
  password: string;
};

function Login({ setUsername }: LoginProps) {
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = () => {
    axios.post(import.meta.env.VITE_API_URL + "/login", user, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        const jwtToken = res.headers.authorization;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          localStorage.setItem("token", jwtToken);
          setUsername(user.username);
        }
      })
      .catch(() => setOpen(true));
  };

  const handleLogout = () => {
    sessionStorage.setItem("jwt", "");
    localStorage.setItem("token", "");
    setUsername(null);
    window.location.reload();
  };

  if (localStorage.getItem("token")) {
    // Carlist component ko show karein jab login ho
    // eslint-disable-next-line
    // @ts-ignore
    return <Carlist logout={handleLogout} />;
  }

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <Paper elevation={6} sx={{ p: 4, maxWidth: 350, width: "100%", borderRadius: 3 }}>
        <Stack alignItems="center" spacing={2}>
          <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight={600} color="primary">
            Sign In
          </Typography>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 1, borderRadius: 2, textTransform: "none" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Login Failed: Check Username and Password"
      />
    </Stack>
  );
}

export default Login;