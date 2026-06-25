import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes
} from "react-icons/fa";

function UserNavbar(){

const [open,setOpen]=useState(false);
const [menuOpen,setMenuOpen]=useState(false);

const navigate=useNavigate();


const user = JSON.parse(localStorage.getItem("farmer")) || {};
const cart = JSON.parse(localStorage.getItem("cart")) || [];


const firstLetter = user.name
? user.name.charAt(0).toUpperCase()
:"U";


const handleLogout=()=>{

localStorage.removeItem("farmer");
navigate("/login");

};


return(
<>


<style>{`

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',sans-serif;
}


/* TOP */

.top-header{

background:linear-gradient(90deg,#0f766e,#16a34a);
padding:10px 5%;

}


.top-content{

display:flex;
justify-content:space-between;
align-items:center;

}


.top-link{

color:white;
text-decoration:none;
font-weight:600;
margin-right:20px;

}


.language{

display:flex;
gap:10px;

}


.lang-btn{

background:white;
color:#0f766e;
border:none;
padding:7px 15px;
border-radius:20px;
cursor:pointer;
font-weight:bold;

}



/* NAVBAR */


.main-header{

height:95px;
background:white;

display:flex;
align-items:center;
justify-content:space-between;

padding:0 5%;

position:sticky;
top:0;

z-index:2000;

box-shadow:0 3px 12px rgba(0,0,0,.1);

}




.logo{

width:220px;
height:80px;

object-fit:contain;

margin-top:15px;

}




.nav ul{

display:flex;
gap:35px;
list-style:none;

}



.nav a{

text-decoration:none;
color:#333;
font-weight:600;

}


.nav a:hover{

color:#16a34a;

}





/* RIGHT */


.right{

display:flex;
align-items:center;
gap:18px;

}




.search{

position:relative;

}



.search input{

width:220px;

padding:10px 40px 10px 15px;

border:2px solid #16a34a;

border-radius:25px;

outline:none;

}



.search svg{

position:absolute;
right:15px;
top:12px;
color:#16a34a;

}





.cart{

font-size:25px;
cursor:pointer;

position:relative;

}




.badge{

position:absolute;
top:-10px;
right:-10px;

background:red;
color:white;

font-size:12px;

width:20px;
height:20px;

display:flex;
align-items:center;
justify-content:center;

border-radius:50%;

}




.profile{

width:45px;
height:45px;

border-radius:50%;

background:#16a34a;

color:white;

display:flex;
align-items:center;
justify-content:center;

font-weight:bold;

cursor:pointer;

}




.dropdown{

position:absolute;

right:0;

top:60px;

width:220px;

background:white;

border-radius:12px;

overflow:hidden;

box-shadow:0 5px 15px rgba(0,0,0,.2);

z-index:9999;

}



.item{

display:flex;

align-items:center;

gap:12px;

padding:15px;

text-decoration:none;

color:#333;

cursor:pointer;

position:relative;

z-index:10000;

}



.item:hover{

background:#f4f4f4;
color:#16a34a;

}



/* MOBILE */


.hamburger{

display:none;

font-size:28px;

color:#16a34a;

cursor:pointer;

}



@media(max-width:900px){


.main-header{

height:auto;

padding:15px;

}



.hamburger{

display:block;

}



.nav{

position:absolute;

top:95px;

left:0;

width:100%;

background:white;

display:none;

box-shadow:0 5px 10px rgba(0,0,0,.2);

}



.nav.active{

display:block;

}



.nav ul{

flex-direction:column;

padding:20px;

gap:20px;

text-align:center;

}



.right{

display:none;

}



.logo{

width:170px;

height:65px;

}


.top-content{

flex-direction:column;

gap:10px;

}



}


`}</style>





{/* TOP BAR */}

<div className="top-header">


<div className="top-content">


<div>


<Link 
className="top-link"
to="/user/contact"
>

CONTACT US

</Link>


<Link 
className="top-link"
to="/locations"
>

INDIA LOCATIONS

</Link>


</div>



<div className="language">

<button className="lang-btn">
English
</button>

<button className="lang-btn">
Marathi
</button>

<button className="lang-btn">
Hindi
</button>


</div>


</div>


</div>





{/* NAVBAR */}


<header className="main-header">



<img

src="/images/logo.jpg"

className="logo"

alt="logo"

/>




<nav className={`nav ${menuOpen ? "active":""}`}>


<ul>


<li>
<Link to="/user">
Home
</Link>
</li>


<li>
<Link to="/user/about">
About
</Link>
</li>


<li>
<Link to="/user/products">
Products
</Link>
</li>


<li>
<Link to="/user/services">
Services
</Link>
</li>


<li>
<Link to="/user/feedback">
Feedback
</Link>
</li>


</ul>


</nav>





<div className="right">


<div className="search">


<input placeholder="Search here..." />


<FaSearch/>


</div>





<div
className="cart"
onClick={()=>navigate("/cart")}
>


<FaShoppingCart/>


<span className="badge">

{cart.length}

</span>


</div>





<div style={{position:"relative"}}>


<div

className="profile"

onClick={()=>setOpen(!open)}

>

{firstLetter}

</div>




{

open &&

<div className="dropdown">



<Link

className="item"

to="/user/profile"

>

<FaUser/>

My Profile

</Link>




<Link

className="item"

to="/user/orders"

>

<FaBox/>

My Orders

</Link>




<div

className="item"

onClick={handleLogout}

>

<FaSignOutAlt/>

Logout

</div>



</div>


}



</div>


</div>






<div

className="hamburger"

onClick={()=>setMenuOpen(!menuOpen)}

>


{
menuOpen?
<FaTimes/>:
<FaBars/>
}


</div>



</header>



</>

)


}


export default UserNavbar;