import React, { useContext } from 'react';
import './Dashboard.css';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createContext } from 'react';
import axios from 'axios';
import DatetimeRangePicker from 'react-datetime-range-picker';
import './Time.js';
import DoctotSlot from './DoctotSlot';
import Name from '../../base/Name';

import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Doctordashboard = () => {
    const [schedule, setschedule] = useState([]);
    let history = useHistory();
    let mail = localStorage.getItem("email");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [scheduler, setScheduler] = useState({ email: mail, date: "", stime: "", etime: "" })
    const handleChange = e => {
        console.log(e.target.name);
        setScheduler(prevSchedule => ({ ...prevSchedule, [e.target.name]: e.target.value }));
    }
    useEffect(() => {
        var user = localStorage.getItem("id");
        console.log(user);
        if(user == 1){
            history.push("/login");
        }
    }, [])
    function submit(e) {
        e.preventDefault();
        
        setschedule(prevSchedule => [...prevSchedule, {
            email: scheduler.email,
            date: scheduler.date,
            stime: scheduler.stime,
            etime: scheduler.etime
        }]);
        axios.post('http://localhost:8000/schedule', { schedule: scheduler })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        window.location.reload(true);
    }

    //For Doctors list of slots and patients
    
    return (
        <div className="d-grid gap-3 text-center mt-4">
            <Name />
            <div class="w-100 m-auto">
            <Button class="btn btn-info w-50 " onClick={handleShow}>
                Choose Your Appointment
            </Button>
            </div>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Your Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="md-form d-flex flex-row">
                                <div className="d-inline-block"> <input value={scheduler.date} name="date" onChange={handleChange} type="date" /></div>
                                <div className="ms-3 d-inline-block"> <span>From</span> <input name="stime" value={scheduler.stime} onChange={handleChange} type="time" />
                                    <span className="ms-3 me-1">To</span><input value={scheduler.etime} name="etime" onChange={handleChange} type="time" /></div>
                            </div>
                            <button className="btn btn-success" onClick={submit}>Submit</button>
                </Modal.Body>
            </Modal>
            <div >
                <DoctotSlot />
            </div>
        </div >

    );
}

export default Doctordashboard;
