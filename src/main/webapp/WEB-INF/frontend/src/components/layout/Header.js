import React, {useContext, useRef} from "react";
import FavoritesContext from "../../store/favorites-context";
import {Nav, Navbar, NavDropdown, Badge, Row, Col, InputGroup, FormControl, Container} from "react-bootstrap";
import logo from "../../components/logo.png"
import './Header.module.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import LoginForm from "../login/LoginForm";

function Header() {
    let favoritesContext = useContext(FavoritesContext);
    const navigation = useRef();

    const inputs = [{
        name: "username",
        placeholder: "username",
        type: "text"
    },{
        name: "password",
        placeholder: "password",
        type: "password"
    },{
        type: "submit",
        value: "Submit",
        className: "btn"
    }]

    const props = {
        name: 'loginForm',
        method: 'POST',
        action: '/perform_login',
        inputs: inputs
    }

    const params = new URLSearchParams(window.location.search)

    function openMenu() {
        if (navigation.className === "top-navigation") {
            navigation.className += " responsive";
        } else {
            navigation.className = "top-navigation";
        }
    }

    return <div ref={navigation} className="header-navbar">
        <Row className="nav-fill" lg={5} md={5}>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Dropdown</button>
                    <div className="dropdown-content">
                        <a href="/grocery-list">Grocery List[Test]</a>
                        <a href="/pantry">Pantry Items [Test]</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Dropdown</button>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <img width={300} src={logo} alt='logo' />
                <button className="icon" onClick={openMenu}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Dropdown</button>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Profile</button>
                    <div className="dropdown-content">
                        <LoginForm {...props} error={params.get('error')} />
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className="decoration-line-left" />
                <div className="decoration-line-right" />
            </Col>
        </Row>
    </div>
}

export default Header;
