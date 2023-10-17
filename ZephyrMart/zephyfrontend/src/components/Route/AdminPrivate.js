import React, { useState,useEffect } from 'react'
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
function AdminPrivate() {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async()=>{
            const res = await axios.get("http://localhost:4000/api/v1/auth/admin-auth");
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        };
        if(auth?.token) authCheck();
    },[auth?.token])
  return ok ? <Outlet/>:<Spinner/>;
}

export default AdminPrivate