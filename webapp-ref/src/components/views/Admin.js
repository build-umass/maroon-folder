import React, { Component } from "react";
import app from "../../firebase/base";

import Container from "react-bootstrap/Container";
import Menu from "./Nav";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

import MemberTable from "../tables/MemberTable";
import UserTable from "../tables/UserTable";

class Admin extends Component {
    state = {
        users: {},
        loading: true,
        memberTab: true
    };

    componentWillMount = () => {
        let db = app.firestore();
        db.collection("users")
            .get()
            .then(snapshot => {
                let users = {};
                snapshot.forEach(doc => {
                    users[doc.id] = doc.data();
                    this.setState({ loading: false });
                });
                this.setState({ users: users });
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });
    };

    updateTab = () => {
        this.setState({ memberTab: !this.state.memberTab });
    };

    updateUserRole = dbRef => {
        let temp = this.state.users;
        temp[dbRef].role = 1;
        this.setState({ users: temp });
    };

    deactivateUser = dbRef => {
        let temp = this.state.users;
        temp[dbRef].role = 0;
        this.setState({ users: temp });
    };

    render() {
        if (this.state.loading) {
            return (
                <Container style={middle}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            );
        }
        return (
            <>
                <Menu state={this.props.state} />
                <Container>
                    <div style={{ marginTop: "1em" }}>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="members"
                                    onSelect={this.updateTab}
                                    active={this.state.memberTab}
                                >
                                    Members
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="users"
                                    onSelect={this.updateTab}
                                    active={!this.state.memberTab}
                                >
                                    Users
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    {this.state.memberTab ? (
                        <div style={{ marginTop: "1em" }}>
                            <h4>Current Members</h4>
                            <MemberTable
                                users={this.state.users}
                                deactivateUser={this.deactivateUser}
                            />
                        </div>
                    ) : (
                        <div style={{ marginTop: "1em" }}>
                            <h4>Members Requests</h4>
                            <UserTable
                                users={this.state.users}
                                updateUserRole={this.updateUserRole}
                            />
                        </div>
                    )}
                </Container>
            </>
        );
    }
}

const middle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default Admin;
