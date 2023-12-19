
import React, { useState } from "react";
import Surveys from "./Surveys";
import SurveysPage from "../Pages/SurveysPage";
import ResultsTab from "../Tabs/ResultsTab";
import Statistics from "./Statistics";
import BarChart from "../Forms/BarChart";
import PieChart from "../Forms/PieChart";
import TableView from "../Forms/TableView";
import Profile from "./Profile";
import PersonalTab from "../Tabs/PersonalTab";
import PatientsTab from "../Tabs/PatientsTab";
import LoginPage from "../Pages/LoginPage";
import DoctorsTab from '../Tabs/DoctorsTab';

import {
    Navigate,
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
import NavigationComponent from "../MenuComponents/NavigationComponent";
import PatientSurveysPage from "../Pages/PatientSurveysPage";
export const UserContext = React.createContext(null);
function App() {

    const [user, setUser] = React.useState({ });
    const [userData, setUserData] = React.useState({name: "", surname: "", age: "", email: ""});
    React.useEffect(() => { setUser(JSON.parse(localStorage.getItem("USER"))); }, []);
    React.useEffect(() => {
        if (user!==null && user?.type !== '') {
            
            const url = user.type !== 'Patient' ? `https://localhost:7233/api/User/GetDoctorById?doctorId=${user.id}` : `https://localhost:7233/api/User/GetPatientById?patientId=${user.id}`;
            fetch(url, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserData({name: data.name, surname: data.surname, email: data.email, age: data.age, phoneNumber: data.phoneNumber, disease: data.disease});
                    console.log(data)
                })
                .catch((error) => console.log(error));
        }

    }, [user]);

    return (

        <>
            <Router>
                <UserContext.Provider value={{ user: user, setUser: setUser, userData: userData }}>
                    {user?.id !== undefined && <NavigationComponent />}
                    <Routes>
                        <Route path="*" element={<Navigate to="surveys/available" />} />
                        <Route path="surveys" element={<Surveys />}>
                            <Route path="available" element={user?.type == 'Patient'? <PatientSurveysPage/> : <SurveysPage />} />
                            <Route path="results" element={<ResultsTab />} />
                        </Route>
                        <Route path="statistics" element={<Statistics />} >
                            <Route path="barchart" element={<BarChart />} />
                            <Route path="piechart" element={<PieChart />} />
                            <Route path="table" element={<TableView />} />
                        </Route>
                        <Route path="profile" element={<Profile />}>
                            <Route path="personal" element={<PersonalTab />} />
                            <Route path="patients" element={<PatientsTab />} />
                            <Route path="doctors" element={<DoctorsTab />} />
                        </Route>
                        <Route path="login" element={<LoginPage />} />
                    </Routes>
                </UserContext.Provider>
            </Router></>
    )

}

export default App;