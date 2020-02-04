import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../firebase/base";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(
        async event => {
            event.preventDefault();
            const { name, email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(
                        email.value,
                        password.value
                    );

                let db = app.firestore();

                db.collection("users")
                    .add({
                        name: name.value,
                        email: email.value,
                        role: 2,
                        uid: app.auth().currentUser.uid
                    })
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });

                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    return (
        <Container style={middle}>
            <Card style={{ width: "30em" }}>
                <Card.Body>
                    <h1>Sign Up</h1>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                type="name"
                                placeholder="Enter your name"
                            />
                        </Form.Group>
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
                            Sign Up
                        </Button>
                        <Link to="/login">
                            <Button variant="secondary">Log In</Button>
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

export default withRouter(SignUp);
