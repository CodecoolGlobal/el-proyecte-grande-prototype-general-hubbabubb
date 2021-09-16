import Header from "./Header";
import styled from 'styled-components';
import {useContext} from "react";
import {UserContext} from "../context/user-context";


function Layout(props) {
    const {userData, setUserData} = useContext(UserContext);

    const MainContainer = styled.main`
        padding-top: 200px;
        background: rgb(228,241,235);
        background: linear-gradient(180deg, rgba(228,241,235,1) 15%, rgba(189,217,223,1) 100%);
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        height: 100vh;
        overflow-y: scroll;
    `;

    return <MainContainer>
        { userData.isLoggedIn && <Header />}
        <main>
            {props.children}
        </main>
    </MainContainer>
}

export default Layout;