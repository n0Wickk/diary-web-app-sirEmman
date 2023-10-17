import React, { useState, useEffect } from "react";
import pfp from "../assets/samplepfp.png";
import addIcon from "../assets/add.svg";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Profile() {
  const [activeButton, setActiveButton] = useState("Note");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const [isOnEditMode, setIsOnEditMode] = useState(false);

  const handleIconToggle = () => {
    setIsOnEditMode(!isOnEditMode);
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSaveUsername = () => {
    // Save the edited username to local storage
    localStorage.setItem("username", username);
    setIsOnEditMode(false);
  };

  return (
    <>
      <main className="bg-blue-400 p-4">
        <section className="flex flex-col items-center gap-2 text-white-400">
          <img src={pfp} alt="" className="max-w-[100px]" />
          <div className="flex items-center justify-center gap-2">
            {isOnEditMode ? (
              <input
                className="font-bold text-2xl w-full bg-transparent border-b border-white-400 focus:outline-none "
                value={username || "Bobby Hill"}
                onChange={handleInputChange}
              />
            ) : (
              <h2 className="font-bold text-2xl">{username || "Bobby Hill"}</h2>
            )}
            {isOnEditMode ? (
              <button onClick={handleSaveUsername}>
                <Icon icon="carbon:save" color="white" width={24} />
              </button>
            ) : (
              <button onClick={handleIconToggle}>
                <Icon icon="carbon:edit" color="white" width={24} />
              </button>
            )}
          </div>
          <p className="">I like turtles!</p>
        </section>
      </main>

      <section
        className="mt-4 bg-white-400 p-4 fixed w-full h-[400px] bottom-0 rounded-t-[32px] z-0 max-w-[600px]
                          md:h-[350px]"
      >
        <div className="text-sm flex justify-around gap-4">
          <button
            className={`w-full py-3 rounded-3xl button ${
              activeButton === "Note" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Note")}
          >
            Entry
          </button>
          <button
            className={`w-full py-3 rounded-3xl button ${
              activeButton === "Recent Notes" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Recent Notes")}
          >
            Recent Entries
          </button>
        </div>

        {activeButton === "Note" ? (
          <div className="p-8 flex justify-center">
            <Link
              to="/entry?source=profile"
              className="hover:scale-125 transition-all duration-300"
            >
              <img src={addIcon} alt="" />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </>
  );
}
