import React, {useContext, useState} from "react";
import {BoxContainer, SubmitButton, FormContainer, Input, MutedLink, HighlightedText} from "../Common";
import {validateEmail} from "./RegisterForm";
import {AccountContext} from "./accountContext";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import AuthenticationService, {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../../util/AuthenticationService";

function LoginForm(props) {
    const {switchToRegister} = useContext(AccountContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm(props) {
        return email.length > 0 && password.length > 0 && validateEmail(email);
    }

    function handleSubmit() {
        AuthenticationService
            .executeBasicAuthenticationService(email, password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(email, password)
                console.log(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME))
                props.history.push(`/pantry`);
            }).catch((err) => {
                console.log(err);
        })
    }

    return <BoxContainer>
        <FormContainer>
            <Input
                type={'email'}
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type={'password'}
                placeholder={'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton
                type={'button'}
                onClick={handleSubmit}
                disable={validateForm}
            >Login
            </SubmitButton>
        </FormContainer>
        <MutedLink>New here? <HighlightedText onClick={switchToRegister}>
            Register
        </HighlightedText></MutedLink>
    </BoxContainer>
}

export default withRouter(LoginForm);