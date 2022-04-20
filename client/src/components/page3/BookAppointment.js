import React, { useState, useEffect } from "react";
import axios from "axios";
import Doctorcard from "./Doctorcard";
import { useHistory } from "react-router-dom";

const BookAppointment = () => {
  const [doctor, setDoctor] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:8000/doctorlist")
    .then(res =>{ 
      setDoctor(res.data);
      // console.log(doctor);
    })
    .catch(err => console.log(err));

    
    var user = localStorage.getItem("id");
    console.log(user);
    if(user == 1){
        history.push("/");
    }
  }, []);

  return (
    <div>
      <p className="tex-center"> Book your Appointment </p>
      <div class="row m-auto" style={{ width: "90vw" }}>
        {doctor.users
          ? doctor.users.map((doctor,key) => {
              return <Doctorcard key={key} fname={doctor.fname} lname={doctor.lname} email={doctor.email} id={doctor._id} />;
            })
          : null}
      </div>
    </div>
  );
};

export default BookAppointment;
