import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const UserForm = ({ onUserAdded }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users", user);
      onUserAdded(); // Refresh user list
      setUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const handleClear = () => {
    setUser({ name: "", email: "" }); // Clear form manually
  };

  return (
    <div class="container">
      <h1>Enter Name and Email</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name*</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
