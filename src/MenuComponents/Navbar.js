import React, { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";

function Navbar({toggleDrawer, open}) {
   const navigate = useNavigate();
   const navigationButtons = [{name: "Статистика", route: "statistics"}, {name: "Опитування", route: "surveys/available"}];

    const list =  (
      <Box
        role="presentation"
        onClick={() => toggleDrawer(false)}
      >
        <List>
          {navigationButtons.map((button) => (
            <ListItem key={button.name} disablePadding>
              <ListItemButton onClick={() => navigate(button.route)}>
                <ListItemText sx={{
              display:'flex'
            }} 
            primary={button.name}
            primaryTypographyProps={{variant:'h5', padding:'10%'}} 
            />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

    return (
      <div>
            <Drawer
             sx={{
              // width: '15%',
              '& .MuiDrawer-paper': {
                 width: '15rem',
                borderRadius:'0'
              },
            }}
              anchor='left'
              open={open}
              onClose={() => toggleDrawer(false)}
            >
              {list}
            </Drawer>
      </div>
    );
}

export default Navbar;