import heart from '../../assets/images/heart-rate2.png';
import temperature from '../../assets/images/temperature2.png';
import oxygenation from '../../assets/images/oxygenation.png';
import { Image } from 'react-bootstrap';
import '../../styles/vitals.css';
import socket from '../socket/socket';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PatientsService from '../../services/patient';
function Vitals(){
    const [patient, setPatient] = useState({});
    const [vitals, setVitals] = useState({});
    const [historia, setHistoria] = useState([]);
    const [pagesNumber, setPagesNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentHistoria = historia.slice(startIdx, endIdx);

    const nextPage = () => {
        if(currentPage !== pagesNumber - 1) setCurrentPage(currentPage + 1);
    }
    const previowsPage = () => {
        if(currentPage !== 0) setCurrentPage(currentPage - 1);
    }
    const {userId} = useParams();


    async function fetchPatient(){
        try {
            const response = await PatientsService.getPatient(userId);
            const dados = await PatientsService.getVitals(userId);
            const Paciente = response.data;
            const historico = dados.data.vital_signs.vital_signs;
            setPatient(Paciente);
            setHistoria(historico);
           setPagesNumber(Math.ceil(historico.length/5));
            setIsLoading(false)
        } catch (error) {
            
        }
    }
    
    function fetchVitals(){
        socket.emit('join', userId);
        socket.on('dados', (dados) => {
            setVitals(dados)
            console.log(dados);
        });
    }

    function calcularIdade(dataNascimento) {
        const partes = dataNascimento.split('/'); // Divide a data em partes
        const ano = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10);
        const dia = parseInt(partes[2], 10);
    
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth() + 1; // Mês começa em 0 (janeiro = 0)
        const diaAtual = dataAtual.getDay()
    
        let idade = anoAtual - ano;
    
        // Verifica se o aniversário já ocorreu este ano
        if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
            idade--;
        }
    
        return idade;
    }

    function calcularData(data){

        const Data = new Date(data);

        const hora = Data.getUTCHours().toString().padStart(2,0);
        const minutos = Data.getUTCMinutes().toString().padStart(2, '0');
        const segundos = Data.getUTCSeconds().toString().padStart(2, '0');
        const dia = Data.getUTCDate().toString().padStart(2, '0');
        const mes = (Data.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0 (janeiro = 0)
        const ano = Data.getUTCFullYear();

        const formatoFinal = `${hora}:${minutos}:${segundos} ${dia}-${mes}-${ano}`;

        return formatoFinal;
    }

    useEffect(() => {
        fetchPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchVitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vitals]);

    return(

        <>
            {isLoading ? 
            <p>Carregando</p> : 
            <div className="vitalsPrincipal">
            <div className="vitalsContainer">
                <div className="vitalContainer">
                    <span className="vital">
                        <Image className='vitalImage' src={heart}/>
                        <span className="vitalText">Heart Rate</span>
                    </span>
                    <span className="measure">
                        {userId === vitals.id ? vitals["heart-rate"] : ""} BPM
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
                    {userId === vitals.id ? vitals.oxygenation : ""}%
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
                    {userId === vitals.id ? vitals.temperature : ""}º
                    </span>
                    <span className="state">Normal</span>
                </div>
            </div>
            <div className='secondaryContainer'>
                <div className='vitalsProfile'>
                    <span className='vitalsProfilePrivilege'>Paciente:</span>
                    <span className='vitalsProfileName'>{patient.name}</span>
                    <span className='vitalsProfileAge'>{calcularIdade(patient.birthday)} anos</span>
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
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentHistoria.map(vitals => {
                                return(
                                <tr key={vitals.registered_at}>
                                    <td>{vitals.heart_rate}</td>
                                    <td>{vitals.oxygenation}</td>
                                    <td>{vitals.temperature}</td>
                                    <td>{calcularData(vitals.registered_at)}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <span className='vitalButtons'>
                        <button type='button' className='vitalsButton' onClick={previowsPage}>Anterior</button>
                        <button type='button' className='vitalsButton' onClick={nextPage}>Próxima</button>
                    </span>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default Vitals;