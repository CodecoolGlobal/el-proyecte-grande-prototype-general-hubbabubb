import LoginRegisterForm from "../components/loginregister/LoginRegisterForm";
import {Col, Container, Row} from "react-bootstrap";
import LogoAnimation from "../components/LogoAnimation";
import styled from "styled-components";
import {withRouter} from 'react-router-dom';
import AuthenticationService from "../util/AuthenticationService";
import {useState} from "react";
import {Grow} from "@material-ui/core";
import ColoredLogo from "../components/ColoredLogo";


const RegisterLoginContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flax;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function LoginRegister(props) {
    const [inProgress, setInProgress] = useState(true);
    if (AuthenticationService.isUserLoggedIn()) {
        props.history.push("/pantry");
    }

    return <Container>
        <Row className="justify-content-md-center">
            <Col >
                {inProgress ? <LogoAnimation /> : <ColoredLogo />}
            </Col>
            <Col>
                <RegisterLoginContainer>
                    <LoginRegisterForm active={props.active} setProgress={{setInProgress}}/>
                </RegisterLoginContainer>
            </Col>
        </Row>
    </Container>
}

export default withRouter(LoginRegister);