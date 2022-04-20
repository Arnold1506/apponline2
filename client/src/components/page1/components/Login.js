import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    let history = useHistory();
    const [user, setUser] = useState({ email: "",password: ""})
    const handleChange = e => {
        console.log(e.target.name);
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    }
    function submit(e){
        e.preventDefault();
        let message = '';
        
        localStorage.setItem("id", "1");
        axios.post('http://localhost:8000/login', { items : user})
        .then(res => { 
                message = res.data;
                console.log(res.data);
                if(message.mes == "mee"){
                        alert("Wrong Email/Password");
                }
                else{
                    console.log('message');
                    console.log(message[0].userType);
                    // console.log("sda");
                    localStorage.setItem("id", message[0]._id);
                    localStorage.setItem("email", message[0].email);
                    localStorage.setItem("fname", message[0].fname);
                    localStorage.setItem("lname", message[0].lname);
                    alert(1);
                    if(message[0].userType == 'doctor'){
                        console.log("doctor");
                        history.push("/doctordashboard");
                        window.location.reload(true);
                    }
                    else{
                        console.log("patient");
                        history.push("/dashboard");
                        window.location.reload(true);
                        
                    }
                }
                
            })
        .catch(err => console.log(err));        
    }
    return (
        <div>
            <form className="w-50 m-auto border p-4 mt-5">
                <h4 className="text-decoration-underline text-center">Log In</h4>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={user.password} onChange={handleChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                </div>
                <button className="btn btn-success" onClick={submit}>Submit</button>
            </form>
        </div>
    );
}

export default Login;


