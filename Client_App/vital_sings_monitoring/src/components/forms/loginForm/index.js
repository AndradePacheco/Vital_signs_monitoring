import { Form, Image, Button } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/formLogin.css';
import image from '../../../assets/images/bg.jpg';
import closeIcon from '../../../assets/close-button.png';
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="mainContainer">
            <Form className="loginForm">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDoctors">
                    <Form.Label>Account</Form.Label>
                    <Form.Select aria-label="Select your Doctor">
                        <option disabled selected>Select your privilege</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">LogIn</Button>
            </Form>
            <h1 className="loginTitle">Welcome Back</h1>
            <Link to="/"><Image className="closeIcon" src={closeIcon}/></Link>
            <Image className="formImage" src={image}/>
        </div>
    )
}

export default Register;