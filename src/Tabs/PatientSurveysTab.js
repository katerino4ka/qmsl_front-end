import React from 'react'
import GeneralSurvey from '../Forms/GeneralSurvey';
import { Stack, Grid } from '@mui/material';
import PatientAvailableSurvey from '../Forms/PatientAvailableSurvey';
function PatientSurveysTab({ surveys,  setSurveys}) {

    const renderListOfSurveys = (surveys) => {
        if (Array.isArray(surveys)) {
            return surveys?.map(survey => <PatientAvailableSurvey survey={survey.poll} setSurveys = {setSurveys}/>)
        }
    }

    return (

        <Stack spacing={'2%'} marginTop={'2%'}>
            {renderListOfSurveys(surveys)}
        </Stack>

    )
}

export default PatientSurveysTab;