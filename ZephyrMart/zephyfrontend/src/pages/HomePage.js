import React, { useEffect, useState } from "react";
import "../stylecss/HomePage.css";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Prices";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import Rating from "../components/Rating";
function HomePage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  //state define for pagination
  const [currentpage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (currentpage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = product.slice(startIndex, endIndex);

  //handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  //get All product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/auth/get-product"
      );
      if (data.success) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  //get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/auth/all-category"
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  //filter products by category and price
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/filter-product",
        { checked, radio }
      );

      setProduct(data?.product);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //handle filter product
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handleAddCart = (pro) => {
    setCart([...cart, pro]);
    localStorage.setItem("cart", JSON.stringify([...cart, pro]));
    toast.success("Successfully added");
  };
  return (
    <div>
      <Layout title={"Home"}>
        <div className="img-container">
          <div className="img-top-content">
            <h1 className="title-name">ZEPHYMART</h1>
            <p className="title-name">ECOMMERCE WEBSITE</p>
          </div>
          <img
            className="img img-responsive"
            src={
              "https://media.istockphoto.com/id/518734845/photo/brand-new-interior-of-cloth-store.jpg?s=1024x1024&w=is&k=20&c=5WvLV1r3ocUbbXmKQ78cYdwEoN1rUuAu0640yFqL4Is="
            }
            alt="Your Image"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="fluid-container">
          <div className="row">
            <div className="col-md-3 shadow pt-4">
              <h4 className="text-center">Filter All Category</h4>
              <hr />
              <div className="d-flex flex-column ps-4">
                {category?.map((cat) => (
                  <Checkbox
                    key={cat._id}
                    onChange={(e) => handleFilter(e.target.checked, cat._id)}
                  >
                    {cat.name}
                  </Checkbox>
                ))}
              </div>
              <h4 className="text-center mt-5">Filter All Prices</h4>
              <hr />
              <div className="d-flex flex-column ps-4">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Price?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger m-2"
                  onClick={() => window.location.reload()}
                >
                  ResetAll
                </button>
              </div>
            </div>
            <div className="col-md-9">
              <h1 className="text-center mt-3">All Product</h1>
              <hr />
              <div className="row g-4">
                {currentItems?.map((pro) => (
                  <div className="col-md-4 col-sm-12 col-sm-m-2" key={pro._id}>
                    <div className="card h-100">
                      <img
                        src={pro.photo}
                        className="card-img-top"
                        style={{ height: "18rem" }}
                        alt={pro.name}
                      />
                      <div className="card-body">
                        <h4 className="card-title">{pro.name}</h4>
                        <p className="card-text">
                          {pro.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">Rs {pro.price}</p>
                        <Link
                          to={`/moredetail/${pro.slug}`}
                          className="btn btn-primary ms-1"
                        >
                          More Details
                        </Link>
                        <button
                          className="btn btn-primary ms-1"
                          onClick={() => handleAddCart(pro)}
                        >
                          Add to Cart
                        </button>
                        
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between m-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange(currentpage - 1)}
                  disabled={currentpage === 1}
                >
                  Previous
                </button>
                <span>{`Page ${currentpage}`}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange(currentpage + 1)}
                  disabled={endIndex >= product.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default HomePage;
