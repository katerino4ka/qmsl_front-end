import React from 'react'
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { Divider, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditFormDialog from './EditFormDialog';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import PollPatients from './PollPatients';


function GeneralSurvey({ handleEdit, survey, handleDelete }) {

    const navigate = useNavigate();

    const [editOpen, setEditOpen] = React.useState(false);

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const [assignMenu, setAssignMenu] = React.useState(false);
    const handleClick = (event) => {
        setAssignMenu(true);
    };
    const handleClose = () => {
        setAssignMenu(false);
    };

    return (
        <>
            <Card  >
                <CardContent>
                    <CardHeader
                        action={
                            <div>
                                <IconButton aria-label="edit" onClick={handleEditClickOpen}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => handleDelete(survey.id)}>
                                    <DeleteIcon />
                                </IconButton>

                            </div>

                        }
                        title={survey.name}
                        titleTypographyProps={{variant:'h5' }}
                    />
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container>
                        <Grid item><Button variant="contained" sx={{ color: "white", marginLeft: 2 }} onClick={() => navigate('../results')}>Результати</Button></Grid>
                        <Grid item xs>
                            <Grid container direction="row-reverse">
                                <IconButton 
                                    onClick={handleClick}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                {assignMenu&&<PollPatients open = {assignMenu} survey = {survey} handleClose={handleClose}></PollPatients>}
                </CardContent>
            </Card>
            <EditFormDialog open={editOpen} handleClose={handleEditClose} index={survey.id} handleEdit={handleEdit} />
            <Outlet />
        </>
    )

}

export default GeneralSurvey;