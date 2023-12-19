import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Routes/App';

export default function ProfileMenu() {
    const {setUser} = React.useContext(UserContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onLogoutClick = () =>{
        setUser({});
        navigate('login')
    }

    return (

        <div>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <AccountCircle sx={{ fontSize: '3rem' }} />
            </IconButton>

            <Menu
                PaperProps={{  
                    style: {  
                      width: '10rem',  
                    },  
                 }} 
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => navigate('profile/personal')}><Typography variant='h6'>Кабінет</Typography></MenuItem>
                <MenuItem onClick={onLogoutClick}><Typography variant='h6'>Вийти</Typography></MenuItem>
            </Menu>
        </div>
    );
}