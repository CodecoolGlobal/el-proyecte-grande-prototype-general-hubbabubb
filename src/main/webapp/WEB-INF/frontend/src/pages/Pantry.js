import PantryUsers from "../components/pantry/PantryUsers";
import {Col, Row, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadCry} from "@fortawesome/free-regular-svg-icons";
import {LargeHeader} from "../components/Common";
import React from "react";
import PantryContent from "../components/pantry/PantryContent";

function Pantry() {
    const users = [{
        firstName: 'József',
        lastName: 'Kiss',
        username: 'kissjozsi@gmail.com'
    },{
        firstName: 'Balázs',
        lastName: 'Horváth',
        username: 'bazsika@gmail.com'
    },{
        firstName: 'Soufiane',
        lastName: 'Nagy',
        username: 'soufika@gmail.com'
    },]

    const content =
        [{ingredientName: 'apple', id: 1, checked: false},
            {ingredientName: "potato", id: 2, checked: false},
            {ingredientName: "bread", id: 3, checked: true},
            {ingredientName: "olive oil", id: 4, checked: false}]


    return <Container>
        <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} >
                <PantryUsers users={users} />
            </Col>
        </Row>
        <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} >
                <PantryContent content={content}/>
            </Col>
        </Row>
    </Container>
}
export default Pantry;