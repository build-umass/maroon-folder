import React, { Component } from "react";
import app from "../firebase/base";

import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
import Admin from "./views/Admin";
import BasicLanding from "./views/BasicLanding";

import Spinner from "react-bootstrap/Spinner";

import { AuthContext } from "../firebase/Auth";

export default class Landing extends Component {
    render() {
        return (
            <AuthContext.Consumer>
                {value => <Home user={value.currentUser.uid} />}
            </AuthContext.Consumer>
        );
    }
}

class Home extends Component {
    state = {
        name: "",
        uid: this.props.user,
        role: "",
        loading: true
    };

    componentWillMount = () => {
        let db = app.firestore();
        db.collection("users")
            .where("uid", "==", this.props.user)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                } else {
                    console.log(snapshot.docs[0].id);
                    this.setState(snapshot.docs[0].data());
                    this.setState({
                        loading: false,
                        dbRef: snapshot.docs[0].id
                    });
                }
            });
        // let user = app.auth().currentUser;
        // user.updateProfile({
        //     role: 1
        // }).then(() => {
        //     console.log(app.auth().currentUser);
        // });
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
        if (this.state.role > 0) {
            return <Admin state={this.state} />;
        } else {
            return <BasicLanding name={this.state.name} />;
        }
    }
}

const middle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};
