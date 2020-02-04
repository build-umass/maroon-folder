import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import app from "../../firebase/base";

class UserTable extends Component {
    addUser = dbRef => {
        let db = app.firestore();
        db.collection("users")
            .doc(dbRef)
            .set({ role: 1 }, { merge: true });
        this.props.updateUserRole(dbRef);
    };

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={middle}>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th style={middle}>Role</th>
                        <th style={middle}>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.users)
                        .reverse()
                        .filter(u => {
                            if (this.props.users[u].role === 0) {
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
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => {
                                                this.addUser(u);
                                            }}
                                        >
                                            Add
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

export default UserTable;
