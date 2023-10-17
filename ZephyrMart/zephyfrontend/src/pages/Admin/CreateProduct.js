import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {Select} from "antd"


import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
function CreateProduct() {
    const navigate = useNavigate();
    const {Option} = Select
    const [allcategory,setAllCategory] = useState([])
    const [category,setCategory] = useState("")
    const [photo,setPhoto] = useState("")
    const [price,setPrice] = useState("")
    const [description,setDescription] = useState("")
    const [quantity,setQuantity] = useState("")
    const [shipping,setShipping] = useState("")
    const [name,setName] = useState("")

    const getAllCategories = async()=>{
        try{
            const {data} = await axios.get("http://localhost:4000/api/v1/auth/all-category")
            if(data){
                toast.success("Successfully fetched all categories")
                
                setAllCategory(data.category)
               
            }
        }catch(error){
            console.log(error);
            toast.error(error);
        }
    }


   



    const handleImageUpload = async()=>{
        let formData = new FormData();
        formData.append('file',photo)
        console.log(formData)
        const response =axios.post("http://localhost:4000/api/v1/auth/uploadFile",formData)
        console.log(response)
        return response;
    }


    const handleSubmitbtn = async(e)=>{
        e.preventDefault();
        try{
            const imgres = await handleImageUpload()
            console.log(imgres);
            const {data} = await axios.post("http://localhost:4000/api/v1/auth/create-product",
            {
                "name":name,
                "price":price,
                
                "photo":`http://localhost:4000/api/v1/auth/files/${imgres.data.filename}`,
                "quantity":quantity,
                "category":category,
                "description":description,
            
            }
            
            )
            if(data.success){
                console.log(data)
                toast.success("Product created successfully")
                navigate("/dashboard/admin/products")
                
            }else{
                console.log("data not found")
                toast.error("Something went wrong");
            }
        }catch(error){
            console.log(error)
            toast.error("Product created failed");
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
                        <h1 className='text-center'>Create Product</h1>
                        <div className="m-1 w-75">
                        <Select bordered={false}
                        placeholder="Select a Category"
                        size="large"
                        showSearch
                        className='form-select mb-3'
                        onChange={(value=>{setCategory(value)})}
                        >
                        {
                            allcategory?.map((item)=>(
                                <Option key={item._id} value={item._id}>
                                    {item.name}
                                </Option>
                            ))
                        }
                        </Select>
                        <div className='mb-3'>
                            <label className='btn btn-outline-secondary col-md-12'>
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e)=>setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>

                        </div>
                        <div className='mb-3'>
                            {
                                photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
                                         alt="product_photo"
                                          height={"200px"}
                                            className='img img-responsive'
                                          />
                                    </div>
                                )
                            }
                        </div>
                        <div className="mb-3">
                            <input type="text"
                             className="form-control w-100"
                             value={name}
                             onChange = {(e)=>setName(e.target.value)}
                              Placeholder="Name"/>
                        </div>
                        <div className="mb-3">
                            <input type="text"
                             className="form-control w-100"
                             value={price}
                             onChange = {(e)=>setPrice(e.target.value)}
                              Placeholder="Price"/>
                        </div>
                        <div className="mb-3">
                            <textarea type="text"
                             className="form-control w-100"
                             value={description}
                             onChange = {(e)=>setDescription(e.target.value)}
                              Placeholder="Description"></textarea>
                        </div>
                        <div className="mb-3">
                            <input type="number"
                             className="form-control w-100"
                             value={quantity}
                             onChange = {(e)=>setQuantity(e.target.value)}
                              Placeholder="Quantity"/>
                        </div>
                        <div className="mb-3">
                        <Select bordered={false}
                        placeholder="Select a Shipping"
                        size="large"
                        showSearch
                        className='form-select mb-3'
                        onChange={(value=>{setShipping(value)})}
                        Placeholder="Shipping"
                        >
                        
                           
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                            
                        </Select>
                        </div>
                        <div className='mb-3'>
                            <button className="btn btn-primary" onClick={handleSubmitbtn}>Submit</button>
                        </div>
                        </div>
                    </div>
                    
    
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default CreateProduct