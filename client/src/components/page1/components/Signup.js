import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

export const Form = React.createContext();
const Signup = () => {
    let history = useHistory();
    const [user, setUser] = useState({ email: "", fname: "", lname: "", password: "", type: "patient", gender:"male" })
    const handleChange = e => {
        console.log(e.target.name)
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    }
    const [items, setItems] = useState([]);
 
  // handle click event of the button to add item
  const submit = (e) => {
      e.preventDefault();
    setItems(prevItems => [...prevItems, {
      id: prevItems.length,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
      type: user.type,
      gender:user.gender
    }]);
      
      console.log(user);
    
    axios.post('http://localhost:8000/success', { items : user})
    .then(res => { 
            console.log(res);
        })
    .catch(err => console.log(err));
      
    history.push("/dashboard");
  }
    return (
        <div>
            {/* <ul>{listItems}</ul> */}
            <form className="w-50 m-auto border p-4 mt-5">
                {/* <span>{quotes.text}</span> */}
                <h4 className="text-decoration-underline text-center">Sign Up</h4>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">First Name</label>
                    <input type="text" name="fname" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.fname} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Last Name</label>
                    <input type="text" name="lname" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.lname} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} onChange={handleChange} />
                </div>
                <div className="d-flex w-50 justify-content-between">
                    <div class="form-check">
                        <input class="form-check-input" name="" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => setUser(prevUser => ({ ...prevUser, ["type"]: "patient" }))} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            Patient
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => setUser(prevUser => ({ ...prevUser, ["type"]: "doctor" }))} />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Doctor
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={user.password} onChange={handleChange} />
                </div>
                <button className="btn btn-success btn-block w-100" onClick={submit}>Submit</button>
                <pre>{JSON.stringify(items, null, 2)}</pre>
            </form>
            {/* <Form.Provider value={{items}}></Form.Provider> */}
        </div>
    );
}

export default Signup;