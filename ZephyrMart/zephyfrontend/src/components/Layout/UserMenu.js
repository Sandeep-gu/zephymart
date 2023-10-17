import React from "react";
import { Link } from "react-router-dom";
function UserMenu() {
  return (
    <div>
      <div class="list-group">
        <Link
          to="/dashboard/user/profile"
          class="list-group-item list-group-item-action active"
          aria-current="true"
        >
          Profile
        </Link>
        <Link
          to="/dashboard/user/order"
          class="list-group-item list-group-item-action"
        >
          Order
        </Link>
        
      </div>
    </div>
  );
}

export default UserMenu;
