import React, { Fragment, useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function List() {
  const octoberDates = Array.from(
    { length: 31 },
    (_, index) => new Date(2023, 9, index + 1)
  );
  const novemberDates = Array.from(
    { length: 30 },
    (_, index) => new Date(2023, 10, index + 1)
  );
  const allDates = [...octoberDates, ...novemberDates];

  const getDayOfWeek = (date) => {
    const options = { weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  };

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

  useEffect(() => {
    // Function to scroll to the current date's section
    const scrollToDateSection = () => {
      const currentDate = new Date(); // Get the current date
      const currentMonth = currentDate.getMonth();
      const currentDateNumber = currentDate.getDate();
      let targetDate = new Date(currentDate);

      // If today is the 15th or later, we'll scroll to the previous day (e.g., 14th)
      if (currentDateNumber > 1) {
        targetDate.setDate(currentDateNumber - 1);
      } else {
        // If it's the 1st of the month, scroll to the last day of the previous month
        if (currentMonth > 0) {
          targetDate = new Date(
            currentDate.getFullYear(),
            currentMonth - 1,
            31
          );
        } else {
          // If it's the first day of the year, don't scroll further back
          return;
        }
      }

      const currentSection = sectionRefs.current.find(
        (section) =>
          section.getAttribute("data-month") ===
            targetDate.getMonth().toString() &&
          section.getAttribute("data-date") === targetDate.getDate().toString()
      );

      if (currentSection) {
        currentSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToDateSection(); // Scroll to the previous date's section when the component loads
  }, []);

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

  const isCurrentDate = (date) => {
    const currentDate = new Date();
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <Fragment>
      <section
        className={`flex justify-between px-4 align-baseline sticky w-full bg-white-400 top-0 py-4 ${
          showBorder ? "border-b-[1px] border-grey-400 " : ""
        }`}
      >
        <span className="font-bold text-3xl text-blue-400">
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
        <div className="flex gap-2">
          <button className="rounded-full bg-black-400 p-2">
            <Icon
              icon="iconamoon:arrow-up-2-thin"
              color="white"
              width="24"
              rotate={3}
            />
          </button>
          <button className="rounded-full bg-black-400 p-2">
            <Icon
              icon="iconamoon:arrow-up-2-thin"
              color="white"
              width="24"
              rotate={1}
            />
          </button>
        </div>
      </section>

      <main className="mx-4">
        {allDates.map((date, index) => (
          <section
            key={index}
            ref={(ref) => (sectionRefs.current[index] = ref)}
            data-month={date.getMonth()}
            data-date={date.getDate()}
          >
            <div
              className={`mt-12 flex justify-between font-semibold border-b-[2.5px] md:border-b-[3px] ${
                isCurrentDate(date) ? "border-blue-400" : "border-black-400"
              }`}
            >
              <span
                className={` ${isCurrentDate(date) ? "text-blue-400" : ""}`}
              >
                {date.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="text-grey-400">{getDayOfWeek(date)}</span>
            </div>
            <input
              type="text"
              className="border-b-[1px] md:border-b-2  border-grey-400 min-w-full py-4 px-2"
            />
          </section>
        ))}
      </main>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="p-4 bg-grey-400 rounded-full fixed bottom-8 right-4 z-[2] transform transition-transform 
                    md:hover:scale-150 md:hover:py-6 md:right-[20vw]"
        >
          <Icon icon="ph:arrow-up-thin" color="white" width="20" rotate={0} />
        </button>
      )}
    </Fragment>
  );
}
