import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const saveCart = (data) => {
    setCart(data);
    localStorage.setItem("cart", JSON.stringify(data));
  };

  const increaseQty = (index) => {
    let data = [...cart];
    data[index].qty = Number(data[index].qty || 1) + 1;
    saveCart(data);
  };

  const decreaseQty = (index) => {
    let data = [...cart];
    if (data[index].qty > 1) data[index].qty--;
    saveCart(data);
  };

  const removeItem = (index) => {
    let data = cart.filter((_, i) => i !== index);
    saveCart(data);
  };

  const totalItems = cart.reduce((a, b) => a + Number(b.qty || 1), 0);
  const totalPrice = cart.reduce((a, b) => a + (Number(b.price) * Number(b.qty || 1)), 0);

  const checkout = () => {
    localStorage.setItem("checkoutProduct", JSON.stringify({ items: cart, totalItems, totalPrice }));
    navigate("/checkout");
  };

  return (
    <div style={styles.container}>
      <h2>🛒 My Cart</h2>
      <div style={styles.wrapper}>
        <div style={styles.left}>
          {cart.map((item, index) => (
            <div style={styles.card} key={index}>
              <img src={`${BASE_URL}/uploads/${item.image}`} style={styles.img} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Price ₹{item.price}</p>
                <p>Variant : {item.ml}</p>
                <button onClick={() => decreaseQty(index)}>-</button>
                <span> {item.qty || 1} </span>
                <button onClick={() => increaseQty(index)}>+</button>
                <p>Subtotal ₹{item.price * (item.qty || 1)}</p>
                <button onClick={() => removeItem(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.right}>
          <h2>Order Summary</h2>
          <h3>Total Items : {totalItems}</h3>
          <h3>Total Amount : ₹{totalPrice}</h3>
          <button onClick={checkout} style={styles.button}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

const styles = {
  container: { padding: "30px", background: "#f5f5f5", minHeight: "100vh" },
  wrapper: { display: "flex", gap: "30px" },
  left: { width: "60%" },
  right: { width: "40%", background: "#fff", padding: "20px", height: "fit-content" },
  card: { display: "flex", gap: "20px", background: "#fff", padding: "20px", marginBottom: "15px" },
  img: { width: "120px", height: "120px", objectFit: "contain" },
  button: { padding: "12px", background: "green", color: "white", border: "none", cursor: "pointer" },
};
