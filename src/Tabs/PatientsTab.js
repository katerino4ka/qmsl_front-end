import React from "react";
import { Grid, Button, Autocomplete, TextField, Stack } from '@mui/material';
import PatientRecord from "../Components/PatientRecord";
import { UserContext } from '../Routes/App';
function PatientsTab() {
    const { user } = React.useContext(UserContext);;
    const [patients, setPatients] = React.useState([]);
    const [chosenPatient, setChosenPatient] = React.useState();
    const [assignedPatients, setAssignedPatients] = React.useState([]);
    const fetchAssignedPatients = () => {
        fetch(`https://localhost:7233/api/User/GetDoctorPatients?doctorId=${user.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setAssignedPatients(data.flat());
            })
            .catch((error) => console.log(error));
    };

    const fetchdPatients = () => {
        fetch("https://localhost:7233/api/User/GetAllPatients", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setPatients(data);
            })
            .catch((error) => console.log(error));
    };
    React.useEffect(() => {
        fetchAssignedPatients();
        fetchdPatients();

    }, [user]);

    const handleAdd = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:7233/api/PollController_AssUnassCommPass/Assign Patient?patientId=${chosenPatient.id}&doctorId=${user.id}`, requestOptions)
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
    const handleUnassign = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:7233/api/PollController_AssUnassCommPass/Unassign Patient?patientId=${id}&doctorId=${user.id}`, requestOptions)
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

    return (
        <Grid>
            <Grid container marginTop={'2%'}>
                <Grid item xs={12} md = {3}>
                    <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        options={patients.filter(x=>!assignedPatients.map(y=>y.id).includes(x.id))}
                        getOptionLabel={(option) => `${option.name} ${option.surname}`}
                        value={chosenPatient}
                        onChange={(event, newValue) => {
                            setChosenPatient(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Пацієнт" />}
                    />

                </Grid>
                <Grid item xs={6} md={2} >
                    <Button fullWidth variant="contained" onClick={handleAdd}>Додати</Button>
                </Grid>

            </Grid>
            <Stack sx={{marginTop:'2%'}} spacing ={"2%"}>
                {
                    assignedPatients.map(p => {
                        return <PatientRecord patient={p} handleUnassign={handleUnassign} />
                    })
                }

            </Stack>
        </Grid>

    )
}
export default PatientsTab;