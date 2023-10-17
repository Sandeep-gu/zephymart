import React from 'react'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-toastify'
function SearchBox() {
    const[search,setSearch] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        console.log("handlesubmit function working")
        e.preventDefault();
        try{
            

            const {data} = await axios.get(`http://localhost:4000/api/v1/auth/search/${search.keyword}`);
            console.log(data)
            setSearch({...search,results:data});

            console.log(search)
            navigate('/search');
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }
  return (
    <div>
        <form class="d-flex flex-wrap align-items-center" role="search">
        <input class="form-control w-auto" type="search" placeholder="Search" aria-label="Search" value={search.keyword} onChange={(e)=>setSearch({...search,keyword:e.target.value})}/>
        <button class="btn btn-outline-success" type="submit"  onClick={handleSubmit}>Search</button>
      </form>
    </div>
  )
}

export default SearchBox