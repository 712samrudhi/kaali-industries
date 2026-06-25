import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/feedback`
      );

      setFeedbacks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    if (!window.confirm("Delete Feedback?")) return;

    try {
      await axios.delete(
        `${BASE_URL}/feedback/${id}`
      );

      fetchFeedbacks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Farmer Feedback List</h2>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {feedbacks.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.rating} ⭐</td>
              <td>{item.feedback}</td>
              <td>
                {new Date(
                  item.created_at
                ).toLocaleDateString()}
              </td>

              <td>
                <button
                  onClick={() =>
                    deleteFeedback(item.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFeedback;
