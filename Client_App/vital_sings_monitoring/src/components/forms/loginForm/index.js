import { Form, Image, Button } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/formLogin.css';
import image from '../../../assets/images/bg.jpg';
import closeIcon from '../../../assets/close-button.png';
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import PatientsService from "../../../services/patient";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [privilege, setPrivilege] = useState('');
    const [navigateToVitals, setNavigateToVitals] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(email === "administrator@gmail.com")
            setPrivilege('Administrator');
        try {
            await PatientsService.login({
                email: email,
                password: password,
                privilege: privilege
            })
            setNavigateToVitals(true);
        } catch (error) {
            console.log(error, privilege, email)
        }
    }

    if(navigateToVitals) return <Navigate replace to={{pathname: '/vitals'}}/>;

    return (
        <div className="mainContainer">
            <Form className="loginForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDoctors">
                    <Form.Label>Account</Form.Label>
                    <Form.Select onChange={e => setPrivilege(e.target.value)} aria-label="Select your Doctor">
                        <option disabled>Select your privilege</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">LogIn</Button>
            </Form>
            <h1 className="loginTitle">Welcome Back</h1>
            <Link to="/"><Image className="closeIcon" src={closeIcon} /></Link>
            <Image className="formImage" src={image} />
        </div>
    )
}

export default Login;