import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import {useCart} from '../context/cart'

export default function Search() {
    const [search,setSearch] = useSearch();
    const [cart,setCart] = useCart();
  return (
    <Layout>
        <h1 className='text-center'>Search Product</h1>
        
        <div className="d-flex flex-wrap">
                {search?.results.length>0? search.results.map((pro) => (
                  <div
                    class="card m-3"
                    style={{ width: "18rem" }}
                    key={pro._id}
                  >
                    <img
                      src={pro.photo}
                      class="card-img-top"
                      alt={pro.name}
                      style={{ height: "15rem", width: "18rem" }}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{pro.name}</h5>
                      <p class="card-text">
                        {pro.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">Rs {pro.price}</p>
                      <a href="#" class="btn btn-primary ms-1">
                        More Details
                      </a>
                      <a href="#" class="btn btn-primary ms-1"
                      onClick = {()=>{setCart([...cart,pro]);localStorage.setItem('cart',JSON.stringify([...cart,pro]))}}
                      >
                        Add to Cart
                      </a>
                    </div>
                  </div>
                )):<h1 className='d-flex justify-content-center align-items-center text-center'>Data Not Available</h1>}
              </div>  
            
            
    </Layout>
  )
}
