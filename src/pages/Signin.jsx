import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Signin = () => {
  const navigate = useNavigate();
  const { updateCartCount } = useContext(CartContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  // Yup schema for login validation
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      setLoginError("");

      // Get user from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user")) || [];
      const AUser = storedUser.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (AUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: AUser.email,
            password: AUser.password,
            name: AUser.name,
          })
        );

        localStorage.removeItem("simulateLogout"); // clear simulated logout

        // Restore user-specific cart
        const savedCart =
          JSON.parse(localStorage.getItem(`cart_${AUser.email}`)) || [];
        localStorage.setItem("cart", JSON.stringify(savedCart));

        updateCartCount();
        navigate("/");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center mb-4">Log In</h1>

        {loginError && (
          <p className="text-red-500 text-sm text-center">{loginError}</p>
        )}

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition duration-300"
        >
          Log In
        </button>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
