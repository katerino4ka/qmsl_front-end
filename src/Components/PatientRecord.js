import React from "react";
import { Card, CardContent, Stack, Typography, Avatar, Divider, Button, Grid, CardActions } from "@mui/material"
function PatientRecord({ patient, handleUnassign }) {
    return (<>
        <Card sx={{ minWidth: '60%', minHeight: '10%' }}>
            <CardContent>
                <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
                    <Typography variant="h5">
                        {`${patient.name} ${patient.surname}`}
                    </Typography>
                    <Typography variant="h6">
                        {patient.email}
                    </Typography>

                </Stack>
                <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}> {<Typography variant="h6">{`Діагноз: ${patient.disease} `}</Typography>}</Grid>
                        <Grid item xs={12} md={12}>  {<Typography variant="h6">{`Вік: ${patient.age}`}</Typography>}</Grid>
                    </Grid>
                    <Button onClick={() => handleUnassign(patient.id)} sx={{ marginLeft: "auto" }}>Від'єднати</Button>
                </Stack>

            </CardContent>
        </Card>
    </>)
}
export default PatientRecord;