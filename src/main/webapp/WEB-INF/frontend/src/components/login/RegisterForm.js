import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom'
import {Form, Button, Card, Container} from "reactstrap";


function RegisterForm() {
    let history = useHistory();

    let nameInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const name = nameInputRef.current;
        const email = emailInputRef.current;
        const password = passwordInputRef.current;

        const data = {
            name: name,
            email: email,
            password: password
        }

        register(data);
    }

    function register(data) {
        fetch(
            'api/url',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            history.replace('/')
        });
    }

    return <Container style={{width: '18rem'}}>
        <h1>Create your pantry!</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="control.name">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="Csésze Alajos" required ref={nameInputRef}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="control.email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" required ref={emailInputRef}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="control.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required ref={passwordInputRef}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="control.checkout">
                <Form.Check type="checkbox" label="Terms of bla bla agree" required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Container>

}

export default RegisterForm;