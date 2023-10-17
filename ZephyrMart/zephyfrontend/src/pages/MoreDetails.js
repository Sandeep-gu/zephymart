import React, { useEffect, useState } from "react";
import '../stylecss/Rating.css';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
function MoreDetails() {
  const [product, setProduct] = useState({});
  const [similiarProduct, setSimilarProduct] = useState([]);
  const [averageRating,setAverageRating] = useState(0);
  const params = useParams();
  const [cart, setCart] = useCart();

  const handleMoreDetails = async () => {
    try {
      console.log(params.slug);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/auth//get-singleproduct/${params.slug}`
      );
      console.log("moredetail",data);
      if (data.success) {
        setProduct(data.product);
      } else {
        console.log("data not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateRating = async () => {
    let averageRating = 0;
    product?.rate?.map((rat) => {
      averageRating += rat.rating;
    });
    console.log(averageRating);
    setAverageRating(averageRating / product?.rate?.length);
  };
  
  //similiar product
  const handleSimiliarProduct = async (pid, cid) => {
    try {
      console.log(pid, cid);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/auth/similiar-product/${pid}/${cid}`
      );
      console.log(data);
      if (data.success) {
        setSimilarProduct(data.product);
        console.log(similiarProduct);
      } else {
        console.log("Data not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSimiliarProduct(product?._id, product?.category?._id);
  }, [product]);
  useEffect(() => {
    handleMoreDetails();
    
  }, []);
  useEffect(()=>{
    calculateRating();
  },[product]);

  return (
    <Layout>
      <div className="row container m-5">
        <div className="col-md-6">
          <img
            className="img img-responsive"
            src={product.photo}
            style={{ width: "100%", height: "20rem" }}
          />
        </div>
        <div className="col-md-6  d-flex justify-content-center">
          <div
            className="card shadow p-2"
            style={{ width: "100%", height: "20rem", fontSize: "25px" }}
          >
            <h1 className="text-center">Product Details</h1>

            <h5 className="card-title m-2">Name : {product.name}</h5>
            <h5 className="card-title m-2">
              Description : {product.description}
            </h5>
            <h5 className="card-title m-2">Price : {product.price}</h5>
            <h5 className="card-title m-2">Quantity : {product.quantity}</h5>
            <h5 className="card-title m-2">Shipping : {product.shipping}</h5>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
              }}
            >
              Add to Cart
            </button>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    
                    className={`star ${value <= averageRating ? "active" : ""}`}
                  >
                    &#9733;
                  </button>
                ))}
              </div>
          </div>
        </div>
      </div>
      {similiarProduct.length < 0 ? (
        <h1 className="text-center">Similiar Product Not Found</h1>
      ) : (
        <h1 className="text-center">Similiar Product</h1>
      )}
      <div className="container-fluid ms-2 d-flex flex-wrap">
        {similiarProduct?.map((pro) => (
          <div class="card m-3" style={{ width: "18rem" }} key={pro._id}>
            <img
              src={pro.photo}
              class="card-img-top"
              alt={pro.name}
              style={{ height: "15rem", width: "18rem" }}
            />
            <div class="card-body">
              <h5 class="card-title">{pro.name}</h5>
              <p class="card-text">{pro.description.substring(0, 30)}...</p>
              <p className="card-text">Rs {pro.price}</p>
              <Link to={`/moredetail/${pro.slug}`} class="btn btn-primary ms-1">
                More Details
              </Link>
              <Link
                to="#"
                class="btn btn-primary ms-1"
                onClick={() => {
                  setCart([...cart, pro]);
                  localStorage.setItem("cart", JSON.stringify([...cart, pro]));
                }}
              >
                Add to Cart
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default MoreDetails;
