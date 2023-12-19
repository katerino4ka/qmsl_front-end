import React from 'react'
import GeneralSurvey from '../Forms/GeneralSurvey';
import { Stack, Grid } from '@mui/material';
function SurveysTab({ handleEdit, surveys, availablePatients, handleDelete }) {

    const renderListOfSurveys = (surveys) => {
        if (Array.isArray(surveys)) {
            return surveys?.map(survey => <GeneralSurvey handleEdit={handleEdit} survey={survey} availablePatients={availablePatients} handleDelete={handleDelete} />)
        }
    }

    return (

        <Stack spacing={'2%'}>
            {renderListOfSurveys(surveys)}
        </Stack>

    )
}

export default SurveysTab;