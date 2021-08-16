import { Form, Button} from "react-bootstrap";

function LoginForm() {
    return <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <p>New here? <a href={''}>Register!</a></p>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
}

export default LoginForm;