import React from "react";
import { Grid, Typography } from "@mui/material";
import ProfileNavigation from "./ProfileNavigation";
import PatientProfileNavigation from "./PatientProfileNavigation";
import { UserContext } from "./App";


function Profile() {
  const {user} = React.useContext(UserContext);
  return (
    <>
    <Grid container
    direction="column"
    alignItems="center"
    justifyContent="center"

    >
    <Grid   fullWidth={true}
    width={'80%'}>
    <Typography variant="h2" gutterBottom>
        Кабінет користувача
      </Typography>
      {user?.type == 'Patient'?<PatientProfileNavigation/>:<ProfileNavigation/>}
    </Grid>
    </Grid>
    </>
  );
}

export default Profile;