import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import config from "../../config";

function RegistrationForm() {
  const baseUrl = config.apiUrl;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "",
    gender: "",
    youtube_url: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState(""); // To display the registration message

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    // Send a POST request to registration.php
    axios
      .post(`${baseUrl}/auth/register`, formData)
      .then((response) => {
        console.log(response.data);
        // setRegistrationMessage(response.data); // Display the registration message
        // Clear the form inputs
        setFormData({
          username: "",
          password: "",
          bio: "",
          gender: "",
          youtube_url: "",
        });
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        // Handle error as needed
      });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg">
      <h2 className="text-2xl text-center mb-4">Register</h2>
      {registrationMessage && (
        <p className="text-green-500 text-center mb-4">{registrationMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            placeholder="Enter yo username"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            placeholder="Enter yo password"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            placeholder="Enter yo gender"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            placeholder="Enter yo bio"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="youtube_url"
            value={formData.youtube_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            placeholder="Enter youtube url that best describes you"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="flex gap-2 mx-auto bg-blue-400 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
          >
            Register
            <span>
              <Icon
                icon="solar:arrow-up-linear"
                color="white"
                width="24"
                height="24"
                rotate={1}
              />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
