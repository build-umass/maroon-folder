import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    // console.log(currentUser);

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            redirect: { prev: window.origin }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
