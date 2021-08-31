import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {AccountContext} from "./accountContext";
import {HighlightedText} from "../Common";

const BoxContainer = styled.div`
    width: 280px;
    min-height: 550px;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    top: -290px;
    left: -70px;
    transform: rotate(60deg);
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    background: rgb(39,174,96);
    background: linear-gradient(90deg, rgba(39,174,96,1) 24%, rgba(46,204,113,1) 100%); 
`;

const backDropVariants = {
    expanded: {
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
}

const expendingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-size: 40px;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
    margin: 0;
`;

const SmallText = styled.h5`
    font-size: 22px;
    font-weight: 500;
    color: black;
    z-index: 10;
    font-family: 'Oswald';
`;

const InnerContainer = styled.div`
    width: 100%;
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`;

export default function LoginRegisterForm(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState(props.active)
    const [isSuccessful, setIsSuccessful] = useState(null)

    const playExpandedAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expendingTransition.duration * 1000 - 1500)
    }
    const extendAndStop = () => {
        setExpanded(true);
        setIsSuccessful(true);
    }

    const switchToRegister = () => {
        playExpandedAnimation();
        setTimeout(() => {
            setActive("register");
        }, 400);
    };
    const switchToLogin = () => {
        playExpandedAnimation();
        setTimeout(() => {
            setActive("login");
        }, 400);
    };

    const contextValue = { switchToRegister, switchToLogin, extendAndStop };

    return (
        <AccountContext.Provider value={contextValue}>
            <BoxContainer>
                <TopContainer>
                    <BackDrop
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={backDropVariants}
                        transition={expendingTransition}
                    />
                    {active === "login" && isSuccessful === null && <HeaderContainer>
                        <HeaderText>Log in </HeaderText>
                        <HeaderText>to your pantry! </HeaderText>
                    </HeaderContainer>}
                    {active === "register" && isSuccessful === null  && <HeaderContainer>
                        <HeaderText>Register </HeaderText>
                        <HeaderText>your pantry! </HeaderText>
                        </HeaderContainer>}
                    {isSuccessful === true && <HeaderContainer>
                        <HeaderText>Thank you!</HeaderText>
                        <SmallText>We sent you a confirmation email!</SmallText>
                    </HeaderContainer>}
                </TopContainer>
                <InnerContainer>
                    {active === "login" && <LoginForm/>}
                    {active === "register" && <RegisterForm/>}
                </InnerContainer>
            </BoxContainer>
        </AccountContext.Provider>
    )
}
