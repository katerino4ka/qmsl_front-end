import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Stack, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { UserContext } from '../Routes/App'
import QuestionEditing from './QuestionEditing';

export default function EditFormDialog({ open, handleClose, index, handleEdit }) {
    const { user } = React.useContext(UserContext);
    const [question, setQuestion] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [survey, setSurvey] = React.useState({});
    const handleOnClick = () => {

        const addedQuestions = [...question, []];
        setQuestion(addedQuestions);
        console.log(question)
    }
    const handleInputChange = (e, i) => {
        const questions = [...question];
        const generalAnswers = questions[i].generalAnswers?.length>0? questions[i].generalAnswers : [];
        questions[i] =  {name: e.target.value, generalAnswers: generalAnswers };
        const editedQuestions = survey.questions;
        // if(i => editedQuestions.length)
        //     editedQuestions.push({name: ''});
        console.log(editedQuestions)
        editedQuestions[i].name = e.target.value;
        survey.questions = editedQuestions;
        setSurvey(survey);
        setQuestion(questions);

    }

    const handleOptionChange = (options, i) =>{
        const questions = [...question];
        questions[i].generalAnswers = options;
        survey.questions = questions;
        console.log(survey);
        setSurvey(survey);

    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        const editedSurvey = survey;
        editedSurvey.name = e.target.value;
        setSurvey(editedSurvey);
    }

    const handleDelete = (i) => {
        const questions = [...question];
        questions.splice(i, 1);
        setQuestion(questions);
    }
    React.useEffect(() => {
        fetch(`https://localhost:7233/api/PollController_CreateEditDel/GetPollById?pollId=${index}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setSurvey(data[0]);
                setTitle(data[0].name);
                setQuestion(data[0].questions)

            })
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        if (question.length > 0) {
            console.log(question)
            const newSurvey = survey;
            newSurvey.questions = question;
            setSurvey(newSurvey)
        }

    }, [question]);


    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'lg'}>
                <DialogTitle variant='h5' sx={{ marginTop: '2%' }}>Відредагувати опитування</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        sx={{ marginBottom: '2%', marginTop: '2%' }}
                        id="name"
                        label="Назва"
                        fullWidth
                        variant="standard"
                        value={title}
                        inputProps={{ style: { fontSize: '1.75rem' } }}
                        InputLabelProps={{ style: { fontSize: '1.25rem' } }}
                        onChange={(e) => handleTitleChange(e)}
                    />
                    <Stack spacing={2}>
                        <Stack direction={'row'} alignContent={'center'} alignItems={'center'}> <Typography variant='h6' fullWidth>Питання</Typography>
                            <IconButton>
                                <AddBoxIcon onClick={() => handleOnClick()}></AddBoxIcon>
                            </IconButton></Stack>
                        {
                            question.map((data, index) => {
                                return (

                                    <QuestionEditing index={index} handleInputChange={handleInputChange} handleDelete={handleDelete} setQuestion={setQuestion} questions={question} handleOptionSetChange = {handleOptionChange} />
                                )
                            })
                        }
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Відмінити</Button>
                    <Button variant="contained" onClick={() => { handleEdit(survey); handleClose() }}>Підтвердити</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}