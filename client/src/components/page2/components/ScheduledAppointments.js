import React from 'react'
import { useEffect, useState } from 'react';
import "./Dashboard.css";
import { FcCalendar } from "react-icons/fc";
import {ImCancelCircle} from "react-icons/im"
import axios from "axios"

export default function ScheduledAppointments() {
    const [email, setEmail] = useState(localStorage.getItem("id"));
    const [slots, setSlots] = useState();
    function submit(e){
        e.preventDefault();
        console.log("ahajjk");
        axios.post('http://localhost:8000/delete', { items:email })
        .then(res => {
            alert("deleted");
        })
        .catch(err => console.log(err));

        window.location.reload(true);
    }

    useEffect(() => {
        axios.post('http://localhost:8000/appointments', { items: email })
            .then(res => {
                setSlots(res.data);
                console.log(res);
            })
            .catch(err => console.log(err));

    }, []);
    return (
        <div>
            {slots
                    ? slots.map((slot, key) => {
                        return (
                            <div className = "list" style={{display:"grid", gridTemplateColumns: "1.5fr 1.5fr 1.8fr 0.3fr 0.2fr", justifyItems: "start"}}>
                                <div className="m-1 me-5">Dr. {slot.fname} {slot.lname} </div>
                                <div className="m-1 me-5">{slot.date} </div>
                                <div className="m-1 me-5">
                                 {(slot.starttime) < "12" ?  (slot.starttime)+" AM - " :  ( parseInt(slot.starttime) - 12) + ":00 PM - "  }
                                 {(slot.endtime) < "12" ?  (slot.endtime)+" AM " :  ( parseInt(slot.endtime) - 12) + ":00 PM "  }
                                 
                                 </div>
                                 <div >
                                 <span className="w-25"> <FcCalendar /> </span>
                                 </div>
                                 <div>
                                 <span className="w-25" onClick={submit}> <ImCancelCircle /> </span>
                                 </div>
                            </div>

                        )

                    })
                    : <div> <div class="spinner-border text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                    </div>
                }
        </div>
    )
}
