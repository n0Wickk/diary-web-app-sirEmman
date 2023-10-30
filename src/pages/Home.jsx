import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import samplepfp from "../assets/pfp2.jpg";
import axios from "axios";
import config from "../../config";

export default function Home() {
  const baseUrl = config.apiUrl;

  const [username, setUsername] = useState(null); // Initially set to null
  const userId = localStorage.getItem("userId"); // Declare userId using const

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      // Fetch the username based on userId
      axios
        .get(`${baseUrl}/profile/getUserInfo/${userId}`)
        .then((response) => {
          if (response.data) {
            // Store the username
            console.log(response.data);
            setUsername(response.data.username);
          } else {
            // If the username doesn't exist, redirect to /login
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
          // Redirect to /login in case of an error
          navigate("/login");
        });
    } else {
      // If userId is not available, redirect to /login
      navigate("/login");
    }
  }, [navigate, userId]);

  return (
    <main className="p-4">
      {userId === null ? ( // Show loading or placeholder content
        <div>Loading...</div>
      ) : (
        <div className="flex justify-between items-center border-b-[1px] border-black-400 py-4">
          <div>
            <h2 className="font-bold text-2xl">Hi, {username}!</h2>
            <p className="text-grey-400">How was your day?</p>
          </div>
          <img
            src={samplepfp}
            alt="profile picture"
            className="rounded-full max-w-[4rem]"
          />
        </div>
      )}

      <div className="flex gap-4 mt-4">
        {username !== null && ( // Only show the links when username is available
          <>
            <Link
              to="/entry"
              className="bg-black-400 text-white-400 px-8 py-2 rounded-full text-sm"
            >
              Add Entry
            </Link>
            <Link
              to="/list"
              className="text-blue-400 border border-blue-400 px-8 py-2 rounded-full text-sm"
            >
              All
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
