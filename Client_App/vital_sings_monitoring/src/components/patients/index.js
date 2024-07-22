import '../../styles/patients.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatientsService from '../../services/patient';
import Patient from '../managePatients/patient';
function Patients() {
    const [patients, setPatients] = useState([]);

    const [classe, setClasse] = useState('patientsNotifications');

    /*async function getPatients(){
        const response = await PatientsService.getPatients();
        setPatients(response);
        console.log(response.data);
    }*/

    function handleClick() {
        if (classe === 'patientsNotifications') setClasse('showUp')
        else setClasse('patientsNotifications');
    }

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await PatientsService.getPatients();
                setPatients(response.data);
            } catch (error) {
                // Trate os erros aqui
            }
        };

        fetchPatients();
    }, []);

    return (
        <>
            <div className="patientsPrincipal">
                <div className="patientsAside">
                    <div className="doctorData">
                        <span className="doctorTitle">{JSON.parse(localStorage.getItem('user')).privilege}:</span>
                        <h1 className="doctorName">{JSON.parse(localStorage.getItem('user')).name}</h1>
                        <p></p>
                    </div>
                    <div className={classe}>
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
                            {
                                patients.map((patient, pos) => {
                                    return (
                                        <tr key={patient._id}>
                                            <td className='tableName'>
                                                [{pos + 1}] <Link to={`/vitals/${patient._id}`}>{patient.name} &#128065;</Link>
                                            </td>
                                            <Patient key={patient._id} patientId={patient._id}/>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <button type='button' className='patientsButton'><Link to={'/patients/manage'}>Gerir Pacientes</Link></button>
                </div>
            </div>
        </>
    )
}

export default Patients;