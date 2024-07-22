import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PatientsService from "../../services/patient";
import '../../styles/managePatients.css'
import updateImage from '../../assets/update.png';
import deleteImage from '../../assets/Trash.png';
import closeIcon from '../../assets/close-button.png';
import { Image, Form, Button, Col, Row } from "react-bootstrap";
import Swal from 'sweetalert2';
import Patient from "./patient";

function ManagePatients(){
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [doctor, setDoctor] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);

    async function handleDeletePatient(id){

        Swal.fire({
            title: "Deseja remover este paciente?",
            text: "Não será capaz de reverter esta acção!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Remover!",
            cancelButtonText: "Cancelar"
          }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await PatientsService.delete(id);
                    console.log(id);
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                    console.log(id);
                }
              Swal.fire({
                title: "Removido!",
                text: "O paciente foi removido.",
                icon: "Sucesso"
              });
            }
          });
    }


    const handleUpdatePatient = async (evt) => {
        evt.preventDefault();
        console.log(patient._id);
        try {
           await PatientsService.update(patient._id, {name: name, birthday: birthday, phone_number: phoneNumber, address: address, email: email, doctor: doctor, password: password})
           Swal.fire("Paciente atualizado com sucesso!","", "Success");
           setTimeout(() => {
            window.location.reload();;
          }, "2000");
        } catch (error) {
            
        }
    }

    async function getPatient(id){
        try {
            const Patient = await PatientsService.getPatient(id);
            setPatient(Patient.data);
            setName(patient.name)
            setAddress(patient.address);
            setBirthday(patient.birthday);
            setDoctor(patient.doctor);
            setEmail(patient.email);
            setPhoneNumber(patient.phone_number);
        } catch (error) {
            
        }
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

    return(
        <>
             <div className="managePatients">
                 <div className="manageMonitoredPatients">
                    <div className="manageTitle"><h1>Pacientes</h1></div>
                 
                        <table className="managePatientsTable">
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
                                                <td className='manageTableName'>
                                                    <Link className="manageTableNameLink" to={`/vitals/${patient._id}`}><span> [{pos + 1}] {patient.name}</span> <span className="eyeIcon">&#128065;</span></Link>
                                                </td>
                                               <Patient patientId={patient._id}/>
                                                <td className="managePatientsButton">
                                                    <button onClick={() => {
                                                        getPatient(patient._id);
                                                        setShowForm(true);
                                                        }} title="Editar dados do paciente" type="button" className="managePatientsUpdateButton"><Image className="managePatientsImage" src={updateImage}/></button>
                                                </td>
                                                <td className="managePatientsButton">
                                                    <button title="Remover Paciente" type="button" className="managePatientsUpdateButton" onClick={()=> {handleDeletePatient(patient._id)}}><Image className="managePatientsImage" src={deleteImage}/></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className={showForm ? 'managePatientsFormContainer' : 'managePatientsFormContainerHidden'}>
                    <Form className="managePatientsForm" onSubmit={handleUpdatePatient}>
                    <button type="button" className="managePatientsFormCloseButton" onClick={() => {setShowForm(false)}}>
                        <Image className="closeIcon" src={closeIcon} />
                    </button>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="First Name" />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control required value={birthday} onChange={e => setBirthday(e.target.value)} type="date" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" required value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your Address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFamily">
                    {/*<Form.Label>Have a family member?</Form.Label>
                    <Form.Check label="Yes" name="familyMember" type="radio" id="familyMember"/>
    <Form.Check inline label="No" name="familyMember" type="radio" id="familyMember"/>*/}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDoctors">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Select aria-label="Select your Doctor" onChange={e => setDoctor(e.target.value)}>
                        <option disabled defaultChecked>Choose your Doctor</option>
                        <option value="6608368693c9dd3673fe6341">Andrade</option>
                        <option value="6608368693c9dd3673fe6342">Pacheco</option>
                        <option value="6608368693c9dd3673fe6343">Calado</option>
                        <option value="6608368693c9dd3673fe6344">Samuel</option>
                    </Form.Select>
                </Form.Group>

                <Button type="submit">Submit Form</Button>

            </Form>
                    </div>
             </div>
        </>

    )
}

export default ManagePatients;