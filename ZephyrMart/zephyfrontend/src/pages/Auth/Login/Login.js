import React from "react";
import "./Login.css";
import Layout from "../../../components/Layout/Layout";
import axios from 'axios';
import {useState} from 'react';

import {useNavigate} from 'react-router-dom'
import { useAuth } from "../../../context/auth";
import { useLocation } from "react-router-dom";
import {toast} from 'react-hot-toast'

import {Link} from 'react-router-dom'
function Login() {
  const [login,setLogin] = useState({
    'email':'',
    'password':'',
  })
  const [loading,setLoading] = useState(false)
  const [auth,setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const onChange=(e)=>{
    e.preventDefault();
    setLogin({...login,[e.target.name]:e.target.value})
    console.log(login)


  }
  const handleOnLogin = async(e)=>{
    e.preventDefault();
    try{
      console.log(login)
      setLoading(true);
      const res = await axios.post("http://localhost:4000/api/v1/auth/login",login)
      
      if(res.data.success){
        setLoading(false)
        toast.success("Successfully Login")
        
        localStorage.setItem("auth",JSON.stringify(res.data))
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        console.log("authdata",auth)
        navigate(location.state||'/');
      }else{
        setLoading(false)
        toast.error("Error SomeThing wrong")
      }
    }
    catch(error){
      setLoading(false)
        toast.error("Error SomeThing went wrong")
        console.log(error)
    }
  }
  return (
    <>
    <div>
      <Layout>
        <div className="container">
          <div className="form-container">
          {
            loading?(<>
                <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </>):(<>
                
            </>)
          }
            <h3>Login</h3>
            <form onSubmit={(e)=>handleOnLogin(e)}>
              
              <div class="mb-3">
                <label class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  name='email'
                  value={login.email}
                  onChange = {(e)=>onChange(e)}
                  
                />
              </div>
             
              <div class="mb-3">
                <label class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  name='password'
                  value={login.password}
                  onChange = {(e)=>onChange(e)}
                  
                />
              </div>
              
             
              
              
              
              
              <button type="submit" class="btn btn-primary form-control">
                Submit
              </button>
              
              
            </form>
          </div>
        </div>
      </Layout>
    
      
    </div>
    </>  );
}

export default Login;
