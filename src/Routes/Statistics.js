import React from "react";
import GeneralSurvey from '../Forms/GeneralSurvey'
import StatisticsNavigation from "./StatisticsNavigation";
import { Grid, Typography } from "@mui/material";
import NavigationComponent from "../MenuComponents/NavigationComponent";

function Statistics() {
  return (
    <>
    <Grid container
    direction="column"
    alignItems="center"
    justifyContent="center">
    <Grid >
    <Typography variant="h2" gutterBottom>
        Статистика
      </Typography>
      <StatisticsNavigation/>
    </Grid>
    </Grid>
    </>
  );
}

export default Statistics;