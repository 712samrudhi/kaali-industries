import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const farmer = JSON.parse(localStorage.getItem("farmer"));
    if (!farmer) return;
    axios.get(`${BASE_URL}/api/orders`)
      .then((res) => {
        if (res.data.success) {
          const farmerOrders = res.data.orders.filter(
            order => Number(order.farmer_id) === Number(farmer.farmer_id)
          );
          setOrders(farmerOrders);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const getStep = (status) => {
    switch (status) {
      case "Order Placed": return 1;
      case "Confirmed": return 2;
      case "Packed": return 3;
      case "Shipped": return 4;
      case "Out For Delivery": return 5;
      case "Delivered": return 6;
      default: return 1;
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My Orders</h1>
      {orders.length === 0 ? (
        <div style={styles.empty}><h2>No Orders Found</h2></div>
      ) : (
        orders.map((order, index) => {
          const step = getStep(order.status);
          return (
            <div key={order.id || index} style={styles.orderCard}>
              <div style={styles.productRow}>
                <img src={`${BASE_URL}/uploads/${order.productImage}`} alt={order.productName} style={styles.productImg} />
                <div style={styles.details}>
                  <h2>{order.productName}</h2>
                  <p><b>Order ID:</b> #{order.id}</p>
                  <p><b>Order Date:</b> {order.created_at ? new Date(order.created_at).toLocaleString("en-IN") : "N/A"}</p>
                  <p><b>Variant:</b> {order.variant}</p>
                  <p><b>Price:</b> ₹{order.price}</p>
                  <p><b>Quantity:</b> {order.quantity}</p>
                  <h2 style={styles.price}>Total ₹{order.total}</h2>
                  <div style={styles.status}>{order.status || "Order Placed"}</div>

                  <div style={styles.trackContainer}>
                    <div style={{ ...styles.trackStep, ...(step >= 1 ? styles.active : {}) }}>
                      ✓<br />Ordered<br />
                      <small>{order.created_at ? new Date(order.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : ""}</small>
                    </div>
                    <div style={{ ...styles.trackStep, ...(step >= 4 ? styles.active : {}) }}>
                      🚚<br />Shipped<br />
                      <small>{step >= 4 && order.shipped_date ? new Date(order.shipped_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : ""}</small>
                    </div>
                    <div style={{ ...styles.trackStep, ...(step >= 5 ? styles.active : {}) }}>
                      🚚<br />Out For Delivery<br />
                      <small>{step >= 5 && order.delivery_date ? new Date(order.delivery_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : ""}</small>
                    </div>
                    <div style={{ ...styles.trackStep, ...(step >= 6 ? styles.active : {}) }}>
                      ✓<br />Delivered<br />
                      <small>{step >= 6 && order.delivered_date ? new Date(order.delivered_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : ""}</small>
                    </div>
                  </div>

                  <hr />
                  <h3>Delivery Details</h3>
                  <p><b>Name:</b> {order.name}</p>
                  <p><b>Phone:</b> {order.phone}</p>
                  <p><b>Address:</b> {order.address}</p>
                  <p><b>City:</b> {order.city}</p>
                  <p><b>Pincode:</b> {order.pincode}</p>
                  <p><b>Payment Method:</b> {order.paymentMethod}</p>
                </div>
              </div>
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
  productRow: { display: "flex", gap: "25px", flexWrap: "wrap" },
  productImg: { width: "180px", height: "180px", objectFit: "contain", border: "1px solid #ddd", borderRadius: "10px", padding: "10px" },
  details: { flex: 1 },
  price: { color: "green" },
  status: { display: "inline-block", background: "#e8f5e9", color: "green", padding: "8px 15px", borderRadius: "20px", fontWeight: "bold", margin: "10px 0" },
  trackContainer: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" },
  trackStep: { padding: "15px", borderRadius: "20px", background: "#ddd", fontSize: "14px", textAlign: "center", minWidth: "100px" },
  active: { background: "#4CAF50", color: "#fff" },
  empty: { background: "#fff", padding: "50px", textAlign: "center", borderRadius: "10px" },
};
