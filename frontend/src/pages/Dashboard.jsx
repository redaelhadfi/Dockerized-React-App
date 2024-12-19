import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import useUserStore from '../store/userStore';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Prevent rendering if user is being redirected
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          p: 3,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome, {user.username}!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {user.email}
          </Typography>
          <Typography variant="h6" mt={3} mb={1}>
            Your Roles:
          </Typography>
          <List>
            {user.roles.map((role, index) => (
              <ListItem key={index}>
                <ListItemText primary={role} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              mt: 3,
              px: 4,
              py: 1,
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
