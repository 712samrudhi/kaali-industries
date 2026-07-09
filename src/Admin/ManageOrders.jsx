import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

const STEPS = ["Ordered", "Shipped", "Out For Delivery", "Delivered"];

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null); // konta order sadhya update hotoy

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => {
        if (res.data.success) setOrders(res.data.orders);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (orderId, status) => {
    if (updatingOrderId) return; // ek update chalu asताना duसरा rokha (double-click guard)

    const confirmChange = window.confirm(
      `Are you sure you want to mark this order as "${status}"?`
    );
    if (!confirmChange) return;

    setUpdatingOrderId(orderId);
    axios
      .put(`${BASE_URL}/api/orders/${orderId}`, { status })
      .then(() => fetchOrders())
      .catch((err) => {
        console.log(err);
        alert("Status update failed, try again!"); // ata fail zala tar admin la kalel
      })
      .finally(() => setUpdatingOrderId(null));
  };

  const currentStepIndex = (status) => {
    const idx = STEPS.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Manage Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manage Orders</h1>

      {orders.length === 0 ? (
        <div style={styles.empty}>
          <h2>No Orders Found</h2>
        </div>
      ) : (
        orders.map((order) => {
          const activeIndex = currentStepIndex(order.status);
          const isUpdatingThisOrder = updatingOrderId === order.order_id;

          return (
            <div key={order.order_id} style={styles.card}>
              <div style={styles.headerRow}>
                <div>
                  <strong>Order ID:</strong> {order.order_id}
                  <br />
                  <strong>Customer:</strong> {order.name} | {order.phone}
                  <br />
                  <strong>Address:</strong> {order.address}, {order.city} - {order.pincode}
                  <br />
                  <strong>Payment:</strong> {order.paymentMethod}
                  <br />
                  <strong>Date:</strong>{" "}
                  {order.created_at ? new Date(order.created_at).toLocaleString("en-IN") : ""}
                </div>
              </div>

              {/* ===== STATUS TRACKER ===== */}
              <div style={styles.tracker}>
                {STEPS.map((step, index) => {
                  const isDone = index <= activeIndex;
                  return (
                    <div key={step} style={styles.stepWrapper}>
                      <button
                        type="button"
                        onClick={() => updateStatus(order.order_id, step)}
                        disabled={isUpdatingThisOrder}
                        style={{
                          ...styles.stepCircle,
                          background: isDone ? "green" : "#ddd",
                          color: isDone ? "#fff" : "#555",
                          cursor: isUpdatingThisOrder ? "not-allowed" : "pointer",
                          opacity: isUpdatingThisOrder ? 0.6 : 1,
                        }}
                        title={`Mark as ${step}`}
                      >
                        {isDone ? "✓" : index + 1}
                      </button>
                      <span style={styles.stepLabel}>{step}</span>
                      {index !== STEPS.length - 1 && (
                        <div
                          style={{
                            ...styles.stepLine,
                            background: index < activeIndex ? "green" : "#ddd",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {isUpdatingThisOrder && (
                <p style={styles.updatingText}>Updating status...</p>
              )}

              {/* ===== PRODUCTS TABLE ===== */}
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Variant</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.items || []).map((item) => (
                    <tr key={`${order.order_id}-${item.id}`}>
                      <td>
                        {item.productImage ? (
                          <img
                            src={`${BASE_URL}/uploads/${item.productImage}`}
                            alt={item.productName}
                            style={styles.image}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.variant}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 style={styles.total}>Order Total: ₹{order.total}</h3>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ManageOrders;

const styles = {
  container: { padding: "20px" },
  title: { marginBottom: "20px" },
  card: {
    background: "#fff",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  headerRow: {
    marginBottom: "12px",
  },
  tracker: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
    flexWrap: "wrap",
  },
  stepWrapper: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: "120px",
    position: "relative",
    flexDirection: "column",
  },
  stepCircle: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "none",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    fontSize: "12px",
    marginTop: "6px",
    textAlign: "center",
  },
  stepLine: {
    position: "absolute",
    top: "17px",
    left: "50%",
    width: "100%",
    height: "3px",
    zIndex: -1,
  },
  updatingText: {
    fontSize: "13px",
    color: "#888",
    fontStyle: "italic",
    marginTop: "-8px",
    marginBottom: "8px",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  image: { width: "60px", height: "60px", objectFit: "contain" },
  total: { textAlign: "right", color: "green", marginTop: "10px" },
  empty: { background: "#fff", padding: "40px", textAlign: "center", borderRadius: "10px" },
};