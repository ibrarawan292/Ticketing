import React, { useContext } from "react";
import { AiTwotoneHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiRun } from "react-icons/bi";
import { ThemeContext } from "../../App";

function FeatureCard() {
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
            ? "w-72 pt-5 sm:w-[370px] hover:-translate-y-2 hover:duration-500 hover:shadow-lg  rounded-lg shadow-lg shadow-gray-700 flex flex-col items-center"
            : "w-72 pt-5 sm:w-[370px] hover:-translate-y-2 hover:duration-500 hover:shadow-lg  rounded-lg shadow-lg shadow-gray-200 flex flex-col items-center"
        }
      >
        <div className="w-full pb-5 flex justify-center">
          <span
            style={
              DarkMode === true
                ? { backgroundColor: "var(--btn-bgColor1)" }
                : { backgroundColor: "var(--btn-bgColor2)" }
            }
            className="rounded-full text-3xl text-white p-5"
          >
            <BiRun className="mr-1" />
          </span>
        </div>
        <h2
          style={
            DarkMode === true
              ? { color: "var(--txtColor2)" }
              : { color: "var(--txtColor1)" }
          }
          className="text-xl pb-2 font-semibold"
        >
          Fast And Optimized
        </h2>
        <p
          style={
            DarkMode === true
              ? { color: "var(--txtColor2)" }
              : { color: "var(--txtColor1)" }
          }
          className=" text-gray-400 text-center px-5 pt-2 pb-10"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor dolore magna.
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
