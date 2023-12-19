import { Typography } from '@mui/material';
import React from 'react';
import PatientSurveysTab from '../Tabs/PatientSurveysTab';
import { UserContext } from '../Routes/App';

function PatientSurveysPage() {
    const [generalSurveys, setGeneralSurveys] = React.useState([]);
    const fetchPolls = () => {
        fetch(`https://localhost:7233/api/PollController_CreateEditDel/GetAvailablePatientsPoll?patientId=${user.id}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setGeneralSurveys(data);
                console.log(data)
            })
            .catch((error) => console.log(error));
    }
    const { user } = React.useContext(UserContext);
    React.useEffect(() => {
        fetchPolls();
    }, [user]);

    return (
        <>
            <PatientSurveysTab surveys={generalSurveys} setSurveys = {setGeneralSurveys}/>

        </>
    )
}
export default PatientSurveysPage;