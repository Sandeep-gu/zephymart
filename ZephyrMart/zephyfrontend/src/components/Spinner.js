import React, { useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
function Spinner({path="login"}) {
  const navigate = useNavigate();
  const [count,setCount] = useState(5)
  const location = useLocation();
  useEffect(()=>{
    const time = setInterval(()=>{
        setCount((prev)=>--prev)
    },1000);
  count===0 && navigate(`/${path}`,{
    state:location.pathname
  }
    
  );
  return ()=>clearInterval(time);
  },[count,navigate,location,path]);
  return (
    <>
        <div 
        className='d-flex flex-column justify-content-center align-items-center'
        style={{height:"100vh"}}
        >
            <h1 className="text-center">redirecting to you in {count} seconds</h1>
            <div class="spinner-border text-center" role="status">
                <span class="visually-hidden">
                    ...Spinner
                </span>
        </div>
        </div>
    </>
  )
}

export default Spinner