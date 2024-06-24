import '../../styles/patients.css';
import {useState} from 'react';
function Patients() {
const [isShowed, setIsShowed] = useState(false);
    function handleClick() {
        if(isShowed) setIsShowed(false)
        else setIsShowed(true);
    }

    return (
        <>
            <div className="patientsPrincipal">
                <div className="patientsAside">
                    <div className="doctorData">
                        <span className="doctorTitle">Doutor:</span>
                        <h1 className="doctorName">Calado Samuel</h1>
                    </div>
                    <div className={`${isShowed? 'showUp' : 'patientsNotifications'}`}>
                        <h1 className='doctorNotifications'>Notificações <button onClick={handleClick} type='button' className='toggleButton'>&#128285;</button></h1>
                        <div className='notificationsContent'>Exemplo de notificação</div>
                    </div>
                </div>
                <div className="monitoredPatients">
                    <table className="patientsTable">
                        <caption className="patientsTable-caption">Pacientes monitorados</caption>
                        <thead>
                            <tr>
                                <th>
                                    Nome do Paciente
                                </th>
                                <th>
                                    Heart rate
                                </th>
                                <th>
                                    Oxygenation
                                </th>
                                <th>
                                    Temperature
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Andrade Pacheco
                                </td>
                                <td>
                                    63 <span className='patientsMeasure'>BPM</span>
                                </td>
                                <td>
                                    99<span className='patientsMeasure'>%</span>
                                </td>
                                <td>
                                    30<span className='patientsMeasure'>º</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Andrade Pacheco
                                </td>
                                <td>
                                    63 <span className='patientsMeasure'>BPM</span>
                                </td>
                                <td>
                                    99<span className='patientsMeasure'>%</span>
                                </td>
                                <td>
                                    30<span className='patientsMeasure'>º</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Andrade Pacheco
                                </td>
                                <td>
                                    63 <span className='patientsMeasure'>BPM</span>
                                </td>
                                <td>
                                    99<span className='patientsMeasure'>%</span>
                                </td>
                                <td>
                                    30<span className='patientsMeasure'>º</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Andrade Pacheco
                                </td>
                                <td>
                                    63 <span className='patientsMeasure'>BPM</span>
                                </td>
                                <td>
                                    99<span className='patientsMeasure'>%</span>
                                </td>
                                <td>
                                    30<span className='patientsMeasure'>º</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Patients;