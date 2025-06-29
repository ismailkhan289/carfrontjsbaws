import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './components/Login'
import Box from '@mui/material/Box'
import { useState } from 'react';
const queryClient = new QueryClient();


function App() {

  const storedUsername = localStorage.getItem('username');
  const [username, setUsername] = useState<string | null>(
    storedUsername && storedUsername !== "undefined" ? storedUsername : null
  );
  console.log(username);
  return (
    <Container maxWidth="xl">
    {/* make the to fix inconsistence among the browser view using CssBaseline */}
    <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Car Shop
          </Typography>
           {username ? (
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="subtitle1">
                {username}
              </Typography>
            </Box>
          ): null}
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Login setUsername={setUsername} />
      </QueryClientProvider>
    </Container>
  )
}

export default App
