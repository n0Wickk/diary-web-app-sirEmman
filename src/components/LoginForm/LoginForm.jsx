import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";

export default function LoginForm() {
  const baseUrl = config.apiUrl;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    axios
      .post(`${baseUrl}/auth`, formData)
      .then((response) => {
        if (response.data) {
          // Store the user ID in local storage
          localStorage.setItem("userId", response.data.userId);

          console.log("logged in");
          setMessage("Login successful");
          navigate("/");
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setMessage("Login failed. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col py-9 gap-3">
      <div className="flex items-center gap-4 justify-between">
        <span className="w-[10%]">
          {/* Placeholder for icon */}
          <Icon icon="teenyicons:user-solid" color="#7a70dd" width="20" />
        </span>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Username"
          className="w-full p-4 border-b border-grey-400 placeholder-grey-400 focus:border rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4 justify-around">
        <span className="w-[10%]">
          {/* Placeholder for icon */}
          <Icon icon="teenyicons:lock-solid" color="#7a70dd" width="20" />
        </span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full p-4 border-b border-grey-400 placeholder-grey-400 focus:border rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>

      <Link to="/register" className="text-end py-2 text-sm text-blue-400">
        Don't have an account?
      </Link>

      <button
        className="py-4 px-10 bg-blue-400 rounded-2xl text-white-400 flex justify-center items-center gap-2 hover:gap-8 transition-all duration-300"
        type="submit"
      >
        Login
        <Icon icon="ph:arrow-up-thin" width="20" color="white" rotate={1} />
      </button>
    </form>
  );
}
