import { Form, Col, Row, Image, Button } from "react-bootstrap";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../styles/form.css';
import image from '../../../../assets/images/bg.jpg';
import closeIcon from '../../../../assets/close-button.png';
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="mainContainer">
            <span className="toogleSection">
                <button className="toogleButton doctorButton">Doctor</button>
                <button className="toogleButton patientButton">Patient</button>
            </span>
            <Form className="registerForm">
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Address"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFamily">
                    {/*<Form.Label>Have a family member?</Form.Label>
                    <Form.Check label="Yes" name="familyMember" type="radio" id="familyMember"/>
    <Form.Check inline label="No" name="familyMember" type="radio" id="familyMember"/>*/}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDoctors">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Select aria-label="Select your Doctor">
                        <option disabled selected>Choose your Doctor</option>
                        <option value="#">Andrade</option>
                        <option value="#">Pacheco</option>
                        <option value="#">Calado</option>
                        <option value="#">Samuel</option>
                    </Form.Select>
                </Form.Group>
                
                <Button type="submit">Submit Form</Button>

            </Form>
            <h1 className="registerTitle">Welcome</h1>
            <Link to="/"><Image className="closeIcon" src={closeIcon}/></Link>
            <Image className="formImage" src={image}/>
        </div>
    )
}

export default Register;