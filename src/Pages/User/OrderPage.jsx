import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config";

const STEPS = ["Ordered", "Shipped", "Out For Delivery", "Delivered"];

function OrderPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const farmer = JSON.parse(localStorage.getItem("farmer"));
    if (!farmer) return;
    axios.get(`${BASE_URL}/api/orders/farmer/${farmer.farmer_id}`)
      .then((res) => {
        if (res.data.success) setOrders(res.data.orders);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrders(); // initial load

    // dar 5 second nī orders auto-refresh honyasathi
    // (admin ne status update kelyavar, ithe reload न karता automatically dakhel)
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const getStepIndex = (status) => {
    const idx = STEPS.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My Orders</h1>
      {orders.length === 0 ? (
        <div style={styles.empty}><h2>No Orders Found</h2></div>
      ) : (
        orders.map((order) => {
          const activeIndex = getStepIndex(order.status);
          return (
            <div key={order.order_id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <p><b>Order ID:</b> {order.order_id}</p>
                <p><b>Order Date:</b> {order.created_at ? new Date(order.created_at).toLocaleString("en-IN") : "N/A"}</p>
                <div style={styles.status}>{order.status || "Ordered"}</div>
              </div>

              {/* ===== STATUS TRACKER ===== */}
              <div style={styles.trackContainer}>
                {STEPS.map((step, index) => {
                  const isDone = index <= activeIndex;
                  const dateField =
                    step === "Shipped" ? order.shipped_date :
                    step === "Out For Delivery" ? order.delivery_date :
                    step === "Delivered" ? order.delivered_date :
                    order.created_at;
                  return (
                    <div
                      key={step}
                      style={{ ...styles.trackStep, ...(isDone ? styles.active : {}) }}
                    >
                      {isDone ? "✓" : index + 1}<br />
                      {step}<br />
                      <small>
                        {isDone && dateField
                          ? new Date(dateField).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
                          : ""}
                      </small>
                    </div>
                  );
                })}
              </div>

              {/* ===== PRODUCTS IN THIS ORDER ===== */}
              {order.items.map((item) => (
                <div key={item.id} style={styles.productRow}>
                  <img
                    src={`${BASE_URL}/uploads/${item.productImage}`}
                    alt={item.productName}
                    style={styles.productImg}
                  />
                  <div style={styles.details}>
                    <h2>{item.productName}</h2>
                    <p><b>Variant:</b> {item.variant}</p>
                    <p><b>Price:</b> ₹{item.price}</p>
                    <p><b>Quantity:</b> {item.quantity}</p>
                    <p><b>Subtotal:</b> ₹{item.subtotal}</p>
                  </div>
                </div>
              ))}

              <h2 style={styles.price}>Order Total: ₹{order.total}</h2>

              <hr />
              <h3>Delivery Details</h3>
              <p><b>Name:</b> {order.name}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>City:</b> {order.city}</p>
              <p><b>Pincode:</b> {order.pincode}</p>
              <p><b>Payment Method:</b> {order.paymentMethod}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default OrderPage;

const styles = {
  page: { background: "#f5f5f5", minHeight: "100vh", padding: "30px" },
  title: { marginBottom: "25px" },
  orderCard: { background: "#fff", borderRadius: "12px", padding: "25px", marginBottom: "25px", boxShadow: "0 3px 12px rgba(0,0,0,0.15)" },
  orderHeader: { marginBottom: "10px" },
  productRow: { display: "flex", gap: "25px", flexWrap: "wrap", marginBottom: "15px", borderTop: "1px solid #eee", paddingTop: "15px" },
  productImg: { width: "120px", height: "120px", objectFit: "contain", border: "1px solid #ddd", borderRadius: "10px", padding: "10px" },
  details: { flex: 1 },
  price: { color: "green" },
  status: { display: "inline-block", background: "#e8f5e9", color: "green", padding: "8px 15px", borderRadius: "20px", fontWeight: "bold", margin: "10px 0" },
  trackContainer: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" },
  trackStep: { padding: "15px", borderRadius: "20px", background: "#ddd", fontSize: "14px", textAlign: "center", minWidth: "100px" },
  active: { background: "#4CAF50", color: "#fff" },
  empty: { background: "#fff", padding: "50px", textAlign: "center", borderRadius: "10px" },
};