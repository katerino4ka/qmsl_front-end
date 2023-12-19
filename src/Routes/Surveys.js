import React from "react";
import GeneralSurvey from '../Forms/GeneralSurvey'
import SurveysNavigation from "./SurveysNavigation";
import { Grid, Typography } from "@mui/material";
import NavigationComponent from "../MenuComponents/NavigationComponent";


function Surveys() {
  
  return (
    <>
    <Grid container
    direction="column"
    alignItems="center"
    justifyContent="center">
    <Grid fullWidth={true}
    width={'80%'}>
    <Typography variant="h2" gutterBottom>
        Опитування
      </Typography>
      <SurveysNavigation/>
    </Grid>
    </Grid>
    </>
  );
}

export default Surveys;