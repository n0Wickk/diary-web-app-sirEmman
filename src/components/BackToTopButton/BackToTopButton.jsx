import React from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useEffect } from "react";

function BackToTopButton({}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to check scroll position
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="p-4 bg-grey-400 rounded-full fixed bottom-8 right-4 z-[2] transform transition-transform md:hover:scale-150 md:hover:py-6 md:right-[20vw]"
        >
          <Icon icon="ph:arrow-up-thin" color="white" width="20" rotate={0} />
        </button>
      )}
    </div>
  );
}

export default BackToTopButton;
