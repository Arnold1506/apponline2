import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Name() {
    const [slots, setSlots] = useState([]);
    // let doctor,fname,lname;
    const [doctor, setdoctor] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    useEffect(() => {
        let mail = localStorage.getItem("email");
        
        axios.post('http://localhost:8000/name', { items: mail })
        .then(res => {
            setSlots(res.data[0]);
            console.log(res.data[0].userType);
            setdoctor(res.data[0].userType);
            setFirstname(res.data[0].fname);
            setLastname(res.data[0].lname);
            // console.log(fname);
        })
        .catch(err => console.log(err));

    }, [])
    return (
        <div className="d-flex m-auto">
            <div>Welcome </div>
            <div className="text-lg ms-2">
            {
                doctor=="doctor"
                ? <div> Dr. </div>
                : null
            }
            </div>
            <div className="ms-2">
            {firstname}  {lastname}
            </div>
        </div>
    )
}


