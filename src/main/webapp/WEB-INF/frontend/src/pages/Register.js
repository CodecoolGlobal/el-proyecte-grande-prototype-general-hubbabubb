import RegisterForm from "../components/login/RegisterForm";
import {Container, Row, Col} from "react-bootstrap";
import LogoAnimation from "../components/LogoAnimation";

function Register() {
        return <Container>
        <Row className="justify-content-md-center">
            <Col>
                <LogoAnimation />
            </Col>
            <Col>
                <RegisterForm />
            </Col>
        </Row>
    </Container>
}

export default Register;