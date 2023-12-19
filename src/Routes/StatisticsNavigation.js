import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';

function StatisticsNavigation() {
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
                        <Tab label="Bar Chart" value="1"  onClick={() => navigate('barchart')} />
                        <Tab label="Pie Chart" value="2" onClick={() => navigate('piechart')} />
                        <Tab label="Table view" value="3" onClick={() => navigate('table')} />
                    </TabList>
                </Box>
            </TabContext>
            <Outlet />
        </Box>

    );
}
export default StatisticsNavigation;
