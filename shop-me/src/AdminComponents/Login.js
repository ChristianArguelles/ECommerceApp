//Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin" && password === "admin") {
      setErrorMessage(""); 
      navigate("/dashboard"); //back to dashboardd
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form onSubmit={handleLogin}>
        <h2
          style={{
            marginBottom: "20px",
            color: "#007BFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Admin Login
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", color: "#333" }}>
            Email:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
            placeholder="Enter email"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", color: "#333" }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
            placeholder="Enter password"
          />
        </div>
        {errorMessage && (
          <p
            style={{
              color: "red",
              marginBottom: "20px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#007BFF")
          }
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;