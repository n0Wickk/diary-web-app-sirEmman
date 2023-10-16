import React from "react";

function DateSection({
  date,
  isCurrent,
  handleInputChange,
  onBlur,
  sectionRef,
  getDayOfWeek,
}) {
  const monthValue = date.getMonth().toString();
  const dateValue = date.getDate().toString();

  return (
    <section ref={sectionRef} data-month={monthValue} data-date={dateValue}>
      <div
        className={`mt-12 flex justify-between font-semibold border-b-[2.5px] md:border-b-[3px] ${
          isCurrent ? "border-blue-400" : "border-black-400"
        }`}
      >
        <span className={` ${isCurrent ? "text-blue-400" : ""}`}>
          {date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </span>
        <span className="text-grey-400">{getDayOfWeek(date)}</span>
      </div>
      <input
        type="text"
        className="border-b-[1px] md:border-b-2 border-grey-400 min-w-full py-4 px-2"
        onBlur={onBlur}
        onChange={handleInputChange}
      />
    </section>
  );
}

export default DateSection;
