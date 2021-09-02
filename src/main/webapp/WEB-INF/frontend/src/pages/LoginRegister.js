import LoginRegisterForm from "../components/loginregister/LoginRegisterForm";
import {Container, Row, Col} from "react-bootstrap";
import LogoAnimation from "../components/LogoAnimation";
import styled from "styled-components";
import {withRouter} from 'react-router-dom';
import AuthenticationService from "../util/AuthenticationService";


const RegisterLoginContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flax;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function LoginRegister(props) {
    if (AuthenticationService.isUserLoggedIn()) {
        props.history.push("/pantry");
    }

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

export default withRouter(LoginRegister);