import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientsList from './PatientsList';

const DoctorSlotModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let id = props.id;
    let mail = props.mail;
    let gmail = props.email;
    let stime = props.stime;
    let etime = props.etime;
    let date = props.date;
    let fname = props.fname;
    let lname = props.lname;
    let slotStyle = {
        border: '1px solid #16DEEC',
        padding: '10px',
        color: '#044B67',
        backgroundColor: 'White',
        width: '10%',
        margin: '10px'
    };
    

    //Database
    // slotId --> get patient Id-->
    // Through Patient Id get name
    return (
        <div>
            <Button variant="primary" style={slotStyle} class="btn btn-primary bg-light" onClick={handleShow}>
                {stime} - {etime}
            </Button>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>List Of Patients at {stime} - {etime} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <PatientsList id={id} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DoctorSlotModal;