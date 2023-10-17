import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'

function Users() {
    const [users,setUsers] = useState([])
    const findAllUsers = async()=>{
        try{
            const {data} = await axios.get('http://localhost:4000/api/v1/auth/all-users')
            console.log(data)
            if(data.success){
                setUsers(data.details)
            }
            else{
                console.log("data not found")
            }
        }
        catch(error){
            console.log(error);
        }
    }

    //delete user
    const handleDeleteUser = async(id)=>{
        try{
            console.log(id);
            const {data} = await axios.delete(`http://localhost:4000/api/v1/auth/delete-user/${id}`)
            console.log(data);
            if(data.success){
                toast.success('User deleted successfully');
                findAllUsers();
            }
            else{
                toast.success('User not deleted');
            }
        }
        catch(error){
            toast.error(error.message);
            console.log(error)
        }
    }
    useEffect(()=>{
        findAllUsers();
    },[])
  return (
    <div>
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>All Users</h1>
                        <div className="d-flex flex-column justify-content-center">
              {users?.map((item) => (
                <div className="d-flex m-4 rounded" style={{backgroundColor:"rgba(0,0,0,0.1)"}} key={item._id}>
                  <div class=" m-4" style={{ width: "18rem" }}>
                    {
                        item?.photo ? <img
                      src={item.photo}
                      class="ing img-responsive card-img-top"
                      style={{ height: "18rem", width: "100%" }}
                      alt="..."
                    />:<div className='d-flex align-content-center text-center justify-content-center'>
                        <i class="fa-solid fa-user fs-1 "></i>
                    </div>
                    }
                  </div>
                    <div class="card-body m-4">
                      <p class="card-text">Name : {item.name}</p>
                      <p class="card-text">EmailId : {item.email}</p>
                      <p class="card-text">Contact No : {item.price}</p>
                      <p class="card-text">Address : {item.address}</p>
                      <p class="card-text">Answer : {item.answer}</p>
                      <p class="card-text">role : {`${item.role==1?"Admin":"user"}`}</p>
                      
                      
                      <button
                        className="btn btn-primary text-decoration-none"
                        onClick={()=>handleDeleteUser(item._id)}
                        
                      >
                        Delete
                      </button>
                    </div>
                  
                </div>
              ))}
            </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Users