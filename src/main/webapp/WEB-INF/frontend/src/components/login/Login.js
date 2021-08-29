import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {
    Row,
    Col,
    Card,
    Form,
    InputGroup,
    FormControl,
    Button,
    Alert
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSignInAlt,
    faEnvelope,
    faLock,
    faUndo
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// import { authenticateUser } from "../../services/index";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

const LoginFormJwt = () => {
    const [error, setError] = useState()
    const [show, setShow] = useState(true);


    const loginRequest = () => {
        return {
            type: LOGIN_REQUEST
        };
    };


    const authenticateUser = (email, password) => async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/authenticate", {
                email: email,
                password: password
            });
            localStorage.setItem("jwtToken", response.data.token);
            dispatch(success({username: response.data.name, isLoggedIn: true}));
            return Promise.resolve(response.data);
        } catch (error) {
            dispatch(failure());
            return Promise.reject(error);
        }
    };

    const success = (isLoggedIn) => {
        return {
            type: SUCCESS,
            payload: isLoggedIn
        };
    };

    const failure = () => {
        return {
            type: FAILURE,
            payload: false
        };
    }

    const message = "alma"


    const initialState = {
        email: "",
        password: ""
    };
    const [user, setUser] = useState(initialState);

    const credentialChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const dispatch = useDispatch();

    const validateUser = () => {
        dispatch(authenticateUser(user.email, user.password))
            .then((response) => {
                console.log(response.data);
                return this.history.push("/home");
            })
            .catch((error) => {
                console.log(error.message);
                setShow(true);
                resetLoginForm();
                setError("Invalid email and password");
            });
    };

    const resetLoginForm = () => {
        setUser(initialState);
    };

    return (
        <Row className="justify-content-md-center">
            <Col xs={5}>
                {show && message && (
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        {message}
                    </Alert>
                )}
                {show && error && (
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        {error}
                    </Alert>
                )}
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faSignInAlt}/> Login
                    </Card.Header>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={credentialChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Email Address"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faLock}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        required
                                        autoComplete="off"
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={credentialChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Password"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{textAlign: "right"}}>
                        <Button
                            size="sm"
                            type="button"
                            variant="success"
                            onClick={validateUser}
                            disabled={user.email.length === 0 || user.password.length === 0}
                        >
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Button>{" "}
                        <Button
                            size="sm"
                            type="button"
                            variant="info"
                            onClick={resetLoginForm}
                            disabled={user.email.length === 0 && user.password.length === 0}
                        >
                            <FontAwesomeIcon icon={faUndo}/> Reset
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );

}

export default LoginFormJwt;