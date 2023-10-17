import React from "react";
import "./Register.css";
import Layout from "../../../components/Layout/Layout";
import {useState} from 'react'
import { toast} from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Register() {
  const [userdetail,setUserDetail]  = useState({
    'name':'',
    'email':"",
    'password':'',
    'address':"",
    'phone':'',
    'role':'',
    'answer':'',
    'photo':'',

  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const onChange=(e)=>{
    e.preventDefault();
    setUserDetail({...userdetail,[e.target.name]:e.target.value})
    console.log(userdetail)
  }

  const handleImageUpload = async()=>{
    console.log(userdetail)
    let formData = new FormData();
    formData.append('file',userdetail.photo)
    console.log(formData)
    const response =await axios.post("http://localhost:4000/api/v1/auth/uploadFile",formData)
    console.log("response",response)
    return response;
}


  const handleOnSubmit=async(e)=>{
    e.preventDefault();
    try{
      const imgres = await handleImageUpload()
      setLoading(true);
      console.log("userdetails",userdetail)
      const res = await axios.post(`http://localhost:4000/api/v1/auth/register`,{
        "name": userdetail.name,
      "password": userdetail.password,
      "email": userdetail.email,
      "role": userdetail.role,
      "address": userdetail.address,
      "phone": userdetail.phone,
      "answer": userdetail.answer,
      "photo":`http://localhost:4000/api/v1/auth/files/${imgres.data.filename}`
      })
      if(res.data.success){
        setLoading(false)
        toast.success("resister successfully")
        navigate('/')
      }
      else{
        setLoading(false)
        toast.error("Something went wrong")
      }
    }
    catch(error){
      setLoading(false)
      console.log(error)
      toast.error(error)
    }
  }
  return (
    <div>
      <Layout>
        <div className="container">
          
          <div className="form-container">
          {
            loading ? <>
            <div class="spinner-border text-center" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
            </>:null
          }
            <h3>Resister</h3>
            <form onSubmit={(e)=>handleOnSubmit(e)}>
              <div class="mb-3">
              <label className='btn btn-outline-secondary col-md-12'>
    {userdetail.photo ? userdetail.photo.name : "Upload Photo"}
    <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={(e) => setUserDetail({ ...userdetail, [e.target.name]: e.target.files[0] })}
        hidden
    />
</label>
                <label class="form-label">
                  Name
                </label>
                <input
                  type="name"
                  class="form-control"
                  name='name'
                  value={userdetail.name}
                  onChange={(e)=>onChange(e)}
                  
                  
                />
                
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  name='email'
                  value={userdetail.email}
                  onChange={(e)=>onChange(e)}
                  
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  name='password'
                  value={userdetail.password}
                  onChange={(e)=>onChange(e)}
                />
              </div>
              <div class="mb-3">
                <label  class="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  class="form-control"
                  name='phone'
                  value={userdetail.phone}
                  onChange={(e)=>onChange(e)}
                 
                />
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  name='address'
                  value={userdetail.address}
                  onChange={(e)=>onChange(e)}
                  
                />
                
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Answer
                </label>
                <input
                  type="text"
                  class="form-control"
                  name='answer'
                  value={userdetail.answer}
                  onChange={(e)=>onChange(e)}
                  placeholder="Favorite Sports"
                  
                />
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Role
                </label>
                <input
                  type="number"
                  class="form-control"
                  name='role'
                  value={userdetail.role}
                  onChange={(e)=>onChange(e)}
                  
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
  );
}

export default Register;
