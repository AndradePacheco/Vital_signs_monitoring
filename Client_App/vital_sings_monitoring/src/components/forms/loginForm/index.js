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
    const [user, setUser] = useState(null);

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
            const response = JSON.parse(localStorage.getItem('user'));
            setUser(response);
            setNavigateToVitals(true);
        } catch (error) {
            console.log(error, privilege, email)
        }
    }

    if(navigateToVitals){
        if(privilege === "Doctor" || privilege === "Administrator") return <Navigate replace to={{pathname: '/patients'}}/>;
        return <Navigate replace to={{pathname: `/vitals/${user._id}`}}/>;
    } 

    return (
        <div className="mainContainer">
            <Form className="loginForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereço de Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Palavra-Passe</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a palavra-passe..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDoctors">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Select onChange={e => setPrivilege(e.target.value)} aria-label="Select your Doctor">
                        <option disabled>Selecione o tipo da sua conta</option>
                        <option value="Doctor">Médico</option>
                        <option value="Patient">Paciente</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">Entrar</Button>
                <h1 className="loginTitle">Welcome Back</h1>
            </Form>
            <Link to="/"><Image className="closeIcon" src={closeIcon} /></Link>
            <Image className="formImage" src={image} />
        </div>
    )
}

export default Login;