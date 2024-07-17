import heart from '../../assets/images/heart-rate2.png';
import temperature from '../../assets/images/temperature2.png';
import oxygenation from '../../assets/images/oxygenation.png';
import { Image } from 'react-bootstrap';
import '../../styles/vitals.css';
import socket from '../socket/socket';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Vitals(){

    const [vitals, setVitals] = useState({});
    const {userId} = useParams();
    
    function fetchVitals(){
        socket.emit('join', userId);
        socket.on('dados', (vitalSigns) => {
            setVitals(vitalSigns)
        });
        console.log(vitals);
    }

    useEffect(() => {
        fetchVitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vitals]);

    return(

        <>

            <div className="vitalsPrincipal">
                <div className="vitalsContainer">
                    <div className="vitalContainer">
                        <span className="vital">
                            <Image className='vitalImage' src={heart}/>
                            <span className="vitalText">Heart Rate</span>
                        </span>
                        <span className="measure">
                            65 {vitals['heart-rate']}BPM
                        </span>
                        <span className="state">
                            Normal
                        </span>
                    </div>
                    <div className="vitalContainer">
                        <span className="vital">
                            <Image className='vitalImage' src={oxygenation}/>
                            <span className="vitalText">Oxygenation</span>
                        </span>
                        <span className="measure">
                            92{vitals.oxygenation}%
                        </span>
                        <span className="state">
                            Normal
                        </span>
                    </div>
                    <div className="vitalContainer">
                        <span className="vital">
                            <Image className='vitalImage' src={temperature}/>
                            <span className="vitalText">Temperature</span>
                        </span>
                        <span className="measure">
                            30{vitals.temperature}º
                        </span>
                        <span className="state">Normal</span>
                    </div>
                </div>
                <div className='secondaryContainer'>
                    <div className='vitalsProfile'>
                        <span className='vitalsProfilePrivilege'>Paciente:</span>
                        <span className='vitalsProfileName'>Andrade Pacheco</span>
                        <span className='vitalsProfileAge'>30 anos</span>
                        <span className='vitalsProfileSex'>Masculino</span>
                    </div>
                    <div className='vitalsHistoric'>
                        <table className='vitalsHistoricTable'>
                            <caption>Previows reads</caption>
                            <thead>
                                <tr>
                                    <th>Heart Rate</th>
                                    <th>Oxygenation</th>
                                    <th>Temperature</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>62</td>
                                    <td>88</td>
                                    <td>30</td>
                                    <td>{Date.now()}</td>
                                </tr>
                                <tr>
                                    <td>62</td>
                                    <td>88</td>
                                    <td>30</td>
                                    <td>{Date.now()}</td>
                                </tr>
                                <tr>
                                    <td>62</td>
                                    <td>88</td>
                                    <td>30</td>
                                    <td>{Date.now()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vitals;