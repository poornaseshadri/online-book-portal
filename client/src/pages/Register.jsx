import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";
import { Button } from "@mui/material";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword:""
  });
  const [error,setError] = useState(false)
  useEffect(()=>{
    sessionStorage.setItem('userId','');
  },[])
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let res =  await axios.post(`${API_BASE_URL}/users/register`, user);
      if(res?.data?.affectedRows > 0 ){
        sessionStorage.setItem('userId',user?.email);
        navigate("/home");
      }
      else
      setError(true);
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>OG Book Store</h1>
      <h4>Register here</h4>
      {error &&  <div className='errorAlert'>Something went wrong! Please try again later</div> }
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
      />
      <Button onClick={handleClick}>Register</Button>
      <span>Already registered ? <Link to="/">Click here</Link></span>
    </div>
  );
};

export default Register;
