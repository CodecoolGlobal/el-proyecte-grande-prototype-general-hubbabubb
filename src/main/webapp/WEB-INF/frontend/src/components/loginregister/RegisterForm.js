import React, {useContext, useState} from "react";
import {BoxContainer, ErrorText, FormContainer, HighlightedText, Input, MutedLink, SubmitButton} from "../Common";
import {AccountContext} from './accountContext';
import {postFetch} from "../../util/fetchData";

export default function RegisterForm(props) {
    const {switchToLogin} = useContext(AccountContext)
    const {extendAndStop} = useContext(AccountContext)
    const {setInProgress} = useContext(AccountContext)
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();

    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [confirmError, setConfirmError] = useState();

    function allInputsValid() {
        return firstNameError === null && lastNameError === null && emailError === null && passwordError === null && confirmError === null;
    }

    function handleSubmit() {
        setFirstNameError(null);
        setLastNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setConfirmError(null);

        if (firstName == null || !onlyLetters(firstName)) {
            setFirstNameError("This field is required, and must be a valid name.");
        }
        if (lastName == null || !onlyLetters(lastName)) {
            setLastNameError("This field is required, and must be a valid name.");
        }
        if (email == null || !validateEmail(email)) {
            setEmailError("This field is required, and must be a valid email.");
        }
        if (password == null || !validatePassword(password)) {
            setPasswordError("This field is required, and must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.");
        }
        if (password !== confirm) {
            setConfirmError("Password and confirmation is not match.");
        }

        if (allInputsValid()) {
            const data = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            }
            setInProgress(false);
            postFetch(`/api/v1/registration`, data, extendAndStop, (err) => { console.log(err) })

        }
    }
    return <BoxContainer>
        <FormContainer action={handleSubmit}>
            <Input onChange={(value) => setFirstName(value.target.value)} type={'text'} placeholder={'First Name'}/>
            {firstNameError != null && <ErrorText>{firstNameError}</ErrorText>}
            <Input onChange={(value) => setLastName(value.target.value)} type={'text'} placeholder={'Last Name'}/>
            {lastNameError != null && <ErrorText>{lastNameError}</ErrorText>}
            <Input onChange={(value) => setEmail(value.target.value)} type={'email'} placeholder={'Email'}/>
            {emailError != null && <ErrorText>{emailError}</ErrorText>}
            <Input onChange={(value) => setPassword(value.target.value)} type={'password'} placeholder={'Password'}/>
            {passwordError != null && <ErrorText>{passwordError}</ErrorText>}
            <Input onChange={(value) => setConfirm(value.target.value)} type={'password'} placeholder={'Confirm password'}/>
            {confirmError != null && <ErrorText>{confirmError}</ErrorText>}
            <SubmitButton onClick={handleSubmit} type='button'>Register</SubmitButton>
        </FormContainer>
        <MutedLink>Already a member? <HighlightedText href="#"
                                                      onClick={switchToLogin}> Login</HighlightedText></MutedLink>
    </BoxContainer>
}

function onlyLetters(str) {
    return str.match("^[a-zA-Z]+$");
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    let passw = /^[A-Za-z]\w{6,14}$/;
    return passw.test(password);
}