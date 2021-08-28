import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + Buffer.from(email + ":" + password).toString('base64'),);

        event.preventDefault();
        const response = await axios.post("http://localhost:8080/api/v1/user/authenticate", {
            email: email,
            password: password
        });
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("username", response.data.name)
        console.log(response.data);

        // fetch("http://localhost:8080/api/v1/user/authenticate", {
        //     method: 'GET',
        //     headers: headers,
        // })
        //     .then(data => data.json())
        //     .then(json => () => localStorage.setItem("jwtToken", json.token)
        //     )
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}