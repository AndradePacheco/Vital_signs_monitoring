import { useState, useEffect } from "react";
import DoctorService from "../../services/doctor";
import '../../styles/managePatients.css'
import updateImage from '../../assets/update.png';
import deleteImage from '../../assets/Trash.png';
import closeIcon from '../../assets/close-button.png';
import { Image, Form, Button, Col, Row } from "react-bootstrap";
import Swal from 'sweetalert2';

function ManageDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [doctor, setDoctor] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);

    async function handleDeleteDoctor(id) {

        Swal.fire({
            title: "Deseja remover este Médico?",
            text: "Não será capaz de reverter esta acção!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Remover!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await DoctorService.deleteDoctor(id);
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                    console.log(id);
                }
                Swal.fire({
                    title: "Removido!",
                    text: "O Médico foi removido.",
                    icon: "Sucesso"
                });
            }
        });
    }


    const handleUpdateDoctor = async (evt) => {
        evt.preventDefault();
        try {
            await DoctorService.updateDoctor(doctor._id, { name: name, phone_number: phoneNumber, email: email, password: password })
            Swal.fire("Médico atualizado com sucesso!", "", "Success");
            setTimeout(() => {
                window.location.reload();;
            }, "2000");
        } catch (error) {

        }
    }

    async function getDoctor(id) {
        try {
            const Doctor = await DoctorService.getDoctor(id);
            setDoctor(Doctor.data);
            setName(doctor.name)
            setEmail(doctor.email);
            setPhoneNumber(doctor.phone_number);
            
        } catch (error) {

        }
    }

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await DoctorService.getDoctors();
                setDoctors(response.data);
            } catch (error) {
                // Trate os erros aqui
            }
        };

        fetchDoctors();
    }, []);

    return (
        <>
            <div className="managePatients">
                <div className="manageMonitoredPatients">
                    <div className="manageTitle"><h1>Médicos</h1></div>

                    <table className="managePatientsTable">
                        <thead>
                            <tr>
                                <th>
                                    Nome
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Nº de Telefone
                                </th>
                                <th>
                                    Secção
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map((doctor, pos) => {
                                    return (
                                        <tr key={doctor._id}>
                                            <td className='manageTableName'>
                                               <span>{doctor.name}</span>
                                            </td>
                                            <td>
                                                <span className='patientsMeasure'>{doctor.email}</span>
                                            </td>
                                            <td>
                                                <span className='patientsMeasure'>{doctor.phone_number}</span>
                                            </td>
                                            <td>
                                                <span className='patientsMeasure'>{doctor.name}</span>
                                            </td>
                                            <td className="managePatientsButton">
                                                <button onClick={() => {
                                                    getDoctor(doctor._id);
                                                    setShowForm(true);
                                                }} title="Editar dados do profissional de saúde" type="button" className="managePatientsUpdateButton"><Image className="managePatientsImage" src={updateImage} /></button>
                                            </td>
                                            <td className="managePatientsButton">
                                                <button title="Remover Paciente" type="button" className="managePatientsUpdateButton" onClick={() => { handleDeleteDoctor(doctor._id) }}><Image className="managePatientsImage" src={deleteImage} /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className={showForm ? 'managePatientsFormContainer' : 'managePatientsFormContainerHidden'}>
                    <Form className="managePatientsForm" onSubmit={handleUpdateDoctor}>
                        <button type="button" className="managePatientsFormCloseButton" onClick={() => { setShowForm(false) }}>
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
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFamily">
                            {/*<Form.Label>Have a family member?</Form.Label>
                    <Form.Check label="Yes" name="familyMember" type="radio" id="familyMember"/>
    <Form.Check inline label="No" name="familyMember" type="radio" id="familyMember"/>*/}
                        </Form.Group>

                        <Button type="submit">Submit Form</Button>

                    </Form>
                </div>
            </div>
        </>

    )
}

export default ManageDoctors;