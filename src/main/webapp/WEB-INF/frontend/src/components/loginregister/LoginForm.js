import React, {useContext, useState} from "react";
import {BoxContainer, SubmitButton, FormContainer, Input, MutedLink, HighlightedText} from "./Common";
import {validateEmail} from "./RegisterForm";
import {AccountContext} from "./accountContext";
import axios from "axios";
import {hostName} from "../../util/constants";

export default function LoginForm(props) {
    const {switchToRegister} = useContext(AccountContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && validateEmail(email);
    }

    async function handleSubmit(event) {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + Buffer.from(email + ":" + password).toString('base64'),);

        event.preventDefault();
        const response = await axios.post(`${hostName}/api/v1/user/authenticate`, {
            email: email,
            password: password
        });
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("username", response.data.name)
        console.log(response.data);
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