import React from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function ListHeader({ currentMonth }) {
  const [showBorder, setShowBorder] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Get the current scroll position
      const scrollPosition = window.scrollY;

      // Check if the user is scrolling down
      if (scrollPosition > 0) {
        setShowBorder(true);
      } else {
        setShowBorder(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <section
      className={`flex justify-between px-4 align-baseline sticky w-full bg-white-400 top-0 py-4 ${
        showBorder ? "border-b-[1px] border-grey-400 " : ""
      }`}
    >
      <span className="font-bold text-3xl text-blue-400">{currentMonth}</span>
      <div className="flex gap-2">
        <button className="rounded-full bg-black-400 p-2 hover:scale-110 transition-all duration-300">
          <Icon
            icon="iconamoon:arrow-up-2-thin"
            color="white"
            width="24"
            rotate={3}
          />
        </button>
        <button className="rounded-full bg-black-400 p-2 hover:scale-110 transition-all duration-300">
          <Icon
            icon="iconamoon:arrow-up-2-thin"
            color="white"
            width="24"
            rotate={1}
          />
        </button>
      </div>
    </section>
  );
}

export default ListHeader;
