import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";

function Order() {
  const [order, setOrder] = useState([]);
  const allOrderData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/auth/orders"
      );
      console.log(data);
      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allOrderData();
  }, []);
  return (
    <div>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Order</h1>
              
              
                {order?.map((ord, i) => {
                  return(<>
                    <table class="table" key={ord._id}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i}</th>
                        <td>{ord?.status}</td>
                        <td>{ord?.buyers?.name}</td>
                        <td>{moment(ord?.createdAt).fromNow()}</td>
                        <td>{ord?.payment.Success ? "Success" : "Failed"}</td>
                        <td>{ord?.products?.length}</td>
                      </tr>
                    </tbody>
                    </table>
                    <div className="fluid-container m-4">
                    {ord?.products.map((p) => (
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
                        <button
                          type="button"
                          className="btn btn-danger"
                          
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                    </div>
                  </>)
                })}
              
              <div className="container-fluid">
              
                  </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Order;
