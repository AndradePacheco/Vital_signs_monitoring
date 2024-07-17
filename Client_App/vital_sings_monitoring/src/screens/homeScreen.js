import Header from '../components/header';
import { Link, Navigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import '../styles/homeScreen.css';
import login from '../assets/images/login.png';
import register from '../assets/images/register.png';
import { useEffect, useState } from 'react';

function HomeScreen() {
    const [navigateToVitals, setNavigateToVitals] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')) setNavigateToVitals(true);
    }, [])
    if(navigateToVitals){
        if(localStorage.getItem('privilege') === 'Patient') return <Navigate replace to={{pathname: `${JSON.parse(localStorage.getItem('user'))._id}`}}/>
        return <Navigate replace to={{pathname: '/patients'}}/>
    } 
    return (
        <>
            <Header />
            <div className='home-container'>
                <div className='home-inside-container description'>
                    <h1 className='home-title'>Monitore os Sinais Vitais</h1>
                    <span className='home-text'>
                    Bem-vindo ao Sistema de Monitoramento de Sinais Vitais! Nossa plataforma conecta médicos e pacientes em tempo real, permitindo que os profissionais de saúde acessem os dados vitais dos pacientes de forma segura e eficiente. Com nosso sistema, o profissional de saúde garante um cuidado personalizado e ágil. Conecte-se agora e comece a acompanhar os sinais vitais com facilidade.
                    </span>
                    <div className='buttons'>
                        <button className='button sign-in'>
                            <span><Image className='icon' src={login} /></span>
                            <Link to="/login"><span className='icon-text'>Entrar</span></Link>
                        </button>
                        <button className='button sign-up'>
                            <span><Image className='icon' src={register} /></span>
                            <Link to="doctorRegister"><span className='icon-text'>Sign Up</span></Link>
                        </button>
                    </div>
                </div>
                <div className='home-inside-container empty'>
                </div>
            </div>
        </>
    );
}

export default HomeScreen;