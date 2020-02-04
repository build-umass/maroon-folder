import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import app from "../../firebase/base";

class Admin extends Component {
    removeUser = dbRef => {
        let db = app.firestore();
        db.collection("users")
            .doc(dbRef)
            .set({ role: 0 }, { merge: true });
        this.props.deactivateUser(dbRef);
    };

    render() {
        return (
            <Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th style={middle}>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th style={middle}>Role</th>
                        <th style={middle}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.users)
                        .reverse()
                        .filter(u => {
                            if (this.props.users[u].role > 0) {
                                return true;
                            } else return false;
                        })
                        .map((u, i) => {
                            let user = this.props.users[u];
                            return (
                                <tr>
                                    <td style={middle}>{++i}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td style={middle}>{user.role}</td>
                                    <td style={middle}>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => {
                                                this.removeUser(u);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        );
    }
}

const middle = {
    textAlign: "center"
};

export default Admin;
