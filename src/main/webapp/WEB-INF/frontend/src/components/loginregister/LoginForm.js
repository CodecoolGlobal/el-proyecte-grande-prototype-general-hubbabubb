import React, {useContext, useState} from "react";
import {BoxContainer, SubmitButton, FormContainer, Input, MutedLink, HighlightedText} from "../Common";
import {validateEmail} from "./RegisterForm";
import {AccountContext} from "./accountContext";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import AuthenticationService from "../../util/AuthenticationService";
import {hostName} from "../../util/constants";

function LoginForm(props) {
    const {switchToRegister} = useContext(AccountContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm(props) {
        return email.length > 0 && password.length > 0 && validateEmail(email);
    }

    async function handleSubmit() {
        AuthenticationService
            .executeJwtAuthenticationService(email, password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(email, response.data.token)
                console.log("Successfully logged in!")
                console.log(AuthenticationService.isUserLoggedIn());
                this.props.history.push(`/pantry`)
            }).catch((error) => {
                console.log("Error in logging in!")
                console.log(error)
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
                type={'submit'}
                onClick={handleSubmit}
                disable={validateForm()}
            >Login
            </SubmitButton>
        </FormContainer>
        <MutedLink>New here? <HighlightedText onClick={switchToRegister}>
            Register
        </HighlightedText></MutedLink>
    </BoxContainer>
}

export default withRouter(LoginForm);