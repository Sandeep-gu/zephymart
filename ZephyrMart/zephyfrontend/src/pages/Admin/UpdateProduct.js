import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {Select} from "antd"
import { useParams } from 'react-router-dom'

import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
function UpdateProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const {Option} = Select
    const [allcategory,setAllCategory] = useState([])
    const [category,setCategory] = useState("")
    const [prevphoto,setPrevPhoto] = useState("")
    const [photo,setPhoto] = useState("")
    const [price,setPrice] = useState("")
    const [description,setDescription] = useState("")
    const [quantity,setQuantity] = useState("")
    const [shipping,setShipping] = useState("")
    const [name,setName] = useState("")
    const [id,setId] = useState("")
    //get those product we want to update
    const getSingleProduct = async()=>{
        try{
            const {data} = await axios.get(`http://localhost:4000/api/v1/auth/get-singleproduct/${params.slug}`);
            console.log(data);
            if(data.success){
                setId(data.product._id)
                setName(data.product.name)
                setDescription(data.product.description)
                setPrice(data.product.price)
                setCategory(data.product.category)
                setPrevPhoto(data.product.photo)
                setQuantity(data.product.quantity)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error)
        }
    }
    //get all categories
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


   


    //uplaod image through the multer and pass the url as a string
    const handleImageUpload = async()=>{
        if(!photo) return null;
        let formData = new FormData();
        formData.append('file',photo)
        console.log(formData)
        const response =axios.post("http://localhost:4000/api/v1/auth/uploadFile",formData)
        console.log(response)
        return response;
    }

    //update product in the database
    const handleSubmitbtn = async(e)=>{
        e.preventDefault();
        try{
            const imgres = await handleImageUpload()
            let uploadphotodata = prevphoto;
            if(imgres){
                uploadphotodata = `http://localhost:4000/api/v1/auth/files/${imgres.data.filename}`
            }
            console.log(imgres);
            const {data} = await axios.put(`http://localhost:4000/api/v1/auth/update-product/${id}`,
            {
                "name":name,
                "price":price,
                
                "photo":uploadphotodata,
                "quantity":quantity,
                "category":category,
                "description":description,
                "shipping":shipping
            
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
        getSingleProduct();
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
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                        <Select bordered={false}
                        placeholder="Select a Category"
                        size="large"
                        showSearch
                        className='form-select mb-3'
                        value={category}
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
                            {photo ?
                                <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
                                         alt="product_photo"
                                          height={"200px"}
                                            className='img img-responsive'
                                          />
                                    </div>:
                                    <div className="text-center">
                                        <img src={photo}
                                         alt="product_photo"
                                          height={"200px"}
                                            className='img img-responsive'
                                          />
                                    </div>

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

export default UpdateProduct