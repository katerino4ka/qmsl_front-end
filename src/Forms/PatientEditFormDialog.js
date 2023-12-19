import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Question from './Question';
import { Stack, InputLabel, Typography } from '@mui/material';

export default function PatientEditFormDialog({ open, handleClose, survey, handleSurveyPass }) {
    const [choosenOptions, setChoosenOptions] = React.useState([]);
    const renderListOfQuestions = () => {
        return survey.questions.map((question, index) => <Question question={question} isDisabled={false} setOptions = {setChoosenOptions} options = {choosenOptions}/>)
    }
    return (
        <React.Fragment>
            <Dialog fullWidth={true} 
                maxWidth={'lg'} open={open} onClose={handleClose} scroll='paper' >
                <Stack sx={{margin:'2%', marginTop:'3%'}}>
                    <Typography variant='h4'>{survey.name}</Typography>
                </Stack>
                <DialogContent>
                    <Stack>
                        {renderListOfQuestions()}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Відмінити</Button>
                    <Button variant="contained" sx={{ color: "white", marginLeft: 2 }} onClick={()=>{handleSurveyPass(); handleClose();}}>Підтвердити</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}