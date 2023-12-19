import React from 'react'
import ResultSurvey from '../Forms/ResultSurvey';
import Calendar from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack, Select, MenuItem, FormControl, InputLabel, Grid, IconButton } from '@mui/material';
import { useState, useEffect } from "react";
import { UserContext } from '../Routes/App';


function ResultsTab() {

    const [surveys, setSurveys] = useState();
    const [patient, setPatient] = useState('');
    const [survey, setSurvey] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);

    const [filteredArr, setFilteredArr] = useState(surveys);
    const handlePatientChange = (event) => {
        setPatient(event.target.value);
        setSurvey('');

    };
    const resetFiltering = () => {
        setSurvey('');
        setPatient('');
        setFilteredArr(surveys);
    }
    const filtering = (parameter, filteredValue) => {
        const filteredArr = parameter == 'patient'? surveys.filter(survey => survey[parameter].name == filteredValue):
        surveys.filter(survey => survey.poll[parameter] == filteredValue);
        setFilteredArr(filteredArr);

    }
    function removeDuplicates(arr) {
        return arr?.filter((item,
            index) => arr.indexOf(item) === index);
    }
    useEffect(() => {
        if (patient !== '') { filtering('patient', patient) }

    }, [patient]);

    useEffect(() => {
        if (survey !== '') { filtering('name', survey) }

    }, [survey]);

    useEffect(() => {
       setFilteredArr(surveys);

    }, [surveys]);
    const { user } = React.useContext(UserContext);
    const handleSurveyChange = (event) => {

        setSurvey(event.target.value);
        setPatient('');
    };

    const renderListOfSurveys = (surveys) => {
        return surveys?.map(survey => <ResultSurvey survey={survey} isDoctor={isDoctor} handleCommentAdd={handleCommentAdd} />)
    }
    const getTitleItems = (surveys) => {
        const arr = removeDuplicates(surveys?.map(x => `${x.poll.name}`));
        return arr?.map(survey => <MenuItem value={survey}>{survey}</MenuItem>)
    }

    const getPatientItems = (surveys) => {
        const arr = removeDuplicates(surveys?.map(x => `${x.patient.name}`));
        return arr?.map(survey => <MenuItem value={survey}>{survey}</MenuItem>)
    }


    const handleCommentAdd = (id, comment) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "doctorId": user.id,
                "text": comment
            })
        };
        fetch(`https://localhost:7233/api/PollController_AssUnassCommPass/Comment Poll?pollId=${id}`, requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {
                    fetchDoctorResults();
                    return response.json();
                }

            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    }

    const fetchDoctorResults = () => {
        fetch(`https://localhost:7233/api/PollController_CreateEditDel/GetPassedDoctorPoll?doctorId=${user.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setSurveys(data);
            })
            .catch((error) => console.log(error));
    };

    const fetchPatientResults = () => {
        fetch(`https://localhost:7233/api/PollController_CreateEditDel/GetPassedPatientsPoll?patientId=${user.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setSurveys(data);
            })
            .catch((error) => console.log(error));
    };
    React.useEffect(() => {
        if (user.type !== undefined) {
            setIsDoctor(user.type != 'Patient');
            user.type == 'Patient' ? fetchPatientResults() : fetchDoctorResults();
        }

    }, [user]);

    return (
        <>
            <Grid container alignContent={'center'} alignItems={'center'} spacing={3} sx={{ marginTop: '1%', marginBottom: '2%' }}>
                <Grid item>
                    <IconButton onClick={resetFiltering}>
                        <FilterListIcon />
                    </IconButton>

                </Grid>
                <Grid item >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['SingleInputDateRangeField']}>
                            <DateRangePicker
                                slots={{ field: SingleInputDateRangeField }}
                                slotProps={{ textField: { InputProps: { size: 'small', endAdornment: <Calendar /> } } }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                {user.type == 'Doctor' && <Grid item xs={8} sm={4} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Пацієнт</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={patient}
                            label="Пацієнт"
                            onChange={handlePatientChange}
                        >
                            {getPatientItems(surveys)}
                        </Select>
                    </FormControl>
                </Grid>}
                <Grid item xs={8} sm={4} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Опитування</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={survey}
                            label="Опитування"
                            onChange={handleSurveyChange}
                        >
                            {getTitleItems(surveys)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Stack spacing={5} justify="center">
                {renderListOfSurveys(filteredArr)}
            </Stack>
        </>


    )
}

export default ResultsTab;