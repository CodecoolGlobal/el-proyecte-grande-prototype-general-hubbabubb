import LoginRegisterForm from "../components/loginregister/LoginRegisterForm";
import {Container, Row, Col} from "react-bootstrap";
import LogoAnimation from "../components/LogoAnimation";
import styled from "styled-components";

const RegisterLoginContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flax;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function LoginRegister(props) {
        return <Container>
        <Row className="justify-content-md-center">
            <Col >
                <LogoAnimation />
            </Col>
            <Col>
                <RegisterLoginContainer>
                    <LoginRegisterForm active={props.active}/>
                </RegisterLoginContainer>
            </Col>
        </Row>
    </Container>
}

export default LoginRegister;