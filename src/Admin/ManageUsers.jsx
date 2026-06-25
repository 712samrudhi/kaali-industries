import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/users/${id}`);
      alert("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.address}</td>
                <td>{user.username}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>

      <style>{`
        .manage-users-container{
          padding:20px;
        }

        .manage-users-container h2{
          text-align:center;
          color:#11998e;
          margin-bottom:20px;
        }

        table{
          width:100%;
          border-collapse:collapse;
          background:#fff;
          box-shadow:0 0 10px rgba(0,0,0,0.1);
        }

        th{
          background:#11998e;
          color:white;
          padding:12px;
        }

        td{
          border:1px solid #ddd;
          padding:10px;
          text-align:center;
        }

        .delete-btn{
          background:red;
          color:white;
          border:none;
          padding:8px 12px;
          border-radius:5px;
          cursor:pointer;
        }

        .delete-btn:hover{
          opacity:0.8;
        }
      `}</style>
    </div>
  );
}

export default ManageUsers;
