import RegisterForm from "../components/login/RegisterForm";
import {Container, Row, Col} from "react-bootstrap";

function Register() {
        return <Container>
        <Row className="justify-content-md-center">
            <Col xs lg="2">
                <RegisterForm />
            </Col>
        </Row>
    </Container>
}

export default Register;