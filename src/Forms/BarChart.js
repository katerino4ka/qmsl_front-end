import React from 'react'
import GeneralSurvey from './GeneralSurvey';
import Calendar from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState, useEffect } from "react";
import { Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function BarChart({ }) {
    const surveys = ['tyrty', 'ytit', 'y7iii'];
    const patients = ['uiuo', 'yiyi', 'uiuiu'];
    const [patient, setPatient] = useState('');
    const [survey, setSurvey] = useState('');
    const handlePatientChange = (event) => {
        setPatient(event.target.value);
        
    };

    const handleSurveyChange = (event) => {
        setSurvey(event.target.value);
    };
    const getTitleItems = (surveys) => {
        return surveys.map(survey => <MenuItem value={survey}>{survey}</MenuItem>)
    }

    const getPatientItems = (patients) => {
        return patients.map(patient => <MenuItem value={patient}>{patient}</MenuItem>)
    }
    return (

        <Stack spacing={5} width={1500} justify="center">
            <Stack direction={'row'} alignItems={'center'} spacing={3} margin={5}>
                <FilterListIcon />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['SingleInputDateRangeField']}>
                        <DateRangePicker
                            slots={{ field: SingleInputDateRangeField }}
                            slotProps={{ textField: { InputProps: { size: 'small', endAdornment: <Calendar /> } } }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Patient</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={patient}
                        label="Patient"
                        onChange={handlePatientChange}
                    >
                        {getPatientItems(patients)}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Survey</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={survey}
                        label="Survey"
                        onChange={handleSurveyChange}
                    >
                        {getTitleItems(surveys)}
                    </Select>
                </FormControl>
            </Stack>
        </Stack>

    )
}

export default BarChart;