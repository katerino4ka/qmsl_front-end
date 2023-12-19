import React from 'react';
import { Grid, TextField, Button, Paper, FormGroup, Stack, Typography, Box } from '@mui/material'
import { useContext } from 'react';
import { UserContext } from '../Routes/App';

function PersonalTab() {
    const { user, userData } = React.useContext(UserContext);;
    return (
        <Grid container spacing={5} sx={{ marginTop: '2%' }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4} >
                <Paper sx={{ height: "100%", textAlign: 'center' }}>
                    <Box
                        component="img"
                        marginTop={'15%'}
                        sx={{
                            height: '12rem',
                            width: '12rem',
                            borderRadius: '50%',
                            marginBottom: '5%'
                        }}
                        src="https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623643_58jOINqUIeYmkrH7go1smPaiYujiyqit.jpg"
                    />
                    <br />
                    <Button>Змінити</Button>
                </Paper>
            </Grid>
            <Grid item xs={4} sm={4} md={6}>
                <Paper item xs={8} sx={{ padding: 5 }} >
                    <FormGroup >
                        <Typography variant='h6'> Ім'я</Typography>
                        <TextField value={userData.name} />
                        <Typography variant='h6'> Прізвище</Typography>
                        <TextField value={userData.surname} />
                        <Typography variant='h6'> Ел. пошта</Typography>
                        <TextField value={userData.email} />
                        <Typography variant='h6'> Номер телефону</Typography>
                        <TextField value={userData.phoneNumber} />
                        {user.type == "Patient" && <><Typography variant='h6'> Дігноз</Typography>
                            <TextField value={userData.disease} /></>}
                    </FormGroup>
                </Paper></Grid>



        </Grid>
    )
}
export default PersonalTab;