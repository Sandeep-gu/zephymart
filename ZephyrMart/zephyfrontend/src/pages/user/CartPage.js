import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios"
import { toast } from "react-toastify";
import Rating from "../../components/Rating";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [instance,setInstance] = useState("");
  const [clientToken,setClientToken] = useState('')
  const navigate = useNavigate();
  const handleRemoveCart = (pid) => {
    try {
      console.log(pid);
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);

      console.log(myCart);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleTotalPayment = () => {
    console.log(cart)
    try {
      let total = 0;
      cart?.map((item) => {
        console.log(item.price)
        total = total + item.price;
      });
      console.log(total)
      return total.toString();
    } catch (error) {
      console.log(error);
    }
  };

  //payment method
  const getToken = async()=>{
    try{
        const {data} = await axios.get('http://localhost:4000/api/v1/auth/payment-token')
        console.log(data)
        setClientToken(data?.clientToken)
    }catch(error){
        console.log(error);
    }
  }

  //handle payment gateway
  const handlePayment=async()=>{
    try{
        console.log("started");
        setLoading(true);
        const {nonce} = await instance.requestPaymentMethod();
        const {data} = await axios.post("http://localhost:4000/api/v1/auth/payment",{nonce,cart})
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/order");
        toast.success("Payment Completed Successfully");
        }
    catch(error)
    {
    console.log(error);
    setLoading(false);
    }
  }
  useEffect(()=>{
    getToken()
  },[auth?.token])
  return (
    <Layout>
      <div>
        {cart?.length > 0 ? (
          auth?.token ? (
            <div className="container-fluid">
              <h1 className="text-center">Cart Detail</h1>
              <div className="row gx-5">
                <div className="col-md-6 mb-4">
                  {cart?.map((p) => (
                    <div className="row mt-3 shadow" key={p._id}>
                      <div className="col-md-6" style={{ height: "10rem" }}>
                        <img
                          src={p.photo}
                          className="img img-responsive object-fit-cover rounded"
                          style={{ height: "100%", width: "100%" }}
                        />
                      </div>
                      <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h5>{p.name}</h5>
                        <p>{p.description}</p>
                        <p>Price : {p.price}</p>
                        <div>
                            <Rating postId={p._id}/>
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveCart(p._id)}
                        >
                          Remove
                        </button>
                        
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="col-md-4 d-flex flex-column text-center m-4 shadow"
                  
                >
                  <h4>Cart Summary</h4>
                  <p>Total | CheckOut | Payment</p>
                  <hr />
                  <h4>Total Price : {handleTotalPayment()}</h4>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3">
                        <h4>Current Address</h4>
                        <p>{auth?.user?.address}</p>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        {auth?.token ? (
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashbaord/user/profile")}
                          >
                            Update address
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-warning"
                            onClick={() =>
                              navigate("/login", { state: "/cartpage" })
                            }
                          >
                            Update address
                          </button>
                        )}
                      </div>
                    </>
                  )}
                  <div className="mt-2">
                  {
                    loading?
                    (<>
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </>):""
                  }
                  {/*here I have worked on payment gateway */}
                  {
                    !clientToken || !cart?.length ?(""):
                    (<>
                        <DropIn
                    options = {{
                        authorization:clientToken,
                        
                        googlePay:{
                        flow:"vault"}

                    }}
                    onInstance = {instance=>setInstance(instance)}
                  />
                  <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={!instance || loading || !auth?.user?.address}
                  >
                  {loading?"Processing...":"Make Payment"}

                  </button>
                    </>)
                  }
                  
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "Please Login to Checkout"
          )
        ) : (
          <h5>Your Cart is Empty</h5>
        )}
      </div>
    </Layout>
  );
}

export default CartPage;
