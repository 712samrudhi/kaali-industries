import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ManageOrders() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (id, status) => {

    axios
      .put(`${BASE_URL}/api/orders/${id}`, {
        status,
      })
      .then(() => {
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        Manage Orders
      </h1>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>
                {order.productName}
              </td>

              <td>
                {order.name}
              </td>

              <td>
                {order.phone}
              </td>

              <td>
                ₹{order.total}
              </td>

              <td>
                {order.paymentMethod}
              </td>

              <td>

                <select
                  value={order.status || "Order Placed"}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >

                  <option value="Order Placed">
                    Order Placed
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Packed">
                    Packed
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Out For Delivery">
                    Out For Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </td>

              <td>
                {order.created_at
                  ? new Date(
                      order.created_at
                    ).toLocaleString("en-IN")
                  : ""}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageOrders;

const styles = {

  container: {
    padding: "20px",
  },

  title: {
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },

};
