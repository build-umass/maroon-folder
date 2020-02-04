import React, { Component } from "react";
import app from "../../firebase/base";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Home extends Component {
    render() {
        return (
            <Container style={middle}>
                <div style={{ width: "30em" }}>
                    <Row>
                        <Col>
                            <h3>Welcome, {this.props.name}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Thank you for making an account!</p>
                            <p>
                                Your account has not been approved as a member
                                yet.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                onClick={() => app.auth().signOut()}
                            >
                                Sign out
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

const middle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default Home;
