import React, {useContext} from "react";
import {BoxContainer, SubmitButton, FormContainer, Input, MutedLink, HighlightedText} from "./Common";
import {AccountContext} from './accountContext';

export default function LoginForm(props) {
    const { switchToRegister } = useContext(AccountContext);

    return <BoxContainer>
        <FormContainer>
            <Input type={'email'} placeholder={'Email'}/>
            <Input type={'password'} placeholder={'Password'}/>
            <SubmitButton type={'submit'}>Login</SubmitButton>
        </FormContainer>
        <MutedLink>New here? <HighlightedText href="#" onClick={switchToRegister}>
            Register
        </HighlightedText></MutedLink>
    </BoxContainer>
}