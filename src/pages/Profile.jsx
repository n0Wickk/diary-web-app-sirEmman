import React, { useState } from "react";
import pfp from "../assets/samplepfp.png";
import addIcon from "../assets/add.svg";

export default function Profile() {
  const [activeButton, setActiveButton] = useState("Note");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <>
      <main className="bg-blue-400 p-4">
        <section className="flex flex-col items-center gap-2 text-white-400">
          <img src={pfp} alt="" className="max-w-[100px]" />
          <h2 className="font-bold text-2xl">Bobby Hill</h2>
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
            Note
          </button>
          <button
            className={`w-full py-3 rounded-3xl button ${
              activeButton === "Recent Notes" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Recent Notes")}
          >
            Recent Notes
          </button>
        </div>

        {activeButton === "Note" ? (
          <div className="p-8 flex justify-center">
            <button>
              <img src={addIcon} alt="" />
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </>
  );
}
