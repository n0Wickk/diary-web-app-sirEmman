import React, { useEffect, useRef } from "react";
import DateSection from "./DateSection";

function DateList({
  allDates,
  isCurrentDate,
  handleInputChange,
  onBlur,
  getDayOfWeek,
  diaryEntries,
}) {
  const sectionRefs = useRef([]);

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

  return (
    <main className="mx-4">
      {allDates.map((date, index) => (
        <DateSection
          key={index}
          date={date}
          isCurrent={isCurrentDate(date)}
          handleInputChange={handleInputChange}
          onBlur={onBlur}
          sectionRef={(ref) => (sectionRefs.current[index] = ref)}
          getDayOfWeek={getDayOfWeek}
        >
          {/* Display diary entries for this date */}
          {diaryEntries
            .filter((entry) => entry.date === date.toISOString().split("T")[0])
            .map((entry, entryIndex) => (
              <div key={entryIndex}>
                <div className="font-semibold">{entry.title}</div>
                <div>{entry.content}</div>
                <div>Category: {entry.category}</div>
                {/* You can add more details here if needed */}
              </div>
            ))}
        </DateSection>
      ))}
    </main>
  );
}

export default DateList;
