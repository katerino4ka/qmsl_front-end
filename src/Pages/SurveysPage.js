import React from 'react'
import SurveysTab from '../Tabs/SurveysTab';
import Stack from '@mui/material/Stack'
import { Button, Grid } from '@mui/material';
import CreateFormDialog from '../Forms/CreateFormDialog'
import { UserContext } from '../Routes/App'

function SurveysPage() {
    const [generalSurveys, setGeneralSurveys] = React.useState([]);
    const [createOpen, setCreateOpen] = React.useState(false);
    const fetchPolls = () => {
        fetch(`https://localhost:7233/api/PollController_CreateEditDel/GetDoctorPolls?doctorId=${user.id}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setGeneralSurveys(data);
                console.log(data)
            })
            .catch((error) => console.log(error));
    }
    const { user } = React.useContext(UserContext);
    React.useEffect(() => {
        fetchPolls();
    }, [user]);

    React.useEffect(() => {
        fetchPolls();
    }, [createOpen]);


    const handleClickOpen = () => {
        setCreateOpen(true);
    };

    const handleClose = () => {
        setCreateOpen(false);
    };
    const handleDelete = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:7233/api/PollController_CreateEditDel/DeletePoll?pollId=${id}`, requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {
                    fetchPolls();
                }

            })
            .catch((error) => {
                console.log('error: ' + error);
            });

    }
    const handleEdit = (survey) => {
        console.log(survey)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(survey)
        };
        fetch('https://localhost:7233/api/PollController_CreateEditDel/EditPoll', requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {fetchPolls();  }
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    }
    const handleSubmit = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('https://localhost:7233/api/PollController_CreateEditDel/CreatePoll', requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {fetchPolls();  }
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
        handleClose();
    }

    return (
        <>
            <Stack direction="row" justifyContent="end" >
                <Button variant="contained" color="success" sx={{ marginBottom: 5, marginTop: 5, width: '10rem' }} onClick={handleClickOpen}>Створити</Button>
            </Stack>

            <CreateFormDialog open={createOpen} handleClose={handleClose} fetchPolls={fetchPolls} handleSubmit={handleSubmit}></CreateFormDialog>

            <SurveysTab handleEdit={handleEdit} surveys={generalSurveys} handleDelete={handleDelete} />

        </>
    )



}
export default SurveysPage;