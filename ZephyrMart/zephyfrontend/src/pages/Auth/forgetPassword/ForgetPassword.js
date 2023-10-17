import React from "react";
import "./forgetPassword.css";
import Layout from "../../../components/Layout/Layout";
import axios from 'axios';
import {useState} from 'react';
import { toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../../../context/auth";
import { useLocation } from "react-router-dom";
function ForgetPassword() {
  const [updatedata,setUpdateData] = useState({
    'email':'',
    'newPassword':'',
    'answer':'',
  })
  const [loading,setLoading] = useState(false);
  const [auth,setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const onChange=(e)=>{
    e.preventDefault();
    setUpdateData({...updatedata,[e.target.name]:e.target.value})
    console.log(updatedata);


  }
  const handleOnUpdate = async(e)=>{
    e.preventDefault();
    try{
      console.log(updatedata)
      setLoading(true);
      const res = await axios.post("http://localhost:4000/api/v1/auth/forgetPassword",updatedata)
      
      if(res.data.success){
        setLoading(false);
        toast.success("Successfully Changed Password")
        
        navigate('/login');
      }else{
        setLoading(false);
        toast.error("Error SomeThing wrong")
      }
    }
    catch(error){
        setLoading(false);
        toast.error("Error SomeThing wrong1")
        console.log(error)
    }
  }
  return (
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
            <h3>Update Password</h3>
            <form>
              
              <div class="mb-3">
                <label class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  name='email'
                  value={updatedata.email}
                  onChange = {(e)=>onChange(e)}
                  
                />
              </div>
             
              <div class="mb-3">
                <label class="form-label">
                  NewPassword
                </label>
                <input
                  type="password"
                  class="form-control"
                  name='newPassword'
                  value={updatedata.newPassword}
                  onChange = {(e)=>onChange(e)}
                  
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Answer
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  name='answer'
                  value={updatedata.answer}
                  onChange = {(e)=>onChange(e)}
                />
              </div>
             
              
              
              
              
              <button type="submit" onClick = {handleOnUpdate} class="btn btn-primary form-control">
                Submit
              </button>
              
              
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ForgetPassword;
