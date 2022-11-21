import React, { useContext, useState } from "react";
import { ThemeContext } from "../../App";

function Achievements() {
  const { DarkMode } = useContext(ThemeContext);

  // change color on scroll
  const [CircleColor, setCircleColor] = useState(0);
  const handleCircleColor = () => {
    if (window.scrollY >= 4550) {
      setCircleColor(1);
    }
    if (window.scrollY >= 4610) {
      setCircleColor(2);
    }
    if (window.scrollY >= 4670) {
      setCircleColor(3);
    }
    if (window.scrollY >= 4720) {
      setCircleColor(4);
    }
  };

  window.addEventListener("scroll", handleCircleColor);
  return (
    <div>
      {/* 4 achievements 2  */}
      <section
        style={{ backgroundColor: "var(--bg-fill1)" }}
        className="w-full lg:mt-0 px-5 flex flex-col items-center lg:px-10 py-20"
      >
        <div
          style={
            DarkMode === true
              ? { color: "var(--txtColor3)" }
              : { color: "var(--txtColor2)" }
          }
          className="w-full flex flex-col items-center lg:items-start lg:pl-16 pb-10"
        >
          <h2 className="text-2xl text-center lg:text-left font-bold">
            Getting Started With Co-Crawler
          </h2>
          <p className="pt-5 px-5 lg:px-0  lg:w-2/3 text-center lg:text-left">
            Start with Co-Crawler in a few easy steps. Leave the heavy lifting
            with data acquisition to us so you can focus on innovation, and
            growth.
          </p>
        </div>

        <div className="flex justify-around space-y-10 lg:space-y-0 flex-wrap w-full">
          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor3)" }
                : { color: "var(--txtColor2)" }
            }
            className="w-full lg:w-60 flex flex-col items-center lg:items-start"
          >
            <div
              style={
                CircleColor === 1 ||
                CircleColor === 2 ||
                CircleColor === 3 ||
                CircleColor === 4
                  ? {
                      backgroundColor: "var(--bg-fill5)",
                      color: "var(--txtColor2)",
                    }
                  : {
                      backgroundColor: "var(--bg-fill3)",
                      color: "var(--txtColor1)",
                    }
              }
              className="py-5  px-8 rounded-full mb-2 lg:mb-5"
            >
              <p className="text-3xl">1</p>
            </div>
            <h2 className="text-2xl pb-2 font-bold">850+</h2>
            <p className="text-center lg:text-left ">Completed Projects</p>
            <p className="text-center lg:text-left ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              eum.
            </p>
          </div>

          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor3)" }
                : { color: "var(--txtColor2)" }
            }
            className="w-full lg:w-60 flex flex-col items-center lg:items-start"
          >
            <div
              style={
                CircleColor === 2 || CircleColor === 3 || CircleColor === 4
                  ? {
                      backgroundColor: "var(--bg-fill5)",
                      color: "var(--txtColor2)",
                    }
                  : {
                      backgroundColor: "var(--bg-fill3)",
                      color: "var(--txtColor1)",
                    }
              }
              className="py-5 px-8 rounded-full mb-2 lg:mb-5"
            >
              <p className="text-3xl">2</p>
            </div>
            <h2 className="text-2xl pb-2 font-bold">850+</h2>
            <p className="text-center lg:text-left">Completed Projects</p>
            <p className="text-center lg:text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              eum.
            </p>
          </div>

          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor3)" }
                : { color: "var(--txtColor2)" }
            }
            className="w-full lg:w-60 flex flex-col items-center lg:items-start"
          >
            <div
              style={
                CircleColor === 3 || CircleColor === 4
                  ? {
                      backgroundColor: "var(--bg-fill5)",
                      color: "var(--txtColor2)",
                    }
                  : {
                      backgroundColor: "var(--bg-fill3)",
                      color: "var(--txtColor1)",
                    }
              }
              className="py-5 px-8 rounded-full mb-2 lg:mb-5"
            >
              <p className="text-3xl">3</p>
            </div>
            <h2 className="text-2xl  pb-2 font-bold">850+</h2>
            <p className="text-center lg:text-left ">Completed Projects</p>
            <p className="text-center lg:text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              eum.
            </p>
          </div>

          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor3)" }
                : { color: "var(--txtColor2)" }
            }
            className="w-full lg:w-60 flex flex-col items-center lg:items-start"
          >
            <div
              style={
                CircleColor === 4
                  ? {
                      backgroundColor: "var(--bg-fill5)",
                      color: "var(--txtColor2)",
                    }
                  : {
                      backgroundColor: "var(--bg-fill3)",
                      color: "var(--txtColor1)",
                    }
              }
              className="py-5 px-8 rounded-full mb-2 lg:mb-5"
            >
              <p className="text-3xl">4</p>
            </div>
            <h2 className="text-2xl pb-2 font-bold">850+</h2>
            <p className="text-center lg:text-left">Completed Projects</p>
            <p className="text-center lg:text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              eum.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Achievements;
