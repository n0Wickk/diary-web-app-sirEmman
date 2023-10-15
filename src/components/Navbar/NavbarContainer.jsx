import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

function NavbarContainer() {
  const location = useLocation();
  const isOnProfilePage = location.pathname === "/profile";
  const isOnGalleryPage = location.pathname === "/gallery";
  const isOnLoginPage = location.pathname === "/login";
  const isOnEntryPage = location.pathname === "/entry";

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

  return (
    <Navbar
      isOnProfilePage={isOnProfilePage}
      isOnGalleryPage={isOnGalleryPage}
      isOnLoginPage={isOnLoginPage}
      isOnEntryPage={isOnEntryPage}
      isOpen={isOpen}
      currentDate={currentDate}
      toggleMenu={toggleMenu}
    />
  );
}

export default NavbarContainer;
