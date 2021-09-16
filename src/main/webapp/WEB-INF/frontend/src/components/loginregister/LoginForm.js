import React, {useContext, useState} from "react";
import {BoxContainer, FormContainer, HighlightedText, Input, MutedLink, SubmitButton} from "../Common";
import {validateEmail} from "./RegisterForm";
import {AccountContext} from "./accountContext";
import {withRouter} from 'react-router-dom';
import AuthenticationService from "../../util/AuthenticationService";
import {UserContext} from "../../context/user-context";
import {getFetch} from "../../util/fetchData";

function LoginForm(props) {
    const {userData, setUserData} = useContext(UserContext);
    const {switchToRegister} = useContext(AccountContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        return email.length > 0 && password.length > 0 && validateEmail(email);
    }

    function handleSubmit() {
        AuthenticationService
            .executeBasicAuthenticationService(email, password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(email, password)
                getFetch(`/api/v1/appuser/favorites/${AuthenticationService.getLoggedInUserName()}`, (favorites) => {
                    setUserData({
                        isLoggedIn: true,
                        favorites: favorites,
                        totalFavorites: favorites.length
                    })
                    console.log(favorites)
                    props.history.push(`/pantry`);
                }, (err) => console.error(err))

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