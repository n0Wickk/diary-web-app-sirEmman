import React from "react";
import { useState, useEffect } from "react";
import samplepfp from "../assets/samplepfp.png";
import { Link } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <main className="p-4">
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

      <div className="flex gap-4 mt-4">
        <Link
          to={"/entry"}
          className="bg-black-400 text-white-400 px-8 py-2 rounded-full text-sm"
        >
          Add Entry
        </Link>
        <Link
          to={"/list"}
          className="text-blue-400 border border-blue-400 px-8 py-2 rounded-full text-sm"
        >
          All
        </Link>
      </div>
    </main>
  );
}
