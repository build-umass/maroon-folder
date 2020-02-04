import React, { Component } from "react";
import app from "../../firebase/base";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class Navigation extends Component {
    render() {
        return (
            <>
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand href="#home">BUILD UMass</Navbar.Brand>

                        <div className="navbar-right">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link>
                                        <Link to="/">Users</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/apps">Applications</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link
                                            to={{
                                                pathname: "/profile",
                                                state: this.props.state
                                            }}
                                        >
                                            Your Profile
                                        </Link>
                                    </Nav.Link>

                                    <Button
                                        variant="outline-primary"
                                        onClick={() => app.auth().signOut()}
                                    >
                                        Sign out
                                    </Button>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default Navigation;
