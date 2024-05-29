import { Form, Col, Row, Image, Button } from "react-bootstrap";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../styles/form.css';
import image from '../../../../assets/images/bg.jpg';
import closeIcon from '../../../../assets/close-button.png';
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PatientsService from "../../../../services/patient";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [doctor, setDoctor] = useState('');
    const [navigateToLogin, setNavigateToLogin] = useState(false);
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const data = new Date(birthday);

            let dia = String(data.getDate()).padStart(2, '0');
            let mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses em JavaScript começam do 0 para janeiro
            let ano = data.getFullYear();

            var dataFormatada = dia + '/' + mes + '/' + ano ;
            const user = await PatientsService.register({ name: firstName + ' ' + secondName, email: email, password: password, address: address, phone_number: phoneNumber, birthday: dataFormatada, doctor: doctor});
            console.log(user);
            console.log(dataFormatada)
            setNavigateToLogin(true);
        } catch (error) {
            console.log(error);
            console.log(dataFormatada, firstName + ' ' + secondName, email, password, address, phoneNumber, doctor);
        }
    }
    if (navigateToLogin) return <Navigate replace to={{ pathname: '/login' }}/>
    return (
        <div className="mainContainer">
            <span className="toogleSection">
                <button className="toogleButton doctorButton"><Link replace to={'/doctorRegister'}>Doctor</Link> </button>
                <button className="toogleButton patientButton">Patient</button>
            </span>
            <Form className="registerForm" onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" required value={secondName} onChange={e => setSecondName(e.target.value)} placeholder="Last Name" />
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
            <h1 className="registerTitle">Welcome</h1>
            <Link to="/"><Image className="closeIcon" src={closeIcon} /></Link>
            <Image className="formImage" src={image} />
        </div>
    )
}

export default Register;