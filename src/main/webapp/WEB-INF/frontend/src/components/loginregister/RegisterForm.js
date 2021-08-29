import React, {useContext} from "react";
import {BoxContainer, SubmitButton, FormContainer, Input, MutedLink, HighlightedText} from "./Common";
import {AccountContext} from './accountContext';

export default function RegisterForm(props) {
    const { switchToLogin } = useContext(AccountContext)

    return <BoxContainer>
        <FormContainer>
            <Input type={'text'} placeholder={'First Name'}/>
            <Input type={'text'} placeholder={'Last Name'}/>
            <Input type={'email'} placeholder={'Email'}/>
            <Input type={'password'} placeholder={'Password'}/>
            <Input type={'password'} placeholder={'Confirm password'}/>
            <SubmitButton type={'submit'}>Register</SubmitButton>
        </FormContainer>
        <MutedLink>Already a member? <HighlightedText href="#" onClick={switchToLogin}> Login</HighlightedText></MutedLink>
    </BoxContainer>
}