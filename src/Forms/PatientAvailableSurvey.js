import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Divider, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PatientEditFormDialog from './PatientEditFormDialog';
import { UserContext } from '../Routes/App';
function PatientAvailableSurvey({ survey, setSurveys }) {
    const [open, setOpen] = React.useState(false);
    const {user} = React.useContext(UserContext);
    const handleOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSurveyPass = () => {
       const body =  survey.questions.map(q => {
                return 0}
            )
        
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        fetch(`https://localhost:7233/api/PollController_AssUnassCommPass/Pass Poll?pollId=${survey.id}`, requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {
                    return response.json();
                }

            })
            .catch((error) => {
                console.log('error: ' + error);
            });
        };

    return (<>
        <Card  >
            <CardContent>
                <CardHeader
                    action={
                        <div>
                            <IconButton aria-label="edit" onClick={handleOpen} >
                                <Button variant='contained'>Пройти</Button>

                            </IconButton>
                        </div>
                    }
                    title={survey.name}
                    titleTypographyProps={{ variant: 'h4' }}
                />
            </CardContent>
            {open && <PatientEditFormDialog open={open} handleClose={handleClose} survey={survey} handleSurveyPass={handleSurveyPass} />}
            <Divider />
        </Card>
    </>)

}               
export default PatientAvailableSurvey;