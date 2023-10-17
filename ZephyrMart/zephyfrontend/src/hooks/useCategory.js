import {useState,useEffect} from 'react'
import axios from 'axios';

export default function useCategory(){
    const [categories,setCategories] = useState([]);

    const findAllCategory = async()=>{
        try{
            const {data} = await axios.get("http://localhost:4000/api/v1/auth/all-category")
            console.log(data)
            if(data?.success){
                console.log(categories)
                setCategories(data.category)

            }
        }
        catch(error){
            console.log(error)
            
        }
    }
    useEffect(()=>{
        findAllCategory();
    },[])

    return categories;
}
