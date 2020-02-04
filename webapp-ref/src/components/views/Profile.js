import React, { Component } from "react";
import app from "../../firebase/base";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Menu from "./Nav";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";

class Profile extends Component {
    state = {
        showUpdate: false
    };

    getFile = e => {
        console.log(e.target.files[0]);
        this.setState({ file: e.target.files[0] });
    };

    uploadFile = () => {
        console.log(this.state.file.name);
        const image = this.state.file;
        const storage = app.storage();

        if (this.state.imgSrc) {
            console.log("del test");
            storage
                .ref()
                .child(`userImages/${this.state.uid}`)
                .delete();
        }

        storage
            .ref(`userImages/${this.state.uid}`)
            .put(image)
            .then(() => {
                var img = storage.ref().child(`userImages/${this.state.uid}`);
                img.getDownloadURL().then(url => {
                    this.setState({ imgSrc: url });
                    let db = app.firestore();

                    db.collection("users")
                        .doc(this.state.dbRef)
                        .set(
                            {
                                imgSrc: this.state.imgSrc
                            },
                            { merge: true }
                        );
                });
            });
    };

    passwordReset = () => {
        const auth = app.auth();
        auth.sendPasswordResetEmail(this.state.email)
            .then(function() {
                // Email sent.
                console.log("reset email sent");
            })
            .catch(function(error) {
                // An error happened.
                console.log(error);
            });
    };

    updateFieldInDB = (value, field) => {
        let db = app.firestore();
        if (field === "name") {
            db.collection("users")
                .doc(this.state.dbRef)
                .set(
                    {
                        name: value
                    },
                    { merge: true }
                );
        }
        if (field === "email") {
            db.collection("users")
                .doc(this.state.dbRef)
                .set(
                    {
                        email: value
                    },
                    { merge: true }
                );
        }
        if (field === "yog") {
            db.collection("users")
                .doc(this.state.dbRef)
                .set(
                    {
                        yog: value
                    },
                    { merge: true }
                );
        }
        if (field === "github") {
            db.collection("users")
                .doc(this.state.dbRef)
                .set(
                    {
                        github: value
                    },
                    { merge: true }
                );
        }
        if (field === "bio") {
            db.collection("users")
                .doc(this.state.dbRef)
                .set(
                    {
                        bio: value
                    },
                    { merge: true }
                );
        }
        // Flash Update
        this.setState({ showUpdate: true });
        this.delay(3000).then(() => {
            this.setState({ showUpdate: false });
        });
    };

    // Helper function to hold modal for certain amount of time
    delay = ms => new Promise(res => setTimeout(res, ms));

    componentWillMount = () => {
        this.setState(this.props.location.state);
    };

    render() {
        return (
            <>
                <Menu />

                <Container>
                    {this.state.showUpdate ? (
                        <Alert
                            variant="primary"
                            onClose={() => this.setState({ showUpdate: false })}
                            dismissible
                        >
                            Information Updated!
                        </Alert>
                    ) : (
                        <div></div>
                    )}
                    <div style={{ marginTop: "1em" }}>
                        <Row>
                            <Col style={middle}>
                                <Image
                                    src={this.state.imgSrc || "/img/pp.jpg"}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "cover"
                                    }}
                                    roundedCircle
                                    thumbnail
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "1em" }}>
                            <Col>
                                <h3>Welcome, {this.state.name}!</h3>
                            </Col>
                        </Row>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle
                                        as={Button}
                                        variant="link"
                                        eventKey="0"
                                    >
                                        <h4>Basic Info</h4>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">
                                                            Name
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        value={this.state.name}
                                                        aria-label="Username"
                                                        aria-describedby="basic-addon1"
                                                        onChange={e => {
                                                            this.setState({
                                                                name:
                                                                    e.target
                                                                        .value
                                                            });
                                                        }}
                                                    />
                                                    <InputGroup.Append>
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={() => {
                                                                this.updateFieldInDB(
                                                                    this.state
                                                                        .name,
                                                                    "name"
                                                                );
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">
                                                            Email
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        value={this.state.email}
                                                        aria-label="Email"
                                                        aria-describedby="basic-addon1"
                                                        onChange={e => {
                                                            this.setState({
                                                                email:
                                                                    e.target
                                                                        .value
                                                            });
                                                        }}
                                                    />
                                                    <InputGroup.Append>
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={() => {
                                                                this.updateFieldInDB(
                                                                    this.state
                                                                        .email,
                                                                    "email"
                                                                );
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">
                                                            Year of Grad
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        value={
                                                            this.state.yog || ""
                                                        }
                                                        type="month"
                                                        aria-label="Username"
                                                        aria-describedby="basic-addon1"
                                                        onChange={e => {
                                                            console.log(
                                                                e.target.value
                                                            );
                                                            this.setState({
                                                                yog:
                                                                    e.target
                                                                        .value
                                                            });
                                                        }}
                                                    />
                                                    <InputGroup.Append>
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={() => {
                                                                this.updateFieldInDB(
                                                                    this.state
                                                                        .yog,
                                                                    "yog"
                                                                );
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">
                                                            Github
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        value={
                                                            this.state.github ||
                                                            ""
                                                        }
                                                        placeholder="Enter your username"
                                                        aria-label="Username"
                                                        aria-describedby="basic-addon1"
                                                        onChange={e => {
                                                            this.setState({
                                                                github:
                                                                    e.target
                                                                        .value
                                                            });
                                                        }}
                                                    />
                                                    <InputGroup.Append>
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={() => {
                                                                this.updateFieldInDB(
                                                                    this.state
                                                                        .github,
                                                                    "github"
                                                                );
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle
                                        as={Button}
                                        variant="link"
                                        eventKey="1"
                                    >
                                        <h4>Bio</h4>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <InputGroup
                                            style={{ marginBottom: "10px" }}
                                        >
                                            <FormControl
                                                as="textarea"
                                                aria-label="With textarea"
                                                rows="2"
                                                value={this.state.bio || ""}
                                                placeholder="Enter your bio for the website"
                                                onChange={e => {
                                                    this.setState({
                                                        bio: e.target.value
                                                    });
                                                }}
                                            />
                                        </InputGroup>

                                        <Button
                                            variant="outline-primary"
                                            onClick={() => {
                                                this.updateFieldInDB(
                                                    this.state.bio,
                                                    "bio"
                                                );
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle
                                        as={Button}
                                        variant="link"
                                        eventKey="2"
                                    >
                                        <h4>Settings</h4>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <h5>Update Photo</h5>
                                        <input
                                            type="file"
                                            id="inputGroupFile"
                                            onChange={this.getFile}
                                        />
                                        <Button
                                            variant="primary"
                                            onClick={this.uploadFile}
                                        >
                                            Upload
                                        </Button>
                                        <br />
                                        <br />
                                        <h5>Account Settings</h5>
                                        <Row>
                                            <Col md={3}>
                                                <Button
                                                    variant="primary"
                                                    onClick={this.passwordReset}
                                                >
                                                    Reset Password
                                                </Button>
                                            </Col>
                                            <Col md={3}>
                                                <Button variant="danger">
                                                    Delete Account
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </Container>
            </>
        );
    }
}

const middle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default Profile;
