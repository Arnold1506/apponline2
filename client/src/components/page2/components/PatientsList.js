import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function PatientsList(props) {
    let slotId = props.id;
        const [pat, setPat] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8000/patientslist", { items : slotId})
        .then(res => { 
            setPat(res.data);
            // console.log(res.data);
            // console.log(pat);
        })
    .catch(err => console.log(err));
    }, [])

    return (
        <div>
            {pat
          ? pat.map((user,key) => {
              return <div> { user.fname }  {user.lname} </div>
            })
          : null}
        </div>
    )
}

