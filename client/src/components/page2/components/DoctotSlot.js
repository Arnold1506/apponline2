import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorSlotModal from "./DoctorSlotModal";


export default function DoctotSlot(props) {
    let mail = localStorage.getItem("email");
    const [email, setEmail] = useState(mail);
    const [slots, setSlots] = useState();
    let slotStyle = {
        border: '1px solid #16DEEC',
        padding: '10px',
        color: '#044B67',
        width: '%',
        borderRadius: '0.3rem',
        margin: '10px'
    };
    useEffect(() => {
        axios.post("http://localhost:8000/slot", { email })
            .then(res => {
                setSlots(res.data.schedules);
                console.log(res.data);
                // console.log(slot.schedules);
                // console.log(email);
            })
            .catch(err => console.log(err));
        console.log(slots);
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div >
            {slots
                ? slots.map((slot, key) => {
                    return (
                        <div >
                            <DoctorSlotModal key={key} date={slot.date} stime={slot.stime} etime={slot.etime} email={slot.email} mail={mail} id={slot._id} />
                        </div>

                    )

                })
                : null}
        </div>
    )
}
