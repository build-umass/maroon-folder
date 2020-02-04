import React, { Component } from "react";
import "./style/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from "./util/PrivateRoute";

import Profile from "./components/views/Profile";

class App extends Component {
    render() {
        return (
            <AuthProvider>
                <Router>
                    <div>
                        <Switch>
                            <PrivateRoute exact path="/" component={Landing} />
                            <PrivateRoute
                                exact
                                path="/profile"
                                component={Profile}
                            />
                            <Route
                                exact
                                path="/login"
                                name={console.log}
                                render={props => (
                                    <Login text="Hello, " {...props} />
                                )}
                                // component={Login}
                            />
                            <Route exact path="/signup" component={SignUp} />
                        </Switch>
                    </div>
                </Router>
            </AuthProvider>
        );
    }
}

export default App;
