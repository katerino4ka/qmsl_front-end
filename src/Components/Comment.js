import React from "react";
import {Grid, TextField, Typography} from '@mui/material'
import DateFormatter from "./DateFormatter";

function Comment({comment}){
return(
    <Grid spacing={2} sx={{marginTop:'2%'}}>
        <Grid item><TextField multiline fullWidth value={comment.text} disabled></TextField></Grid>
        <Grid item sx={{textAlign: "end"}}><Typography><DateFormatter date = {comment.commentedAt}/></Typography></Grid>
        
    </Grid>
)
}
export default Comment;