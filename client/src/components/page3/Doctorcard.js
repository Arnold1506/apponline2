import defaultimg from "./default.jpg";
import './Doctorcard.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import SlotModal from "./SlotModal";

const Doctorcard = (props) => {
    var fname = props.fname;
    var lname = props.lname;
    var mail = props.email;
    var id = props.id;
    const [email, setEmail] = useState(mail);
    const [slots, setSlots] = useState();
    let slotStyle = {
        border: '1px solid #16DEEC',
        padding: '10px',
        color: '#044B67',
        width: '50%'
    };
    useEffect(() => {
        axios.post("http://localhost:8000/slot", { email })
            .then(res => {
                setSlots(res.data.schedules);
                console.log(res.data);
                // console.log(slot.schedules);
                console.log(email);
            })
            .catch(err => console.log(err));
        console.log(slots);
    }, [])
    return (
        <div>
            <div class="col" id="doctorimg">
                <div class="card h-100 d-flex flex-row">
                    <img src={defaultimg} class="card-img-top" alt="..." />
                    <div class="card-body d-flex justify-content-between">
                        <div>
                            <h5 class="card-title">Dr. {fname} {lname}</h5>
                            <p class="card-text">
                                Specialization & address
                            </p>
                            <div class="d-flex gap-2">
                            {slots
                            ? slots.map((slot, key) => {
                                    return (
                                        <div >
                                            <SlotModal key={key} date={slot.date} stime={slot.stime} etime={slot.etime} email={slot.email} mail={mail} fname={fname} lname={lname} id={slot._id} />
                                        </div>
                                    )

                                })
                                : null}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctorcard;
