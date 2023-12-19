import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Question from './Question';
import Comment from '../Components/Comment';
import { Stack, InputLabel, Typography, Grid } from '@mui/material';

export default function ResultFormDialog({ open, handleClose, survey, isDoctor, handleCommentAdd }) {
    const renderListOfQuestions = () => {
        return survey.poll.questions.map(question => <Question question={question} />)
    }
    const renderComments = () => {
        return survey.poll.comments.map(comment => <Comment comment={comment} />)
    }
    const[comment, setComment] = React.useState('');

    const handleCommentChange= (e) =>{
            setComment(e.target.value);
    }
    return (
        <React.Fragment>
            <Dialog fullWidth={true}
                maxWidth={'lg'} open={open} onClose={handleClose} scroll='paper' >
                <Stack sx={{ margin: '2%', marginTop: '3%' }}>
                    <Typography variant='h4'>Результати {survey.poll.name} від {survey.patient.name}</Typography>
                    {/* <Typography >
                        Completed at {survey.completionDate}
                    </Typography> */}
                </Stack>


                <DialogContent>

                    <Stack>
                        {renderListOfQuestions()}
                    </Stack>
                    {survey.poll.comments.length>0 && <Typography sx={{ marginTop: '2%' }} variant='h5'>
                        Коментарі:
                    </Typography>}
                    {renderComments()}
                    {isDoctor && <Grid> <Typography sx={{ marginTop: '2%' }} variant='h5'>
                        Додати коментар:
                    </Typography>
                        <TextField fullWidth multiline onChange={(e)=>handleCommentChange(e)} /></Grid>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Відмінити</Button>
                {isDoctor &&<Button variant="contained" sx={{ color: "white", marginLeft: 2 }} onClick={()=>{handleCommentAdd(survey.poll.id, comment); handleClose()}}>Підтвердити</Button>}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}