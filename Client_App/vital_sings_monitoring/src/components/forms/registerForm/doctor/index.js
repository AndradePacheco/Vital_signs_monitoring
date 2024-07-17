import { Form, Col, Row, Image, Button } from "react-bootstrap";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../styles/form.css';
import image from '../../../../assets/images/bg.jpg';
import closeIcon from '../../../../assets/close-button.png';
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import DoctorService from "../../../../services/doctor";
function Register() {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [navigateToLogin, setNavigateToLogin] = useState(false);
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const user = await DoctorService.register({ name: firstName + ' ' + secondName, email: email, password: password, phone_number: phoneNumber});
            console.log(user);
            setNavigateToLogin(true);
        } catch (error) {
            console.log(error);
        }
    }
    if (navigateToLogin) return <Navigate replace to={{ pathname: '/login' }}/>
    return (
        <div className="mainContainer">
            <span className="toogleSection">
                <button className="toogleButton doctorButton"><Link replace to={'/doctorRegister'}>Médico</Link></button>
                <button className="toogleButton patientButton"><Link replace to={'/patientRegister'}>Paciente</Link></button>
            </span>
            <Form className="registerForm" onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>Primeiro Nome</Form.Label>
                        <Form.Control type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Primeiro nome..." />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Último Nome</Form.Label>
                        <Form.Control type="text" required value={secondName} onChange={e => setSecondName(e.target.value)} placeholder="Último nome..." />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereço de Email</Form.Label>
                    <Form.Control type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o endereço de email..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Palavra-Passe</Form.Label>
                    <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a palavra-passe..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Número de telefone</Form.Label>
                    <Form.Control type="tel" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Digite o número de telefone..." />
                </Form.Group>

                <Button type="submit">Cadastrar médico</Button>
            </Form>
            <Link to="/"><Image className="closeIcon" src={closeIcon} /></Link>
            <Image className="formImage" src={image} />
            <h1 className="registerTitle">Welcome</h1>
        </div>
    )
}

export default Register;