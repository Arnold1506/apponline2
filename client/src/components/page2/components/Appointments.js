import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios"
import "./Dashboard.css";
import { RiDeleteBinFill } from "react-icons/ri";
import PastAppointments from './PastAppointments';
import ScheduledAppointments from './ScheduledAppointments';

export default function Appointments() {

    //In local Storage there is patients id
    //through which we can find list of slots of patients in slots collection
    //further in slots collection there is id which is schedules id
    //in that we get users email and further we can find through user collection  
    return (
        <div>
            <p>Your Appointments</p>
            <div >
                <div id="schedule"><ScheduledAppointments /></div>
                <div id="past"><PastAppointments /></div>

            </div>
        </div>
    )
}
