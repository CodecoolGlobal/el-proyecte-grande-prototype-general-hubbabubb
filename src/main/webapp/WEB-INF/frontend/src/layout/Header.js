import React, {useContext, useRef} from "react";
import {Row, Col, Dropdown, Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import logo from "../components/logo.png"
import './Header.css';
import {NavLink, withRouter} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import {SearchInput} from "../store/recipe-search-input";

function Header(props) {
    const {setSearchField} = useContext(SearchInput);
    const navigation = useRef("navigation");

    function handleEnter(e) {
        if (e.key === 'Enter') {
            setSearchField(e.target.value);
            props.history.push("/search-recipe");
        }
    }

    return <div ref={navigation} className="header-navbar">
        <Row className="nav-fill" lg={5} md={5}>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Pantry</button>
                    <div className="dropdown-content">
                        <NavLink to="/pantry">My Pantry</NavLink>
                        <NavLink to="/grocery-list">Grocery List</NavLink>
                        <NavLink to="/meal-plan">Meal Plan</NavLink>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Recipes</button>
                    <div className="dropdown-content">
                        <input
                            placeholder={'Search by name'}
                            onKeyPress={(e) => handleEnter(e)}
                        />
                        <NavLink to="/from-my-pantry">From my pantry</NavLink>
                        <NavLink to="#">Favorite recipes</NavLink>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <img width={300} src={logo} alt='logo' />
                <button className="icon">
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Tools</button>
                    <div className="dropdown-content">
                        <NavLink to="#">Ingredient info</NavLink>
                        <NavLink to="#">Unit converter</NavLink>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Profile</button>
                    <div className="dropdown-content">
                        <NavLink to="#">Edit profile</NavLink>
                        <Dropdown.Divider />
                        <NavLink to="#">Logout</NavLink>
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

export default withRouter(Header);
