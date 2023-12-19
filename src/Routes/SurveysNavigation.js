import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';

function SurveysNavigation(){
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} >
                        <Tab label={<Typography variant='h6'>Доступні</Typography>} value="1" onClick={() => navigate('available')} />
                        <Tab label={<Typography variant='h6'>Пройдені</Typography>} value="2" onClick={() => navigate('results')}/>
                    </TabList>
                </Box>
            </TabContext>
            <Outlet />
        </Box>
        
    );
}
export default SurveysNavigation;
