import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Login from './components/Login';
import Signup from './components/Signup';

const Page1 = () => {
    return (
        <div>
            <Router>
                <Switch>
                <Route exact path = "/login">
                    <Login/>
                </Route>
                <Route exact path="/signup">
                    <Signup/>
                </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Page1;
