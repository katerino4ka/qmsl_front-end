import React from 'react';
import { TextField, Stack, IconButton } from "@mui/material";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import AddBoxIcon from '@mui/icons-material/AddBox'


function QuestionCreation({ index, handleInputChange, handleDelete, setQuestion, questions }) {

    const [options, setOptions] = React.useState([]);
    const handleOnClick = () => {
        const addedOptions = [...options, []];
        setOptions(addedOptions);
    }

    const handleOptionDelete = (i) => {
        const option = [...options];
        option.splice(i, 1);
        setOptions(option);
    }

    const handleOptionChange = (e, i) => {
        const newOptions = [...options];
        newOptions[i] = { ...newOptions[i], text: e.target.value };
        setOptions(newOptions);
        const newuqestions = [...questions];
        newuqestions[index] = { ...questions[index], answers: options };
        setQuestion(newuqestions);

    }
    return (
        <Stack>
            <Stack direction={'row'} f>
                <TextField label={`Питання ${index + 1}`} value={questions[index].name} fullWidth multiline onChange={(e) => handleInputChange(e, index)} sx={{marginBottom:'2%'}}/>
                <IconButton>
                    <AddBoxIcon onClick={() => handleOnClick()}></AddBoxIcon>
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                    <IndeterminateCheckBoxIcon />
                </IconButton>
            </Stack>
            {
                options?.map((data, index) => {
                    return (
                        <Stack direction={'row'}>
                            <TextField fullWidth size='small' sx={{ marginLeft: '5%', marginBottom: '1%' }} value= {options[index].text} label={`Варіант ${index + 1}`} onChange={(e) => handleOptionChange(e, index)} />
                            <IconButton onClick={() => handleOptionDelete(index)}>
                                <IndeterminateCheckBoxIcon />
                            </IconButton>
                        </Stack>

                    )
                })
            }
        </Stack>


    )
}
export default QuestionCreation;