import React, {useContext, useRef, useState} from "react";
import {Col, Dropdown, Row} from "react-bootstrap";
import logo from "../components/logo.png"
import './Header.css';
import {NavLink, withRouter} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClipboardList, faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import {SearchInput} from "../context/recipe-search-input";
import {Badge, Divider, Grow} from "@material-ui/core";
import AuthenticationService from "../util/AuthenticationService";
import {UserContext} from "../context/user-context";
import {faCalendar} from "@fortawesome/free-regular-svg-icons/faCalendar";
import KitchenSharpIcon from "@material-ui/icons/KitchenSharp";

function Header(props) {
    const {userData, setUserData} = useContext(UserContext);

    const {setSearchField} = useContext(SearchInput);
    const navigation = useRef("navigation");

    const [open, setOpen] = useState(false);

    function toggleNavbar() {
        setOpen(!open);
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            setSearchField(e.target.value);
            props.history.push("/search-recipe");
        }
    }

    function handleLogout() {
        setUserData({
            isLoggedIn: false,
            favorites: null,
            totalFavorites: 0
        })
        AuthenticationService.logout();
        props.history.push("/");
    }

    return <div ref={navigation} className="header-navbar">
        <Row className="nav-fill" lg={5} md={5}>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Pantry</button>
                    <div className="dropdown-content">
                        <NavLink className='navLink' to="/pantry"><KitchenSharpIcon/> My Pantry</NavLink>
                        <NavLink className='navLink' to="/grocery-list"><FontAwesomeIcon icon={faClipboardList}/> Grocery List</NavLink>
                        <NavLink className='navLink' to="/meal-plan"><FontAwesomeIcon icon={faCalendar}/> Meal Plan</NavLink>
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
                        <NavLink className='navLink' to="/from-my-pantry">From my pantry</NavLink>
                        <NavLink className='navLink' to="/favorites">
                            <Badge badgeContent={userData.totalFavorites} color="primary">
                                Favorite recipes
                            </Badge>
                        </NavLink>
                    </div>
                </div>
            </Col>

            <Col className="center-button">
                <img width={300} src={logo} alt='logo'/>
                <div className="miniMenu">
                    <button className="icon" onClick={toggleNavbar}>
                        <FontAwesomeIcon icon={faEllipsisV}/>
                    </button>
                </div>
            </Col>
            <Grow in={open} timeout="auto" unmountOnExit>
                <div className='menuContent'>
                    <a className='closeMiniMenu' onClick={toggleNavbar}>X</a>
                    <Row>
                        <NavLink className='navLink' to="/pantry">My Pantry</NavLink>
                        <NavLink className='navLink' to="/grocery-list">Grocery List</NavLink>
                        <NavLink className='navLink' to="/meal-plan">Meal Plan</NavLink>
                        <Divider/>
                        <input
                            placeholder={'Search by name'}
                            onKeyPress={(e) => handleEnter(e)}
                        />
                        <NavLink className='navLink' to="/from-my-pantry">From my pantry</NavLink>
                        <NavLink className='navLink' to="/favorites">Favorite recipes</NavLink>
                    </Row>
                </div>
            </Grow>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Tools</button>
                    <div className="dropdown-content">
                        <NavLink className='navLink' to="#">Ingredient info</NavLink>
                        <NavLink className='navLink' to="#">Unit converter</NavLink>
                    </div>
                </div>
            </Col>
            <Col className="center-button">
                <div className="header-dropdown">
                    <button className="header-button">Profile</button>
                    <div className="dropdown-content">
                        <NavLink className='navLink' to="#">Edit profile</NavLink>
                        <Dropdown.Divider/>
                        <a className='navLink' onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className="decoration-line-left"/>
                <div className="decoration-line-right"/>
            </Col>
        </Row>
    </div>
}

export default withRouter(Header);
