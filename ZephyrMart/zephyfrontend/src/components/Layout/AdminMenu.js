import React from 'react'
import { Link } from 'react-router-dom'
function AdminMenu() {
  return (
    <div>
        <div class="list-group">
  <Link to="/dashboard/admin/createcategory" class="list-group-item list-group-item-action btn-light" aria-current="true">
    Create-Category
  </Link>
  <Link to="/dashboard/admin/createproduct" class="list-group-item list-group-item-action">Create-Product</Link>
  
  <Link to="/dashboard/admin/products" class="list-group-item list-group-item-action">Products</Link>
  <Link to="/dashboard/admin/orders" class="list-group-item list-group-item-action">All Orders</Link>
  <Link to="/dashboard/admin/users" class="list-group-item list-group-item-action">All Users</Link>
   </div>
    </div>
  )
}

export default AdminMenu