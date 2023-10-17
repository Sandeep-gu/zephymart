import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/auth/get-product"
      );
      console.log(data);
      if (data?.success) {
        
        setProducts(data.products);
        console.log(products);
      } else {
        toast.error("Product Not Found");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  //delete products
  //delete product fro mteh the database
  const handleDeletebtn = async(id)=>{
    try{
        
        const {data} = await axios.delete(`http://localhost:4000/api/v1/auth/delete-product/${id}`);
        if(data.success){
            toast.success("Successfully deleted product");
            getAllProducts();
        }else{
            console.log("Error deleting product")
            toast.error("Error deleting product")
        }
    }
    catch(error){
        console.log(error);
        toast.error("Something went wrong");
    }
}
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-column justify-content-center">
              {products?.map((item) => (
                <div className="d-flex m-4 rounded" style={{backgroundColor:"rgba(0,0,0,0.1)"}}>
                  <div class="card m-4" style={{ width: "18rem" }}>
                    <img
                      src={item.photo}
                      class="card-img-top"
                      style={{ height: "18rem", width: "18rem" }}
                      alt="..."
                    />
                  </div>
                    <div class="card-body m-4">
                      <h5 class="card-title">Name : {item.name}</h5>
                      <p class="card-text">description : {item.description}</p>
                      <p class="card-text">Price : {item.price}</p>
                      <p class="card-text">quantity : {item.quantity}</p>
                      
                      
                      <Link
                        className="btn btn-primary text-decoration-none"
                        to={`/dashboard/admin/updateproduct/${item.slug}`}
                        key={item._id}
                      >
                        Edit Product
                      </Link>
                      <button className="btn btn-primary ms-2" onClick={()=>handleDeletebtn(item._id)}>Delete</button>
                    </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
