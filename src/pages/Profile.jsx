import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pfp from "../assets/pfp2.jpg";
import addIcon from "../assets/add.svg";
import { Icon } from "@iconify/react";
import axios from "axios";
import config from "../../config";

export default function Profile() {
  const baseUrl = config.apiUrl;

  const [activeButton, setActiveButton] = useState("Note");
  const [userData, setUserData] = useState({});
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");

  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  useEffect(() => {
    // Fetch the user data from your API based on the userId in localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`${baseUrl}/profile/getUserInfo/${userId}`)
        .then((response) => {
          if (response.data) {
            setUserData(response.data);
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleIconToggle = () => {
    setIsOnEditMode(!isOnEditMode);
  };

  const handleSaveUsername = () => {
    // Save the edited username to local storage
    localStorage.setItem("username", editedUsername);
    setIsOnEditMode(false);
  };

  const youtubeUrl =
    "https://www.youtube.com/embed/lTRiuFIWV54?autoplay=1&controls=0&loop=1&playlist=lTRiuFIWV54";

  return (
    <>
      <main className="bg-blue-400 p-4">
        <iframe
          title="Background Music"
          src={youtubeUrl}
          allow="autoplay"
          className="hidden"
        ></iframe>
        <section className="flex flex-col items-center gap-2 text-white-400">
          <img src={pfp} alt="" className="max-w-[100px] rounded-full" />
          <div className="flex items-center justify-center gap-2">
            {isOnEditMode ? (
              <input
                className="font-bold text-2xl w-full bg-transparent border-b border-white-400 focus:outline-none max-w-[50vw] "
                value={userData.username}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
            ) : (
              <h2 className="font-bold text-2xl">
                {userData.username || "Bobby"}
              </h2>
            )}
            {isOnEditMode ? (
              <button onClick={handleSaveUsername}>
                {/* <Icon icon="carbon:save" color="white" width={24} /> */}
              </button>
            ) : (
              <button onClick={handleIconToggle}>
                {/* <Icon icon="carbon:edit" color="white" width={24} /> */}
              </button>
            )}
          </div>
          <p className="">{userData.bio}</p>
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
            Video that describes me
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
          <div>
            <iframe src={userData.url} className="mx-auto p-8"></iframe>
          </div>
        )}
      </section>
    </>
  );
}
