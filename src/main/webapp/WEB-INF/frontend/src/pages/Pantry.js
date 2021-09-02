import PantryUsers from "../components/pantry/PantryUsers";
import {Col, Row, Container} from "react-bootstrap";
import React from "react";
import PantryContent from "../components/pantry/PantryContent";


function Pantry() {
    const users = [{
        firstName: 'József',
        lastName: 'Kiss',
        username: 'kissjozsi@gmail.com'
    }, {
        firstName: 'Balázs',
        lastName: 'Horváth',
        username: 'bazsika@gmail.com'
    }, {
        firstName: 'Soufiane',
        lastName: 'Nagy',
        username: 'soufika@gmail.com'
    }]


    return <Container>
        <Row>
            <Col sm="12" md={{size: 6, offset: 3}}>
                <PantryUsers users={users}/>
            </Col>
        </Row>
        <Row>
            <Col sm="12" md={{size: 6, offset: 3}}>
                <PantryContent/>
            </Col>
        </Row>
    </Container>
}

export default Pantry;