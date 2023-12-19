import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Stack, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import QuestionCreation from './QuestionCreation';
import { UserContext } from '../Routes/App'

export default function FormDialog({ open, handleClose, handleSubmit }) {
    const { userData } = React.useContext(UserContext);
    const [question, setQuestion] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const handleOnClick = () => {
        const addedQuestions = [...question, []];
        setQuestion(addedQuestions);
    }

    const handleInputChange = (e, i) => {
        const questions = [...question];
        questions[i] = { name: e.target.value, answers: [] };
        setQuestion(questions);

    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDelete = (i) => {
        const questions = [...question];
        questions.splice(i, 1);
        setQuestion(questions);
    }

 
    React.useEffect(() => {
        if (!open) { setQuestion([]) }

    }, [open]);

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'lg'}>
                <DialogTitle variant='h5' sx={{marginTop:'2%'}}>Створити нове опитування</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        autoFocus
                        sx={{marginBottom:'2%', marginTop:'2%'}}
                        id="name"
                        label="Назва"
                        fullWidth
                        variant="standard"
                        value={title}
                        inputProps={{style: {fontSize: '1.75rem'}}} 
                        InputLabelProps={{style: {fontSize: '1.25rem'}}}
                        onChange={(e) => handleTitleChange(e)}
                    />
                    <Stack spacing={2}>
                        <Stack direction={'row'} alignContent={'center'} alignItems={'center'} spacing={'auto'}> <Typography variant='h6' fullWidth>Питання</Typography>
                            <IconButton>
                                <AddBoxIcon onClick={() => handleOnClick()}></AddBoxIcon>
                            </IconButton></Stack>
                        {
                            question.map((data, index) => {
                                return (
                                    <QuestionCreation index={index} handleInputChange={handleInputChange} handleDelete={handleDelete} setQuestion={setQuestion} questions={question} />
                                )
                            })
                        }
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Відмінити</Button>
                    <Button variant="contained" onClick={() => handleSubmit({
                        name: title,
                        doctorEmail: userData.email,
                        questions: question
                    })}>Підтвердити</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}