import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("Admin", JSON.stringify({ email, role: "admin" }));
      navigate("/adminpanel");
    } else {
      setError("Invalid admin credentials");
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
