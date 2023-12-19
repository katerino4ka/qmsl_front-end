import React from 'react';
import { Dialog, Grid, Paper, Typography, Button, Stack, Autocomplete, TextField, DialogActions } from '@mui/material';
import { UserContext } from '../Routes/App';
function PollPatients({ open, survey, handleClose }) {
    const [assignedPatients, setAssignedPatients] = React.useState([]);
    const { user } = React.useContext(UserContext);
    const [patients, setPatients] = React.useState([]);
    const [chosenPatient, setChosenPatient] = React.useState({name:'', surname: ''});
    const renderAssignedPatients = () => {
        return assignedPatients.map(p => 
        <Paper sx={{ margin: '1%', marginTop: '0', border: '1px solid #E3E3E3' }}>
            <Stack sx={{ padding: '2%' }} alignItems={'center'} spacing={'auto'} direction={'row'}>
                <Typography>{p.name} {p.surname}</Typography>
                <Button onClick={()=>handleUnassign(p.email, survey.name)}>Від'єднати</Button>
                </Stack>
                </Paper>)
    }
    const fetchAssignedPatients = () => {
        fetch(`https://localhost:7233/api/PollController_CreateEditDel/GetPollPatients?pollName=${survey.name}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setAssignedPatients(data);
            })
            .catch((error) => console.log(error));
    };

    const fetchdPatients = () => {
        fetch(`https://localhost:7233/api/User/GetDoctorPatients?doctorId=${user.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setPatients(data.flat());
            })
            .catch((error) => console.log(error));
    };

    const handleAdd = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:7233/api/PollController_AssUnassCommPass/Assign Poll to Patient?pollName=${survey.name}&patientEmail=${chosenPatient.email}`, requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {
                    fetchAssignedPatients();
                    return response.json();
                }
                
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    }

    const handleUnassign = (patientEmail) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:7233/api/PollController_AssUnassCommPass/Unassign Poll from Patient?pollName=${survey.name}&patientEmail=${patientEmail}`, requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {
                    fetchAssignedPatients();
                    return response.json();
                }
                
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    }
    React.useEffect(() => {
        fetchAssignedPatients();
        fetchdPatients();

    }, [open]);

    return (
        <Dialog open={open} fullWidth={true}
            maxWidth={'md'}>
            <Grid container sx={{ padding: '2%' }}  >
                <Grid item xs={10}> <Typography sx={{ marginBottom: '4%' }} variant='h4'>Пацієнти, приєднані до {survey.name}</Typography></Grid>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={patients.filter(x=>!assignedPatients.map(y=>y.id).includes(x.id))}
                    sx={{ width: '40%' }}
                    getOptionLabel={(option) => `${option.name} ${option.surname}`}
                    value={chosenPatient}
                    onChange={(event, newValue) => {
                        setChosenPatient(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Пацієнт" />}
                /><Button sx={{ marginLeft: '4%' }} onClick={handleAdd}>Додати</Button>

            </Grid>

            <>
                {renderAssignedPatients()}
            </>
            <DialogActions>
                <Button variant={'contained'} onClick={handleClose} sx={{ margin: '2%' }}>Відмінити</Button>
            </DialogActions>
        </Dialog>
    )
}
export default PollPatients;