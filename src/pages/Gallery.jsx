import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=1000&q=80",
    "https://images.unsplash.com/photo-1556711905-4bd1b6603275?w=1000&q=80",
    "https://images.unsplash.com/photo-1611934180042-da791b4091e7?w=1000&q=80",
    "https://images.unsplash.com/photo-1529528744093-6f8abeee511d?w=1000&q=80",
    "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1000&q=80",
    "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=1000&q=80",
    "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=1000&q=80",
    "https://images.unsplash.com/photo-1564979045531-fa386a275b27?w=1000&q=80",
  ];

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
    <main className="p-4">
      <h1 className="font-bold text-2xl text-grey-400">Gallery</h1>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="p-4 bg-grey-400 rounded-full fixed bottom-8 right-4 z-[2]"
        >
          <Icon icon="ph:arrow-up-thin" color="white" width="20" rotate={0} />
        </button>
      )}

      <div className="grid grid-cols-2 gap-4 py-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative ${
              index % 3 === 0 ? "col-span-2" : "col-span-1"
            } rounded-lg overflow-hidden`}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
