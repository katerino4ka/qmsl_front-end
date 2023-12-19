import React from "react";
import { Card, CardContent, Stack, Typography, Box, Grid } from "@mui/material"
function DoctorRecord({ doctor }) {
    return (<>
        <Card sx={{ minWidth: '60%', minHeight: '10%' }}>
            <CardContent>
                <Grid container >
                    <Grid item xs='9' md='11'>
                        <Stack >
                            <Typography variant="h5">
                                {`${doctor.name} ${doctor.surname}`}
                            </Typography>
                            <Typography variant="h6">
                                {doctor.email}
                            </Typography>

                        </Stack>
                    </Grid>
                    <Grid item xs='3' md='1' justifyContent={'end'} >
                        <Box
                            component="img"
                            sx={{
                                height: '4rem',
                                width: '4rem',
                                borderRadius: '50%',
                            }}
                            src="https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623643_58jOINqUIeYmkrH7go1smPaiYujiyqit.jpg"
                        />

                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    </>)
}
export default DoctorRecord;