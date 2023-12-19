import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import ResultFormDialog from './ResultFormDialog';
import { Divider, Stack, Typography, IconButton, Grid } from '@mui/material';
import DateFormatter from '../Components/DateFormatter';

function ResultSurvey({ survey, isDoctor, handleCommentAdd }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
                        <Grid>
                            <Typography variant='h5'>
                                {survey.poll.name}
                            </Typography>
                            {isDoctor && <Typography variant='h6'>
                                {survey.patient.name}
                            </Typography>}
                        </Grid>

                        <IconButton aria-label="more" onClick={handleClickOpen}>
                            <MoreVertIcon />
                        </IconButton>

                    </Stack>
                </CardContent>
                <Divider />
                <CardContent>
                    <Stack direction={'row'} justifyContent="space-between">
                        <Stack direction={'row'}>
                            <IconButton aria-label="share">
                                <ReplyIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <DownloadIcon />
                            </IconButton>

                        </Stack>
                        <Typography variant='h6'>
                            <DateFormatter date={survey.poll.passedAt} />
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
            {open && <ResultFormDialog open={open} handleClose={handleClose} survey={survey} isDoctor={isDoctor} handleCommentAdd={handleCommentAdd} />}
        </>
    )

}

export default ResultSurvey;