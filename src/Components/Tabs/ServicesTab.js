import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillFire } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ApiURL from "../../Config/Config";
import { ThemeContext } from "../../App";

// images

function ServicesTab() {
  const [Screen, setScreen] = useState(2);
  const [active, setActive] = useState(2);

  let navigate = useNavigate();

  const { DarkMode } = useContext(ThemeContext);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex pb-10 mb-10 space-y-3 md:space-y-0 flex-col sm:flex-row text-xl sm:justify-around sm:items-center md:px-20">
        <button
          onClick={() => {
            setScreen(2);
            setActive(2);
          }}
          className={
            active === 2
              ? "py-2 px-3 border-b-2 border-gray-900"
              : "py-2 px-3 hover:border-b-2 border-gray-900"
          }
        >
          Service 1
        </button>
        <button
          onClick={() => {
            setScreen(3);
            setActive(3);
          }}
          className={
            active === 3
              ? "py-2 px-3 border-b-2 border-gray-900"
              : "py-2 px-3 hover:border-b-2 border-gray-900"
          }
        >
          <div className="w-full flex justify-center"></div>
          Service 2
        </button>
        <button
          onClick={() => {
            setScreen(4);
            setActive(4);
          }}
          className={
            active === 4
              ? "py-2 px-3 border-b-2 border-gray-900"
              : "py-2 px-3 hover:border-b-2 border-gray-900"
          }
        >
          <div className="w-full flex justify-center"></div>
          Service 3
        </button>
        <button
          onClick={() => {
            setScreen(5);
            setActive(5);
          }}
          className={
            active === 5
              ? "py-2 px-3 border-b-2 border-gray-900"
              : "py-2 px-3 hover:border-b-2 border-gray-900"
          }
        >
          <div className="w-full flex justify-center"></div>
          Service 4
        </button>
      </div>

      {/* TAB DISPLAY  */}
      {/* TAB 2  */}
      {Screen === 2 ? (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="container flex flex-col items-center"
        >
          <div className="w-full px-5 sm:px-10 lg:w-4/6 flex flex-col lg:flex-row">
            {/* LEFT HAND SIDE  */}
            <div
              style={
                DarkMode === true
                  ? { backgroundColor: "var(--bg-fill5)" }
                  : { backgroundColor: "var(--bg-fill2)" }
              }
              className="w-full lg:w-1/2 rounded-xl"
            >
              image was here
            </div>

            {/* RIGHT HAND SIDE  */}

            <div className="w-full lg:w-1/2 pt-10 lg:pt-0 flex flex-col px-10 justify-center space-y-5">
              <h2
                style={{ color: "var(--txtColor1)" }}
                className="text-xl font-bold"
              >
                Designed for high volume web data
              </h2>
              <p
                style={
                  DarkMode === true
                    ? { color: "var(--txtColor1)" }
                    : { color: "var(--txtColor3)" }
                }
                className="text-sm"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti quidem alias nisi, corporis sapiente labore mollitia ex
                debitis dicta, deserunt vel ducimus asperiores, sunt odio?
              </p>

              <button
                style={
                  DarkMode === true
                    ? {
                        color: "var(--bg-fill4)",
                        backgroundColor: "var(--btn-bgColor1)",
                      }
                    : {
                        color: "var(--txtColor2)",
                        backgroundColor: "var(--btn-bgColor1)",
                      }
                }
                className={
                  DarkMode === true
                    ? "px-6 py-3 w-fit mt-10 flex items-center btn-hoverDark2 rounded-md"
                    : "px-6 py-3 w-fit mt-10 flex items-center btn-hover4 rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "" : "orange"}
                  className="mr-2 self-center"
                />
                Get Started
              </button>
            </div>
          </div>

          {/* BANNER */}
          <div className="w-full flex justify-center">
            <div className="w-full flex justify-center">
              <div
                style={{ backgroundColor: "var(--bg-fill1)" }}
                className="border w-full lg:w-8/12 mt-10 lg:mt-20 py-5 px-5 md:px-10 lg:h-52 flex flex-col items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col">
                    <h2
                      style={
                        DarkMode === true
                          ? { color: "var(--txtColor3)" }
                          : { color: "var(--txtColor2)" }
                      }
                      className="text-xl font-semibold pb-2 text-center"
                    >
                      Data acquisition doesn’t have to be a burden
                    </h2>
                    <p
                      style={
                        DarkMode === true
                          ? { color: "var(--txtColor3)" }
                          : { color: "var(--txtColor2)" }
                      }
                      className="text-sm text-center mt-5"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolores beatae placeat molestias. Maxime, rem. Asperiores.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    style={
                      DarkMode === true
                        ? {
                            color: "var(--bg-fill4)",
                            backgroundColor: "var(--bg-fill2)",
                          }
                        : {
                            color: "var(--txtColor2)",
                            backgroundColor: "var(--btn-bgColor1)",
                          }
                    }
                    className={
                      DarkMode === true
                        ? "px-6 py-3 flex items-center btn-hoverDark rounded-md"
                        : "px-6 py-3 flex items-center btn-hover4 rounded-md"
                    }
                    onClick={() => navigate("/pricing")}
                  >
                    <AiFillFire
                      size="1.3em"
                      color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                      className="mr-2 self-center"
                    />
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* TAB 3  */}
      {Screen === 3 ? (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="container flex flex-col items-center"
        >
          <div className="w-full px-5 sm:px-10 lg:w-4/6 flex flex-col-reverse lg:flex-row-reverse">
            {/* LEFT HAND SIDE  */}
            <div
              style={
                DarkMode === true
                  ? { backgroundColor: "var(--bg-fill5)" }
                  : { backgroundColor: "var(--bg-fill2)" }
              }
              className="w-full lg:w-1/2 rounded-xl"
            >
              image here
            </div>

            {/* RIGHT HAND SIDE  */}
            <div className="w-full lg:w-1/2 pb-10 lg:pb-0 flex flex-col px-10 justify-center space-y-5">
              <h2
                style={{ color: "var(--txtColor1)" }}
                className="text-xl font-bold"
              >
                Designed for high volume web data
              </h2>
              <p
                style={
                  DarkMode === true
                    ? { color: "var(--txtColor1)" }
                    : { color: "var(--txtColor3)" }
                }
                className="text-sm"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti quidem alias nisi, corporis sapiente labore mollitia ex
                debitis dicta, deserunt vel ducimus asperiores, sunt odio?
              </p>

              <button
                style={
                  DarkMode === true
                    ? {
                        color: "var(--bg-fill4)",
                        backgroundColor: "var(--btn-bgColor1)",
                      }
                    : {
                        color: "var(--txtColor2)",
                        backgroundColor: "var(--btn-bgColor1)",
                      }
                }
                className={
                  DarkMode === true
                    ? "px-6 py-3 w-fit mt-10 flex items-center btn-hoverDark2 rounded-md"
                    : "px-6 py-3 w-fit mt-10 flex items-center btn-hover4 rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "" : "orange"}
                  className="mr-2 self-center"
                />
                Get Started
              </button>
            </div>
          </div>

          {/* BANNER */}
          <div className="w-full flex justify-center">
            <div className="w-full flex justify-center">
              <div
                style={{ backgroundColor: "var(--bg-fill1)" }}
                className="border w-full lg:w-8/12 mt-10 lg:mt-20 py-5 px-5 md:px-10 lg:h-52 flex flex-col items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col">
                    <h2
                      style={
                        DarkMode === true
                          ? { color: "var(--txtColor3)" }
                          : { color: "var(--txtColor2)" }
                      }
                      className="text-xl font-semibold pb-2 text-center"
                    >
                      Data acquisition doesn’t have to be a burden
                    </h2>
                    <p
                      style={
                        DarkMode === true
                          ? { color: "var(--txtColor3)" }
                          : { color: "var(--txtColor2)" }
                      }
                      className="text-sm text-center mt-5"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolores beatae placeat molestias. Maxime, rem. Asperiores.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    style={
                      DarkMode === true
                        ? {
                            color: "var(--bg-fill4)",
                            backgroundColor: "var(--bg-fill2)",
                          }
                        : {
                            color: "var(--txtColor2)",
                            backgroundColor: "var(--btn-bgColor1)",
                          }
                    }
                    className={
                      DarkMode === true
                        ? "px-6 py-3 flex items-center btn-hoverDark rounded-md"
                        : "px-6 py-3 flex items-center btn-hover4 rounded-md"
                    }
                    onClick={() => navigate("/pricing")}
                  >
                    <AiFillFire
                      size="1.3em"
                      color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                      className="mr-2 self-center"
                    />
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* TAB 4  */}
      {Screen === 4 ? (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="container"
        >
          <div>3rd tab</div>
        </motion.div>
      ) : null}

      {Screen === 5 ? (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="container"
        >
          <div>4th tab</div>
        </motion.div>
      ) : null}
    </div>
  );
}

export default ServicesTab;
