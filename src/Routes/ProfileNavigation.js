
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
function ProfileNavigation(){
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box  sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} >
                        <Tab label={<Typography variant='h6'>Особисті дані</Typography>} value="1" onClick={() => navigate('personal')} />
                        <Tab label={<Typography variant='h6'>Пацієнти</Typography>} value="2" onClick={() => navigate('patients')} />
                    </TabList>
                </Box>
            </TabContext>
            <Outlet />
        </Box>

    );
}
export default ProfileNavigation;