import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import samplepfp from "../assets/samplepfp.png";

export default function Home() {
  const [username, setUsername] = useState(null); // Initially set to null
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the username exists in local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // If username doesn't exist, redirect to /login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="p-4">
      {username === null ? ( // Show loading or placeholder content
        <div>Loading...</div>
      ) : (
        <div className="flex justify-between items-center border-b-[1px] border-black-400 py-4">
          <div>
            <h2 className="font-bold text-2xl">Hi, {username || "Bobby"}!</h2>
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
