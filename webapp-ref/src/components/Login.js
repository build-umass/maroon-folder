import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../firebase/base.js";
import { AuthContext } from "../firebase/Auth.js";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        // if(this)
        // console.log(this.state.location.redirect);
        let path = "";
        // if (this) {
        //     if (this.state.location.redirect) {
        //         let temp = this.state.location.redirect.split("/");
        //         path += temp[temp.length - 1];
        //     }
        // }

        return <Redirect to={"/" + path} />;
    }

    return (
        <Container style={middle}>
            <Card style={{ width: "30em" }}>
                <Card.Body>
                    <h1>Log in</h1>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ marginRight: "10px" }}
                        >
                            Submit
                        </Button>
                        <Link to="/signup">
                            <Button
                                variant="secondary"
                                component={Link}
                                to="signup"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

const middle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default withRouter(Login);
