import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";
import { Alert, Button } from "@mui/material";

const Login = () => {
  const [user, setUser] = useState({
    email:'',
    password:''
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
      let res = await axios.post(`${API_BASE_URL}/users/login`, user);
      if(res?.data?.length > 0 ){
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
      <h4>Login Here</h4>
      {error &&  <Alert variant="filled" severity="error">Please provide valid credentials</Alert> }
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
      <Button  variant="contained" onClick={handleClick}>Log In</Button>
      <span>Not a registered user ? <Link to="/register">Click here</Link></span>
    </div>
  );
};

export default Login;
