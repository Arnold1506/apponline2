import './App.css';
import Header from './components/base/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Page1 from './components/page1/Page1';
import Page2 from './components/page2/Page2';
import Login from './components/page1/components/Login';
import Signup from './components/page1/components/Signup';
import Dashboard from './components/page2/components/Dashboard';
import BookAppointment from './components/page3/BookAppointment';
import React, { useState } from 'react';
import Doctordashboard from './components/page2/components/Doctordashboard';
import Test from './components/base/Test';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Logout from './components/base/Logout';
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Logout />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/doctordashboard">
            <Doctordashboard />
          </Route>
          <Route exact path="/dashboard/bookappointment">
            <BookAppointment />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
