import PantryUsers from "../components/pantry/PantryUsers";
import {Col, Row, Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import PantryContent from "../components/pantry/PantryContent";
import {getFetch} from "../util/fetchData";
import AuthenticationService from "../util/AuthenticationService";


function Pantry() {
    const [users, setUsers] = useState([]);
    const [isInvited, setIsInvited] = useState(false);
    const [invitationId, setInvitationId] = useState();

    useEffect(() => {
        getFetch(`api/v1/pantry/${AuthenticationService.getLoggedInUserName()}`, (json) => {
            setUsers(json.pantryAppUsers);
        }, (err) => {
            console.error(err);
        })

        getFetch(`api/v1/pantry/invitation/${AuthenticationService.getLoggedInUserName()}`, (json) => {
            setIsInvited(true);
            setInvitationId(json.invitedPantryId);
        }, (err) => {
            console.error(err);
        })
    })

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