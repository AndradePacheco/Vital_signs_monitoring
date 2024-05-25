import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/auth/login';
import PatientRegister from './screens/auth/patientRegister';
import DoctorRegister from './screens/auth/doctorRegister'
import VitalSignsScreen from './screens/vitalSignsScreen';
import privateRoute from './components/forms/private_router';

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={HomeScreen}/>
                <Route exact path='/login' Component={LoginScreen}/>
                <Route exact path='/patientRegister' Component={PatientRegister}/>
                <Route exact path='/doctorRegister' Component={DoctorRegister}/>
                <Route exact path='/vitals' Component={privateRoute}>
                    <Route exact path='/vitals' Component={VitalSignsScreen}/>
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
