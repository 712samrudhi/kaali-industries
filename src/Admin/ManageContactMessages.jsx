import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ManageContactMessages() {

const [messages, setMessages] = useState([]);

useEffect(() => {
fetchMessages();
}, []);

const fetchMessages = async () => {


try {

  const res = await axios.get(
    `${BASE_URL}/contact-messages`
  );

  setMessages(res.data.messages);

} catch (error) {

  console.log(error);

}


};

return (
<div
style={{
padding: "30px"
}}
>
<h1
style={{
textAlign: "center",
marginBottom: "30px"
}}
>
Contact Messages </h1>


  <table
    style={{
      width: "100%",
      borderCollapse: "collapse"
    }}
  >
    <thead>
      <tr style={{ background: "#2e7d32", color: "#fff" }}>
        <th style={thStyle}>ID</th>
        <th style={thStyle}>Name</th>
        <th style={thStyle}>Email</th>
        <th style={thStyle}>Message</th>
        <th style={thStyle}>Date</th>
      </tr>
    </thead>

    <tbody>
      {messages.map((msg) => (
        <tr key={msg.id}>
          <td style={tdStyle}>{msg.id}</td>
          <td style={tdStyle}>{msg.name}</td>
          <td style={tdStyle}>{msg.email}</td>
          <td style={tdStyle}>{msg.message}</td>
          <td style={tdStyle}>
            {new Date(msg.created_at).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}

const thStyle = {
border: "1px solid #ddd",
padding: "12px"
};

const tdStyle = {
border: "1px solid #ddd",
padding: "12px"
};

export default ManageContactMessages;
