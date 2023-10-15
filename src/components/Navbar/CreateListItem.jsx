import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/arrow.svg";

function CreateListItem({
  to,
  bgColor,
  textColor,
  title,
  animationDelay,
  toggleMenu,
}) {
  return (
    <Link to={to}>
      <div
        className={`bg-${bgColor} text-${textColor} rounded-t-[32px] hover:cursor-pointer slide-up`}
        style={{ animationDelay }}
        onClick={toggleMenu}
      >
        <div className="pt-10 pb-[1000px] px-4 group hover:mb-6 transition-all duration-300">
          <div className="flex justify-between">
            <span className={`text-${textColor}`}>Last updated - 01 Oct</span>
            <img
              src={arrow}
              alt=""
              className="md:mr-8 transition-all duration-300 group-hover:mr-0 md:w-2"
            />
          </div>
          <div className="text-xl font-bold mt-2">
            <h2>{title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CreateListItem;
