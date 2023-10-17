import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-toastify'
function Profile() {
    const [auth,setAuth] = useAuth()
    const [update,setUpdate] = useState({
        name:"",
        email:"",
        password:"",
        address:"",
        phone:""

    })
    useEffect(()=>{
        setUpdate({...update,
            name:auth.user.name,
            email:auth.user.email,
            password:"",
            address:auth.user.address,
            phone:auth.user.phone
        })
    },[auth?.user])

    const onChange=(e)=>{
        e.preventDefault();
        setUpdate({...update,[e.target.name]:e.target.value})
    }
    const handleUpdateButton=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.put("http://localhost:4000/api/v1/auth/update-user",update);
            console.log(data)
            if(data?.success){
                
                setAuth({...auth,user:data?.updatedUser});
                let ls = localStorage.getItem("auth");
                ls = ls.JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth",JSON.stringify(ls));
                toast.success("Successfully updated");
            }
        }
        catch(error){
            console.log(error)
        }

    }
  return (
    <div>
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className='col-md-9 d-flex flex-column align-items-center'>
                        <h1 className='text-center'>Profile</h1>
                        <div className='card shadow p-4 d-flex flex-column align-items-center'>
                            <form onSubmit={(e)=>handleUpdateButton}>
                                <div className='my-2'>
                                    <input type='text' className='form-control' name="name" value={update.name} onChange={(e)=>onChange(e)} placeholder='Name'/>
                                </div>
                                <div className='my-2'>
                                    <input type='email' className='form-control' name="email" value={update.email} onChange={(e)=>onChange(e)} placeholder='Email'/>
                                </div>
                                <div className='my-2'>
                                    <input type='password' className='form-control' name="password" value={update.password} onChange={(e)=>onChange(e)} placeholder='Password'/>
                                </div>
                                <div className='my-2'>
                                    <input type='text' className='form-control ' name="address" value={update.address} onChange={(e)=>onChange(e)} placeholder='Address'/>
                                </div>
                                <div className='my-2'>
                                    <input type='text' className='form-control ' name="phone" value={update.phone} onChange={(e)=>onChange(e)} placeholder='Phone'/>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary">Update</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Profile