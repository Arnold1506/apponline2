import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
const SlotModal = (props) => {
  let id = props.id;
  let mail = props.mail;
  let gmail = props.email;
  let stime = props.stime;
  let etime = props.etime;
  let date = props.date;
  let fname = props.fname;
  let lname = props.lname;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();
  let slotStyle = {
    border: '1px solid #16DEEC',
    padding: '10px',
    color: '#044B67',
    backgroundColor: 'White',
    width: '100%'
  };

  const [slot, setSlot] = useState({id: id, patientId: localStorage.getItem("id"), stime: stime, etime: etime });

  function SubmitSlot(e){
    e.preventDefault();
    
    axios.post('http://localhost:8000/slotbooking', {items : slot})
    .then(res => {
      
    })
    .catch(err => console.log(err));
    alert("Appointment Booked");
    history.push("/dashboard");

  }
  return (
    <div >
      <Button variant="primary" style={slotStyle} class="btn btn-primary bg-light" onClick={handleShow}>
        {stime} - {etime}
      </Button>

      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dr. {fname} {lname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Booking For Appointment at : {stime} - {etime}
          <br></br>
          <button type="button" class="btn btn-success w-25 mt-2" onClick={SubmitSlot} >Book</button></Modal.Body>
      </Modal>
    </div>
  );
}

export default SlotModal;

