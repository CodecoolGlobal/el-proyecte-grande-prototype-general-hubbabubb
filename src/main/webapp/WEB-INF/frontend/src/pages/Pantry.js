import PantryUsers from "../components/pantry/PantryUsers";
import {Col, Row, Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import PantryContent from "../components/pantry/PantryContent";
import {getFetch, putFetch} from "../util/fetchData";
import AuthenticationService from "../util/AuthenticationService";

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {Grow} from "@material-ui/core";


function Pantry() {
    const [isInvited, setIsInvited] = useState(false);

    useEffect(() => {
        getFetch(`api/v1/pantry/invitation/${AuthenticationService.getLoggedInUserName()}`, (json) => {
            setIsInvited(true);
        }, (err) => {
            console.error(err);
        })
    }, [isInvited])

    function acceptInvitation() {
        putFetch(`api/v1/acceptPantryInvite/${AuthenticationService.getLoggedInUserName()}`, (err) => console.error(err))
        setIsInvited(false);
    }

    function refuseInvitation() {
        putFetch(`api/v1/refusePantryInvite/${AuthenticationService.getLoggedInUserName()}`, (err) => console.error(err))
        setIsInvited(false);
    }

    return <Container>
        <Row>
            <Col sm="12" md={{size: 6, offset: 3}}>
                <PantryUsers/>
            </Col>
        </Row>
        <Row>
            <Col sm="12" md={{size: 6, offset: 3}}>
                <PantryContent/>
            </Col>
        </Row>

        <Grow in={isInvited} timeout="auto" unmountOnExit>
            <Alert
            severity="warning"
            action={<div>
                <Button color="primary" size="small" onClick={acceptInvitation}>
                    ACCEPT INVITATION
                </Button>
                <Button color="inherit" size="small" onClick={refuseInvitation}>
                    REFUSE INVITATION
                </Button></div>
            }
        >
            You have an invitation to a Pantry!
        </Alert>
        </Grow>
    </Container>
}

export default Pantry;