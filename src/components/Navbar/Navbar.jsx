import React, { useState, useEffect } from "react";
import menuIcon from "../../assets/menu.svg";
import arrow from "../../assets/arrow.svg";
import exit from "../../assets/exit.svg";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isOnProfilePage = location.pathname === "/profile";
  const isOnGalleryPage = location.pathname === "/gallery";
  const isOnLoginPage = location.pathname === "/login";

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      return `${day} ${month}`;
    };

    setCurrentDate(getCurrentDate());
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const redirectToProfile = () => {
    window.location.href = "/profile";
  };

  const redirectToGallery = () => {
    window.location.href = "/gallery";
  };

  return (
    <>
      {isOnProfilePage ? (
        <style>{`
          body {
            background-color: #7A70DD;
          }
        `}</style>
      ) : null}

      {isOnGalleryPage ? (
        <style>{`
          body {
            background-color: #D1E99F;
          }
        `}</style>
      ) : null}

      <nav
        className={`flex justify-between p-4 text-grey-400 items-baseline
        ${isOnProfilePage ? "text-white-400" : ""}`}
      >
        <button onClick={toggleMenu} className="z-20">
          {isOnLoginPage ? null : (
            <img
              src={`${isOpen ? exit : menuIcon}`}
              className={`${isOnProfilePage ? "brightness-0 invert" : ""}`}
            />
          )}
        </button>
        <span className="font-light text-sm">{`Today - ${currentDate}`}</span>
        <span>
          {isOnProfilePage && (
            <Icon icon="material-symbols:settings" color="white" width="19" />
          )}
        </span>
      </nav>

      <section
        className={`fixed -bottom-[954px] w-full z-10 md:max-w-[600px]
        ${isOpen ? "" : "hidden"}`}
      >
        <div
          className="fixed inset-0 backdrop-blur-[2px]"
          onClick={toggleMenu}
        />
        <Link to="/login">
          <div
            className={`bg-black-400 text-white-400 rounded-t-[32px] hover:cursor-pointer slide-up
            ${isOpen ? "" : "hidden-div"}`}
            style={{ animationDelay: "0.05s" }}
            onClick={toggleMenu}
          >
            <div className="pt-10 pb-[1000px] px-4 group hover:mb-6 transition-all duration-300">
              <div className="flex justify-between">
                <span className="text-grey-400">Last updated - 01 Oct</span>
                <img
                  src={arrow}
                  alt=""
                  className="md:mr-8 transition-all duration-300 group-hover:mr-0 md:w-2"
                />
              </div>
              <div className="text-xl font-bold mt-2">
                <h2>Diary Listing</h2>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/gallery">
          <div
            className={`bg-green-400 text-grey-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up
            ${isOpen ? "" : "hidden-div"}`}
            style={{ animationDelay: "0.2s" }}
            onClick={toggleMenu}
          >
            <div className="pt-10 pb-[1000px] px-4 group hover:mb-6 transition-all duration-300">
              <div className="flex justify-between">
                <span className="text-grey-400">Last updated - 01 Oct</span>
                <img
                  src={arrow}
                  className="filter brightness-50 md:mr-8 transition-all duration-300 group-hover:mr-0 md:w-2"
                />
              </div>
              <div className="text-xl font-bold mt-2">
                <h2>Gallery</h2>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/profile">
          <div
            className={`bg-blue-400 text-white-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up
            ${isOpen ? "" : "hidden-div"}`}
            style={{ animationDelay: "0.4s" }}
            onClick={toggleMenu}
          >
            <div className="pt-10 pb-[1000px] px-4 group">
              <div className="flex justify-between">
                <span>Last updated - 01 Oct</span>
                <img
                  src={arrow}
                  className="md:mr-8 transition-all duration-300 group-hover:mr-0 md:w-2"
                />
              </div>
              <div className="text-xl font-bold mt-2">
                <h2>Profile</h2>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
