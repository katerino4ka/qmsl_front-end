import React from 'react';
import { UserContext } from '../Routes/App';
import { Grid, Stack } from '@mui/material';
import DoctorRecord from '../Components/DoctorRecord';

function DoctorsTab() {
    const { user } = React.useContext(UserContext);;
    const [doctors, setDoctors] = React.useState([]);
    const fetchAssignedDoctors = () => {
        fetch(`https://localhost:7233/api/User/GetPatientDoctors?patientId=${user.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.flat())
                setDoctors(data.flat());
            })
            .catch((error) => console.log(error));
    };
    React.useEffect(() => {
        fetchAssignedDoctors();

    }, [user]);

    return (
        <Grid>      <Stack sx={{ marginTop: '2%' }} spacing={"2%"}>
            {
                doctors.map(d => {
                    return <DoctorRecord doctor={d} />
                })
            }

        </Stack></Grid>
    )

}
export default DoctorsTab;