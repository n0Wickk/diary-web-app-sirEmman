// List.js
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateList from "./DateList";
import ListHeader from "./ListHeader";
import BackToTopButton from "../../components/BackToTopButton";

function List() {
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

  const isCurrentDate = (date) => {
    const currentDate = new Date();
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const navigate = useNavigate();
  const [inputHasContent, setInputHasContent] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputHasContent(!!inputValue);
    setTitleInput(inputValue);
  };

  const onBlur = () => {
    if (inputHasContent) {
      navigate(`/entry/${encodeURIComponent(titleInput)}`);
    }
  };

  return (
    <Fragment>
      <ListHeader
        currentMonth={new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}
      />

      <DateList
        allDates={allDates}
        isCurrentDate={isCurrentDate}
        handleInputChange={handleInputChange}
        onBlur={onBlur}
        getDayOfWeek={getDayOfWeek}
      />

      <BackToTopButton />
    </Fragment>
  );
}

export default List;
