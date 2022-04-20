import React, {useContext} from 'react';
import './Dashboard.css';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from '../../page1/components/Signup';
import { createContext } from 'react';
import axios from 'axios';
import Logout from '../../base/Logout';
import Appointments from './Appointments';
import Name from '../../base/Name';


const Dashboard = () => {
    const [email, setEmail] = useState("");
    let history = useHistory();
    // axios.get("http://localhost:8000/success")
    // .then((response) => {
    //     console.log(response.data);
    //     console.log(response.status);
    //     console.log(response.statusText);
    //     console.log(response.headers);
    //     console.log(response.config);
    //   });
    useEffect(() => {
        var user = localStorage.getItem("id");
        console.log(user);
        if(user == 1){
            history.push("/");
        }
    }, [])

    function bookAppointment(){
        history.push("/dashboard/bookappointment");
        
    }
    const user = createContext(null);
    const context = useContext(user);
    return (

        <div className="d-grid gap-3 text-center mt-4">
            <Name />
            <button type="button" onClick={bookAppointment} class="btn btn-primary w-50 m-auto">Book an Appointment</button>
            <div>
                <Appointments />
            </div>
        </div>
    );
}

export default Dashboard;
