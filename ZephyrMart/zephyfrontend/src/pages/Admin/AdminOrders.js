import React, { useEffect,useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import moment from 'moment';
import {Select} from 'antd';
import { toast } from 'react-toastify';
const {Option} = Select;

function AdminOrders() {
    const [order,setOrder] = useState([]);
    const [status,setStatus] = useState(["Not Process","Processing","Shipped","Delievered","Cancel"])
    const [changestatus,setChangeStatus] = useState("");

    const getAllOrders = async()=>{
        try{
            const {data} = await axios.get('http://localhost:4000/api/v1/auth/all-orders');
            console.log("data",data)
            if(data.success){
                setOrder(data.orders)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const onStatusOrder = async(id,value)=>{
        try{
            console.log(id)
            const {data} = await axios.put(`http://localhost:4000/api/v1/auth/update-status/${id}`,{status:value})
            console.log("data "+data)
            if(data.status){
                console.log(data)
                toast.success("Successfully updated");
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllOrders();
    },[])
  return (
    <Layout>
        <div className='fluid-container'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
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
                        <td>
                            <Select bordered={false}
                            onChange = {(value)=>onStatusOrder(ord._id,value)}
                             defaultValue={ord.status}
                            >
                                {
                                    status.map((s,i)=>(
                                        <Option key={i} value={s}>
                                            {s}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </td>
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
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminOrders