import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ApiURL from "../../Config/Config";

function EditCourseAccordion() {
  const [Accord, setAccord] = useState(0);

  const { DarkMode } = useContext(ThemeContext);

  const toggle = () => {
    if (Accord === 1) {
      return setAccord(null);
    }
    setAccord(1);
  };

  const toggle2 = () => {
    if (Accord === 2) {
      return setAccord(null);
    }
    setAccord(2);
  };

  const toggle3 = () => {
    if (Accord === 3) {
      return setAccord(null);
    }
    setAccord(3);
  };

  const toggle4 = () => {
    if (Accord === 4) {
      return setAccord(null);
    }
    setAccord(4);
  };

  return (
    <div className="wrapper flex flex-col space-y-5 w-full items-center">
      {/* Accordion 1  */}
      <div
        onClick={() => toggle()}
        style={
          DarkMode === true && Accord === 1
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : { border: "1px solid gray" }
        }
        className="w-11/12 border-2 cursor-pointer rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-center">
          <span>{Accord === 1 ? <BsChevronUp /> : <BsChevronDown />}</span>
          <h2>Question ?</h2>
        </div>

        <div
          className={
            Accord === 1
              ? "pt-5 pb-2 transition-all ease-0ut duration-1000"
              : "max-h-0 overflow-hidden transition-all ease-out duration-1000"
          }
        >
          <h3>Answer</h3>
        </div>
      </div>

      {/* Accordion 2  */}
      <div
        onClick={() => toggle2()}
        style={
          DarkMode === true && Accord === 2
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : { border: "1px solid gray" }
        }
        className="w-11/12 border-2 cursor-pointer rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-center">
          <span>{Accord === 2 ? <BsChevronUp /> : <BsChevronDown />}</span>
          <h2>Question ?</h2>
        </div>

        <div
          className={
            Accord === 2
              ? "pt-5 pb-2 transition-all ease-0ut duration-1000"
              : "max-h-0 overflow-hidden transition-all ease-out duration-1000"
          }
        >
          <h3>Answer</h3>
        </div>
      </div>

      {/* Accordion 3  */}
      <div
        onClick={() => toggle3()}
        style={
          DarkMode === true && Accord === 3
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : { border: "1px solid gray" }
        }
        className="w-11/12 border-2 cursor-pointer rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-center">
          <span>{Accord === 3 ? <BsChevronUp /> : <BsChevronDown />}</span>
          <h2>Question ?</h2>
        </div>

        <div
          className={
            Accord === 3
              ? "pt-5 pb-2 transition-all ease-0ut duration-1000"
              : "max-h-0 overflow-hidden transition-all ease-out duration-1000"
          }
        >
          <h3>Answer</h3>
        </div>
      </div>

      {/* Accordion 4  */}
      <div
        onClick={() => toggle4()}
        style={
          DarkMode === true && Accord === 4
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : { border: "1px solid gray" }
        }
        className="w-11/12 border-2 cursor-pointer rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-center">
          <span>{Accord === 4 ? <BsChevronUp /> : <BsChevronDown />}</span>
          <h2>Question ?</h2>
        </div>

        <div
          className={
            Accord === 4
              ? "pt-5 pb-2 transition-all ease-0ut duration-1000"
              : "max-h-0 overflow-hidden transition-all ease-out duration-1000"
          }
        >
          <h3>Answer</h3>
        </div>
      </div>
    </div>
  );
}

export default EditCourseAccordion;
