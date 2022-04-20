import React from 'react';
import { useEffect, useState } from 'react';
import "./Dashboard.css";
import axios from "axios"
import { MdDone } from "react-icons/md";


export default function PastAppointments() {
    const [email, setEmail] = useState(localStorage.getItem("id"));
    const [slots, setSlots] = useState();

    useEffect(() => {
        axios.post('http://localhost:8000/pastappointments', { items: email })
            .then(res => {
                setSlots(res.data);
                console.log(res);
            })
            .catch(err => console.log(err));

    }, []);

    return (
        <div>
            <div>
                {slots
                    ? slots.map((slot, key) => {
                        return (
                            <div className="list" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 2fr 0.1fr", justifyItems: "start", border:"1px solid green" }}>
                                <div className="m-1 me-5">Dr. {slot.fname} {slot.lname} </div>
                                <div className="m-1 me-5">{slot.date} </div>
                                <div className="m-1 me-5">
                                    {(slot.starttime) < "12" ? (slot.starttime) + " AM - " : (parseInt(slot.starttime) - 12) + ":00 PM - "}
                                    {(slot.endtime) < "12" ? (slot.endtime) + " AM " : (parseInt(slot.endtime) - 12) + ":00 PM "}

                                </div>
                                <div><span className="w-25"style={{color:"green"}} > <MdDone /> </span></div>
                            </div>

                        )

                    })
                    : <div> <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </div>
                }
            </div>
        </div>
    )
}
