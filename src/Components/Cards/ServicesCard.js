import React, { useContext } from "react";
import { FaMedal } from "react-icons/fa";
import { ThemeContext } from "../../App";

function ServicesCard() {
  const { DarkMode } = useContext(ThemeContext);

  return (
    <div>
      <div
        style={
          DarkMode === true
            ? { backgroundColor: "var(--bg-fill5)" }
            : { backgroundColor: "var(--bg-fill2)" }
        }
        className={
          DarkMode === true
            ? "w-72 pt-5 sm:w-[220px] hover:-translate-y-2 hover:duration-700 hover:shadow-lg  rounded-lg shadow-lg shadow-gray-700 flex flex-col items-start px-5"
            : "w-72 pt-5 sm:w-[220px] hover:-translate-y-2 hover:duration-700 hover:shadow-lg  rounded-lg shadow-lg shadow-gray-200 flex flex-col items-start px-5"
        }
      >
        <div className="w-full pb-5 flex justify-center">
          <span
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--btn-bgColor1)",
                    color: "var(--txtColor3)",
                  }
                : {
                    backgroundColor: "var(--btn-bgColor2)",
                    color: "var(--bg-fill3)",
                  }
            }
            className="rounded-full text-lg p-3"
          >
            <FaMedal className="mr-1" />
          </span>
        </div>
        <h2
          style={
            DarkMode === true
              ? { color: "var(--txtColor3)" }
              : { color: "var(--txtColor1)" }
          }
          className=" pb-2 font-semibold"
        >
          Fast And Optimized
        </h2>
        <p
          style={{ color: "var(--txtColor3)" }}
          className=" text-gray-400 text-sm pt-2 pb-5"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor dolore magna.
        </p>
      </div>
    </div>
  );
}

export default ServicesCard;
