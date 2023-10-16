import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

function NavbarContainer() {
  const location = useLocation();
  const isOnProfilePage = location.pathname === "/profile";
  const isOnGalleryPage = location.pathname === "/gallery";
  const isOnLoginPage = location.pathname === "/";
  const isOnEntryPage = window.location.pathname.startsWith("/entry");
  const isOnTestPage = location.pathname === "/test";

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

  useEffect(() => {
    if (isOnTestPage) {
      setIsOpen(!isOpen);
    }
  }, [isOnTestPage]);

  return (
    <Navbar
      isOnProfilePage={isOnProfilePage}
      isOnGalleryPage={isOnGalleryPage}
      isOnLoginPage={isOnLoginPage}
      isOnEntryPage={isOnEntryPage}
      isOnTestPage={isOnTestPage}
      isOpen={isOpen}
      currentDate={currentDate}
      toggleMenu={toggleMenu}
    />
  );
}

export default NavbarContainer;
