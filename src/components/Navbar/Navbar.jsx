import React from "react";
import menuIcon from "../../assets/menu.svg";
import arrow from "../../assets/arrow.svg";
import exit from "../../assets/exit.svg";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

function Navbar({
  isOnProfilePage,
  isOnGalleryPage,
  isOnLoginPage,
  isOnEntryPage,
  isOpen,
  currentDate,
  toggleMenu,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sourceParam = searchParams.get("source");

  // Conditionally set the 'to' value based on the presence of 'source' parameter
  const toValue = sourceParam ? "/profile" : "/list";

  return (
    <>
      {isOnProfilePage && (
        <style>{`
          body {
            background-color: #7A70DD;
          }
        `}</style>
      )}

      {isOnGalleryPage && (
        <style>{`
          body {
            background-color: #D1E99F;
          }
        `}</style>
      )}

      <nav
        className={`flex justify-between p-4 text-grey-400 items-center ${
          isOnProfilePage ? "text-white-400" : ""
        }`}
      >
        <button onClick={toggleMenu} className="z-20">
          {isOnLoginPage ? null : (
            <img
              src={`${isOpen ? exit : menuIcon}`}
              className={`${isOnProfilePage ? "brightness-0 invert" : ""}`}
              alt="Menu"
            />
          )}
        </button>

        {isOnEntryPage ? (
          <span>Write</span>
        ) : (
          <Link
            to="/"
            className="font-light text-sm"
          >{`Today - ${currentDate}`}</Link>
        )}
        <span>
          {isOnProfilePage && (
            <Icon icon="material-symbols:settings" color="white" width="19" />
          )}

          {isOnEntryPage && (
            <Link to={toValue}>
              <Icon
                icon="iconamoon:close-light"
                color="#8e91a0"
                width="28"
                rotate={1}
              />
            </Link>
          )}
        </span>
      </nav>

      <section
        className={`fixed -bottom-[954px] w-full z-10 md:max-w-[600px] ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 backdrop-blur-[2px]"
          onClick={toggleMenu}
        />
        <Link to="/list">
          <div
            className={`bg-black-400 text-white-400 rounded-t-[32px] hover:cursor-pointer slide-up ${
              isOpen ? "" : "hidden-div"
            }`}
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
            className={`bg-green-400 text-grey-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up ${
              isOpen ? "" : "hidden-div"
            }`}
            style={{ animationDelay: "0.2s" }}
            onClick={toggleMenu}
          >
            <div className="pt-10 pb-[1000px] px-4 group hover:mb-6 transition-all duration-300">
              <div className="flex justify-between">
                <span className="text-grey-400">Last updated - 01 Oct</span>
                <img
                  src={arrow}
                  className="filter brightness-50 md:mr-8 transition-all duration-300 group-hover:mr-0 md:w-2"
                  alt="Arrow"
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
            className={`bg-blue-400 text-white-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up ${
              isOpen ? "" : "hidden-div"
            }`}
            style={{ animationDelay: "0.4s" }}
            onClick={toggleMenu}
          >
            <div className="pt-10 pb-[1000px] px-4 group">
              <div className="flex justify-between">
                <span>Last updated - 01 Oct</span>
                <img
                  src={arrow}
                  className="md:mr-8 transition-all duration-300 group-hover:mr-0 md:w-2"
                  alt="Arrow"
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

export default Navbar;
