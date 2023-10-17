import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import  Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register/Register.js';
import Login from './pages/Auth/Login/Login.js';
import ForgetPassword from './pages/Auth/forgetPassword/ForgetPassword.js';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import Private from './components/Route/Private';
import AdminPrivate from './components/Route/AdminPrivate';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import Users from './pages/Admin/Users';
import CreateProduct from './pages/Admin/CreateProduct';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import MoreDetails from './pages/MoreDetails';
import CategoryPage from './pages/user/CategoryPage';
import CategoryProduct from './pages/user/CategoryProduct';
import CartPage from './pages/user/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import toast, { Toaster} from 'react-hot-toast';
function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route exact path='/category' element={<CategoryPage/>}/>
        <Route exact path='/cartpage' element={<CartPage/>}/>
        <Route exact path='/category/:slug' element={<CategoryProduct/>}/>
        <Route exact path='/moredetail/:slug' element={<MoreDetails/>}/>
        <Route path='/dashboard' element={<Private/>}>
          <Route exact path='user' element = {<Dashboard/>}/>
          <Route exact path='user/profile' element={<Profile/>}/>
          <Route exact path='user/order' element={<Order/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminPrivate/>}>
          <Route exact path='admin' element = {<AdminDashboard/>}/>
          <Route exact path="admin/createcategory" element = {<CreateCategory/>}/>
          <Route exact path="admin/createproduct" element = {<CreateProduct/>}/>
          <Route exact path="admin/users" element = {<Users/>}/>
          <Route exact path="admin/products" element = {<Products/>}/>
          <Route exact path="admin/updateproduct/:slug" element = {<UpdateProduct/>}/>
          <Route exact path="admin/orders" element = {<AdminOrders/>}/>
        </Route>
        
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/policy' element={<Policy/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='*' element={<Pagenotfound/>}/>
      </Routes>
    </>
  );
}

export default App;
