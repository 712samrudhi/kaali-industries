import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";


function UserProductPage() {


const [products,setProducts] = useState([]);
const [filtered,setFiltered] = useState([]);
const [category,setCategory] = useState("All");


const navigate = useNavigate();
const location = useLocation();


const isUser = location.pathname.startsWith("/user");



const categories = [
 "All",
 "Fertilizer",
 "Seed",
 "Food",
 "Vegetable",
 "Fruit",
 "Grains"
];



useEffect(()=>{

axios
.get("http://localhost:5000/api/products")
.then((res)=>{

setProducts(res.data);
setFiltered(res.data);

})
.catch(err=>console.log(err));


},[]);





const handleCategory=(cat)=>{

setCategory(cat);


if(cat==="All")
{
setFiltered(products);
}

else
{

const data = products.filter(
(item)=>
item.category &&
item.category.toLowerCase() === cat.toLowerCase()
);


setFiltered(data);

}

};





const handleBuyNow=(product)=>{

navigate("/checkout",{state:product});

};





return (

<>


<div
style={{
background:"#f5f5f5",
minHeight:"100vh",
padding:"30px"
}}
>


<h1

style={{
textAlign:"center",
color:"#2e7d32",
marginBottom:"35px"
}}

>

Our Products

</h1>





<div

style={{

display:"flex",
gap:"25px",
alignItems:"flex-start"

}}

>





{/* CATEGORY SIDE */}


<div

style={{

width:"240px",
background:"#fff",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"

}}

>


<h3>
Categories
</h3>



{
categories.map((cat)=>(


<button

key={cat}

onClick={()=>handleCategory(cat)}


style={{

width:"100%",
padding:"12px",
marginTop:"10px",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",

background:
category===cat
?
"#2e7d32"
:
"#f1f1f1",

color:
category===cat
?
"white"
:
"black"

}}

>

{cat}

</button>



))

}



</div>






{/* PRODUCT SECTION */}


<div style={{flex:1}}>



<div


style={{

display:"grid",
gridTemplateColumns:
"repeat(auto-fill,minmax(280px,1fr))",

gap:"25px"

}}


>



{


filtered.length>0 ?


filtered.map((item)=>(


<div


key={item.id}


style={{

background:"#fff",
borderRadius:"12px",
overflow:"hidden",
boxShadow:
"0 3px 10px rgba(0,0,0,0.1)"

}}



>



<div

style={{

height:"250px",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"15px"

}}

>



<img


src={
item.image
?
`http://localhost:5000/uploads/${item.image}`
:
"https://via.placeholder.com/300"
}


alt={item.name}


onError={(e)=>{

e.target.src=
"https://via.placeholder.com/300";

}}



style={{

width:"100%",
height:"220px",
objectFit:"contain"

}}



/>


</div>







<div style={{padding:"15px"}}>


<h3>

{item.name}

</h3>



<p style={{color:"#666"}}>

Category : {item.category}

</p>




<h2 style={{color:"#B12704"}}>

₹ {item.price}

</h2>





<div

style={{

display:"flex",
gap:"10px"

}}

>



<button

onClick={()=>handleBuyNow(item)}

style={{

flex:1,
background:"orange",
color:"#fff",
border:"none",
padding:"12px",
borderRadius:"25px",
cursor:"pointer",
fontWeight:"bold"

}}

>

Buy Now

</button>







<button

onClick={()=>


isUser

?
navigate(`/user/product/${item.id}`)

:
navigate(`/product/${item.id}`)


}


style={{

flex:1,
background:"#232f3e",
color:"#fff",
border:"none",
padding:"12px",
borderRadius:"25px",
cursor:"pointer",
fontWeight:"bold"

}}


>

Details

</button>



</div>




</div>



</div>



))


:


<h2>
No Products Found
</h2>



}



</div>



</div>





</div>





</div>



<Footer />


</>

);


}


export default UserProductPage;