import React from 'react';
import { TextField, Stack, IconButton } from "@mui/material";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import AddBoxIcon from '@mui/icons-material/AddBox'


function QuestionEditing({ index, handleInputChange, handleDelete, questions, handleOptionSetChange }) {

    const [options, setOptions] = React.useState(questions[index].generalAnswers);
    const handleOnClick = () => {
        let addedOptions;
        if(options != undefined)
        {
            addedOptions = [...options, []];
        }
        else{
            addedOptions = [[]];
        }
        setOptions(addedOptions);
    }

    const handleOptionDelete = (i) => {
        const option = [...options];
        option.splice(i, 1);
        setOptions(option);
    }

    const handleOptionChange = (e, i) => {
        const newOptions = [...options];
        newOptions[i] = { ...newOptions[i], text: e.target.value, generalQuestionId: questions[index].id };
        setOptions(newOptions);
        const newuqestions = [...questions];
        newuqestions[index] = { ...questions[index], generalAnswers: options };
        handleOptionSetChange(newOptions, index);
        
    }
    return (
        <Stack>
            <Stack direction={'row'} f>
                <TextField label={`Питання ${index + 1}`} multiline value={questions[index].name} fullWidth sx={{marginBottom:'2%'}} onChange={(e) => handleInputChange(e, index)} />
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
export default QuestionEditing;