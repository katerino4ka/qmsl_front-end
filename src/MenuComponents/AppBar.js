import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../Content/Logo.png';
import { Typography, Stack, Icon } from '@mui/material';
import { UserContext } from '../Routes/App';
import ProfileMenu from '../Components/ProfileMenu';

export default function Appbar({ toggleDrawer }) {
  const { userData } = React.useContext(UserContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ marginBottom: '2%' }} >
        <Toolbar>
          <IconButton onClick={() => toggleDrawer(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon sx={{ width: '3rem', height: '3rem' }}>
              <img src={Logo} width='100%' height='100%' />
            </Icon>
          </IconButton>
          <Stack direction={'row'} sx={{ marginLeft: "auto" }}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            alignItems={'center'}>
            <Typography variant="h5" gutterBottom>
              {`${userData.name} ${userData.surname}`}
            </Typography>
            <ProfileMenu />
          </Stack>

        </Toolbar>
      </AppBar>
    </Box>
  );
}