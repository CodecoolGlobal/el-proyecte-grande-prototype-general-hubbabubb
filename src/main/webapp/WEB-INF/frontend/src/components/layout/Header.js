import React, {useContext, useRef} from "react";
import FavoritesContext from "../../store/favorites-context";
import {Row, Col} from "react-bootstrap";
import logo from "../../components/logo.png"
import './Header.module.css';
import {NavLink} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import LoginForm from "../loginregister/LoginForm";

function Header() {
    let favoritesContext = useContext(FavoritesContext);
    const navigation = useRef("navigation");

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
                    <button className="header-button">Pantry</button>
                    <div className="dropdown-content">
                        <NavLink to="/grocery-list">Grocery List</NavLink>
                        <NavLink to="/pantry">Pantry Content</NavLink>
                        <NavLink to="/meal-plan">Meal Plan</NavLink>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Recipes</button>
                    <div className="dropdown-content">
                        <NavLink to="/search-recipe">Search by name</NavLink>
                        <NavLink to="/from-my-pantry">From my pantry</NavLink>
                        <NavLink to="#">Favorite recipes</NavLink>
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
                    <button className="header-button">Tools</button>
                    <div className="dropdown-content">
                        <NavLink to="#">Pantry Settings</NavLink>
                        <NavLink to="#">Ingredient info</NavLink>
                        <NavLink to="#">Unit converter</NavLink>
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
