import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/auth/login';
import RegisterScreen from './screens/auth/register';
import VitalSignsScreen from './screens/vitalSignsScreen';

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={HomeScreen}/>
                <Route exact path='/login' Component={LoginScreen}/>
                <Route exact path='/register' Component={RegisterScreen}/>
                <Route exact path='/vitals' Component={VitalSignsScreen}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
