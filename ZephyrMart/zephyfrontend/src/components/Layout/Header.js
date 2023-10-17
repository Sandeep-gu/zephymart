import React from "react";
import { Link } from "react-router-dom";
import { LuShoppingBasket } from "react-icons/lu";
import { useAuth } from "../../context/auth";
import SearchBox from "../../pages/SearchBox";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  console.log(categories);
  const handleOnLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link class="navbar-brand" to="/">
              <LuShoppingBasket />
              ZephyMart
            </Link>
            <ul class="navbar-nav ms-auto align-items-center mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/">
                  <SearchBox />
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link btn btn-outline-success" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item dropdown">
                <Link
                  class="btn dropdown-toggle"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/category">
                      All Category
                    </Link>
                  </li>
                  {categories?.map((cate) => (
                    <li key={cate._id}>
                      <Link class="dropdown-item" to={`/category/${cate.slug}`}>
                        {cate.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/register">
                      Resister
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <div class="dropdown">
                    <button
                      class="btn"
                      type="button"
                      data-bs-toggle="dropdown"
                    >{ auth.user.photo ?
                      <img
                        className="img img-responsive rounded-circle"
                        src={`${
                          auth?.user.photo ? (
                            auth.user.photo
                          ) : (
                            <i class="fa-solid fa-user"></i>
                          )
                        }`}
                        alt="..."
                        style={{ width: "50px", height: "50px" }}
                      />: <i class="fa-solid fa-user fs-3"></i>}
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <Link
                          class="dropdown-item"
                          to="/login"
                          onClick={handleOnLogOut}
                        >
                          LogOut
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <li class="nav-item">
                <Link class="nav-link" to="/cartpage">
                  <i
                    class="fa-solid fa-cart-shopping fs-2"
                    style={{ color: "#0b23e0" }}
                  ></i>
                  <span class="badge bg-secondary">{cart?.length}</span>
                </Link>
              </li>
                </>
              )}
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
