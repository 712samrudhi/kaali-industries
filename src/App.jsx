import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// COMMON
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/Productlist";
import Contact from "./components/contact";
import WhatsAppButton from "./components/WhatsAppButton";
import Services from "./components/Services";


// USER
import UserNavbar from "./Pages/User/UserNavbar";
import UserIndex from "./Pages/User/userIndex";
import UserProductPage from "./Pages/User/UserProductPage";
import UserProfile from "./Pages/User/UserProfile";
import Cart from "./Pages/User/Cart";
import Checkout from "./Pages/User/Checkout";
import UserAbout from "./Pages/User/userabout";
import OrderPage from "./Pages/User/OrderPage";



// PAGES
import About from "./Pages/About";

import FarmerFeedback from "./Pages/FarmerFeedback";
import LoginRegister from "./Pages/LoginRegister";
import ProductDetailPage from "./Pages/ProductDetailPage";



// PRODUCTS
import Fertilizer from "./Pages/products/Fertilizer";
import Seed from "./Pages/products/Seed";
import Food from "./Pages/products/Food";
import Vegetable from "./Pages/products/Vegetable";


// ADMIN
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AddProduct from "./Admin/AddProduct";
import ProductDetails from "./Admin/ProductDetails";
import ManageProducts from "./Admin/ManageProducts";
import ManageUsers from "./Admin/ManageUsers";
import ManageProductDetails from "./Admin/ManageProductDetails";
import ManageContactMessages from "./Admin/ManageContactMessages";
import AdminFeedback from "./Admin/AdminFeedback";
import ManageOrders from "./Admin/ManageOrders";

function Home(){

return(
<>
<ProductList/>
<Footer/>
</>
)

}





function App(){


return(

<BrowserRouter>


<Routes>



{/* HOME */}

<Route

path="/"

element={
<>
<Navbar/>
<Home/>

</>
}

/>




{/* LOGIN */}

<Route

path="/login"

element={
<>
<Navbar/>
<LoginRegister/>
</>
}

/>





{/* CONTACT NORMAL */}

<Route

path="/contact"

element={
<>
<Navbar/>
<Contact/>
<Footer/>
</>
}

/>





{/* CONTACT USER */}

<Route

path="/user/contact"

element={
<>
<UserNavbar/>
<Contact/>
<Footer/>
</>
}

/>





{/* ABOUT */}

<Route

path="/about"

element={
<>
<Navbar/>
<About/>
</>
}

/>


<Route
  path="/services"
  element={
    <>
      <Navbar />
      <Services />
      <Footer />
    </>
  }
/>
<Route
  path="/user/services"
  element={
    <>
      <UserNavbar />
      <Services />
      <Footer />
    </>
  }
/>

{/* USER HOME */}

<Route

path="/user"

element={
<>
<UserNavbar/>
<UserIndex/>
<Footer/>
</>
}

/>





{/* USER ABOUT */}

<Route

path="/user/about"

element={
<>
<UserNavbar/>
<UserAbout/>
</>
}

/>






{/* PRODUCTS */}

<Route

path="/products"

element={
<>
<Navbar/>
<UserProductPage/>
</>
}

/>




<Route

path="/user/products"

element={
<>
<UserNavbar/>
<UserProductPage/>
</>
}

/>






{/* PRODUCT DETAILS */}


<Route

path="/product/:id"

element={
<>
<Navbar/>
<ProductDetailPage/>
</>
}

/>




<Route

path="/user/product/:id"

element={
<>
<UserNavbar/>
<ProductDetailPage/>
</>
}

/>







{/* USER PAGES */}



<Route

path="/user/profile"

element={
<>
<UserNavbar/>
<UserProfile/>
</>
}

/>



<Route

path="/cart"

element={
<>
<UserNavbar/>
<Cart/>
</>
}

/>



<Route
  path="/checkout"
  element={
    <>
      <UserNavbar />
      <Checkout />
    </>
  }
/>



<Route

path="/user/orders"

element={
<>
<UserNavbar/>
<OrderPage/>
</>
}

/>






{/* CATEGORY */}



<Route

path="/fertilizer"

element={
<>
<Navbar/>
<Fertilizer/>
</>
}

/>




<Route

path="/seed"

element={
<>
<Navbar/>
<Seed/>
</>
}

/>



<Route

path="/food"

element={
<>
<Navbar/>
<Food/>
</>
}

/>



<Route

path="/vegetable"

element={
<>
<Navbar/>
<Vegetable/>
</>
}

/>








{/* OTHER */}








<Route

path="/feedback"

element={
<>
<Navbar/>
<FarmerFeedback/>
  <Footer />
</>
}

/>

<Route
  path="/user/feedback"
  element={
    <>
      <UserNavbar />
      <FarmerFeedback />
      <Footer />
    </>
  }
/>






{/* ADMIN */}


<Route

path="/admin"

element={<AdminLogin/>}

/>


<Route

path="/admin/login"

element={<AdminLogin/>}

/>


<Route

path="/admin/dashboard"

element={<AdminDashboard/>}

/>


<Route

path="/admin/add-product"

element={<AddProduct/>}

/>


<Route

path="/admin/product-details"

element={<ProductDetails/>}

/>


<Route

path="/admin/products"

element={<ManageProducts/>}

/>


<Route

path="/admin/users"

element={<ManageUsers/>}

/>


<Route

path="/admin/manage-products"

element={<ManageProducts/>}

/>


<Route

path="/admin/manage-users"

element={<ManageUsers/>}

/>

<Route
  path="/admin/manage-product-details"
  element={<ManageProductDetails />}
/>
<Route
  path="/admin/contact-messages"
  element={<ManageContactMessages />}
/>
<Route
  path="/admin/feedback"
  element={<AdminFeedback />}
/>
<Route
  path="/admin/orders"
  element={<ManageOrders />}
/>
{/* 404 */}

<Route

path="*"

element={

<div
style={{
textAlign:"center",
padding:"50px"
}}
>

<h1>
404 - Page Not Found
</h1>


</div>

}

/>




</Routes>
<WhatsAppButton />

</BrowserRouter>


)


}


export default App;