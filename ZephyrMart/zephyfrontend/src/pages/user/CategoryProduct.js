import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
function CategoryProduct() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [cart,setCart] = useCart();
  useEffect(() => {
    if (params.slug) findAllCategoryProduct();
  }, [params?.slug]);

  //find all the product through the category
  const findAllCategoryProduct = async () => {
    try {
      console.log(params.slug);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/auth/category-product/${params.slug}`
      );
      console.log(data);
      if (data.success) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-center">{params.slug}</h1>
      <div className="d-flex container flex-wrap">
        {product?.map((pro) => (
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
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
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

export default CategoryProduct;
