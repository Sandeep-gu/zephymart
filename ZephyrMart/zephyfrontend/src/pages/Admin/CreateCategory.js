import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import {toast} from 'react-toastify'; 
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from "antd"

function CreateCategory() {
    
    const [allcategory,setAllCategory] = useState([]);
    const [name,setName] = useState("");
    const [visible,setVisible]= useState(false);
    const [select,setSelect] = useState(null);
    const [updated,setUpdated]= useState('');
    //get all categories data from the category
    
    const getAllCategories = async()=>{
        try{
            const category = await axios.get('http://localhost:4000/api/v1/auth/all-category')
            if(category){
                toast.success("Successfully fetched all categories")
                
                setAllCategory(category.data.category)
                console.log(allcategory)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    //add categories to the database through the post request
    const handleSubmitbtn =async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/api/v1/auth/create-category",{name})
            if(response.data.success){
                console.log(response.data)
                toast.success("Category created successfully");
                getAllCategories();
            }else{
                console.log("Error creating category");
                toast.error("Error creating category");
            }

            

        }catch(error){
            console.log(error.message)
            toast.error(error.message)
        }
    }

    //update data for category
    const handleUpdatedbtn = async()=>{
        try{
            const {data} = await axios.put(`http://localhost:4000/api/v1/auth/update-category/${select}`,{name:updated})
            if(data.success){
                toast.success("Updated category");
                setUpdated("");
                setSelect(null);
                setVisible(false);
                getAllCategories();

            }
            else{
                toast.error("Error updating category");
            }
        }
        catch(error){
            console.log(error.message)
            toast.error(error.message)
        }
    }
    //Deleted category
    const handleOnDelete = async(pid) => {
        try{
            console.log(pid)
            const {data} = await axios.delete(`http://localhost:4000/api/v1/auth/delete-category/${pid}`);
            console.log(data)
            if(data.success){
                toast.success("Successfully deleted category")
                getAllCategories();

            }else{
                toast.error("Error deleting category")
            }
        }
        catch(error){
            toast.error("Error deleting category");
        }
    }
    useEffect(()=>{
        getAllCategories();
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
                        
                        <h1 className='text-center'>All Category Feature</h1>
                        <CategoryForm item={name} setItem={setName} handleSubmitbtn={handleSubmitbtn}/>

                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            {
                                allcategory?.map((item)=>{
                                    return(
                                        <>
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>
                                                <button type="button" className='btn btn-primary' onClick={()=>{setVisible(true);setUpdated(item.name);setSelect(item._id)}}>Edit</button>
                                                <button type="button" className='btn btn-danger' onClick = {()=>handleOnDelete(item._id)}>X</button>
                                            </td>
                                           
                                        </tr>
                                        
                                        </>
                                    )
                                })
                                }
                                
                                
                            </tbody>
                            </table>

                    </div>
                </div>
                <Modal title="Edit Category" open={visible} footer={null} visible={visible} onCancel={()=>setVisible(false)}>
                <CategoryForm item={updated} setItem={setUpdated} handleSubmitbtn = {handleUpdatedbtn} />

                </Modal>
            </div>
        </Layout>
    </div>
  )
}

export default CreateCategory