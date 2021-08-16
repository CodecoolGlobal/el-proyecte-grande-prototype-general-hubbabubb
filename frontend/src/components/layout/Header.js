import {useContext, useState} from "react";
import FavoritesContext from "../../store/favorites-context";
import {Container, Navbar, NavDropdown, Nav, Badge, Row, Col, InputGroup, FormControl} from "react-bootstrap";
import logo from "../../components/logo.svg"
import './Header.module.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import LoginForm from "../LoginForm";

function Header() {
    let favoritesContext = useContext(FavoritesContext);

    return <Navbar className="nav-fill" sticky="top" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown title="My Pantry" id="basic-nav-dropdown" menuVariant={'dark'}
                         bsPrefix="menu-item">
                <NavDropdown.Item href={''} className="menu-context">Pantry</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href={''}>Manage users</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Recipes" id="basic-nav-dropdown" menuVariant={'dark'}
                         bsPrefix="menu-item">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                        icon={faSearch}/></InputGroup.Text>
                    <FormControl
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <NavDropdown.Divider/>
                <NavDropdown.Item href={''} className="menu-context">From my Pantry</NavDropdown.Item>
                <NavDropdown.Item href={''} className="menu-context">Custom
                    ingredients</NavDropdown.Item>
                <NavDropdown.Item href={''} className="menu-context">Favorites <Badge pill
                                                                                      bg="info">{favoritesContext.totalFavorites}</Badge></NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>

        <Navbar.Brand href="/"><img width={300} src={logo} alt="Logo" className="logo"/></Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown title="Grocery List" id="basic-nav-dropdown" menuVariant={'dark'}
                         bsPrefix="menu-item">
                <NavDropdown.Item href={''} className="menu-context">Pantry List</NavDropdown.Item>
                <NavDropdown.Item href={''} className="menu-context">My List</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Profile" id="basic-nav-dropdown" menuVariant={'dark'}
                         bsPrefix="menu-item">
                <LoginForm/>
            </NavDropdown>
        </Navbar.Collapse>
        <Row>
            <Col className="d-none d-lg-block">
                <div className={'decoration-line-left'}/>
                <div className={'decoration-line-right'}/>
            </Col>
        </Row>
    </Navbar>
}

export default Header;