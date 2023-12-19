import React from 'react'
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, Typography } from '@mui/material';
import { render } from '@testing-library/react';
import { ContentCutOutlined } from '@mui/icons-material';

function Question({ question, isDisabled = true, setOptions }) {

  const [checkedOption, setCheckedOption] = React.useState('');
  const handleChange = (e, i)=>{
      
  }

  const renderOptions = (options) => {
    return options.map((option, index) => {
      return isDisabled ? (
        <FormControlLabel
          key={index}
          value={option.text}
          control={
            <Radio
            onChange={(e, i)=>handleChange(e, i)}
              disabled={isDisabled}
              checked={index === question.choosenAnswer}
            />
          }
          label={option.text}
        />
      ) : (<FormControlLabel
        key={index}
        value={option.text}
        control={
          <Radio
          />
        }
        label={option.text}
      />)
    });
  }

  return (
    <FormControl>
      <Typography variant='h6' >{question.name}</Typography>
      <RadioGroup value={question.answer}>
        {renderOptions(question.editableAnswers)}
      </RadioGroup>
    </FormControl>
  )
}

export default Question;