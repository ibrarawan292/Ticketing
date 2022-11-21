import React, { useState, useContext } from "react";
import "../../App.css";
import { ThemeContext } from "../../App";
import { AiFillFire } from "react-icons/ai";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { RiMenu4Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [Menu, setMenu] = useState(false);

  const { DarkMode, setDarkMode } = useContext(ThemeContext);

  let navigate = useNavigate();

  return (
    <div
      style={{ background: "var(--bg-fill1)", color: "var(--txtColor2" }}
      className="w-full h-[75px] "
    >
      {/* floating dark mode button  */}

      {DarkMode === true ? (
        <span
          onClick={() => setDarkMode(false)}
          style={
            DarkMode === true
              ? { background: "var(--bg-fill3)", color: "var(--txtColor2" }
              : { background: "var(--bg-fill1)", color: "var(--txtColor2" }
          }
          className="text-xl p-5 cursor-pointer rounded-full self-center fixed right-10 bottom-10"
        >
          <BsFillSunFill className="cursor-pointer text-gray-400" />
        </span>
      ) : (
        <span
          onClick={() => setDarkMode(true)}
          style={
            DarkMode === true
              ? { background: "var(--bg-fill3)", color: "var(--txtColor2" }
              : { background: "var(--bg-fill1)", color: "var(--txtColor2" }
          }
          className="text-xl p-5 cursor-pointer rounded-full self-center fixed right-10 bottom-10"
        >
          <BsFillMoonFill className="cursor-pointer" />
        </span>
      )}

      <div className="w-full flex items-center justify-between px-5 py-3 ">
        <span className="self-center block lg:hidden">Co-Crawler</span>

        <div className="space-x-2 text-sm hidden lg:flex justify-center">
          <span className="self-center px-10">Co-Crawler</span>

          <NavLink
            end
            style={({ isActive }) =>
              DarkMode === true
                ? {
                    color: isActive ? "var(--bg-fill4)" : "var(--bg-fill4)",
                    backgroundColor: isActive ? "var(--bg-fill2)" : "",
                  }
                : {
                    color: isActive ? "var(--txtColor2" : "var(--txtColor2",
                    backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                  }
            }
            className={
              DarkMode === true
                ? "p-2 pl-8 btn-hoverDark lg:px-4 md:mx-2 rounded transition-colors duration-300"
                : "p-2 pl-8 btn-hover lg:px-4 md:mx-2 rounded transition-colors duration-300"
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            end
            style={({ isActive }) =>
              DarkMode === true
                ? {
                    color: isActive ? "var(--bg-fill4)" : "var(--bg-fill4)",
                    backgroundColor: isActive ? "var(--bg-fill2)" : "",
                  }
                : {
                    color: isActive ? "var(--txtColor2" : "var(--txtColor2",
                    backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                  }
            }
            className={
              DarkMode === true
                ? "p-2 pl-8 btn-hoverDark lg:px-4 md:mx-2 rounded transition-colors duration-300"
                : "p-2 pl-8 btn-hover lg:px-4 md:mx-2 rounded transition-colors duration-300"
            }
            to="/about"
          >
            About
          </NavLink>

          <NavLink
            end
            style={({ isActive }) =>
              DarkMode === true
                ? {
                    color: isActive ? "var(--bg-fill4)" : "var(--bg-fill4)",
                    backgroundColor: isActive ? "var(--bg-fill2)" : "",
                  }
                : {
                    color: isActive ? "var(--txtColor2" : "var(--txtColor2",
                    backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                  }
            }
            className={
              DarkMode === true
                ? "p-2 pl-8 btn-hoverDark lg:px-4 md:mx-2 rounded transition-colors duration-300"
                : "p-2 pl-8 btn-hover lg:px-4 md:mx-2 rounded transition-colors duration-300"
            }
            to="/services"
          >
            Services
          </NavLink>

          <NavLink
            end
            style={({ isActive }) =>
              DarkMode === true
                ? {
                    color: isActive ? "var(--bg-fill4)" : "var(--bg-fill4)",
                    backgroundColor: isActive ? "var(--bg-fill2)" : "",
                  }
                : {
                    color: isActive ? "var(--txtColor2" : "var(--txtColor2",
                    backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                  }
            }
            className={
              DarkMode === true
                ? "p-2 pl-8 btn-hoverDark lg:px-4 md:mx-2 rounded transition-colors duration-300"
                : "p-2 pl-8 btn-hover lg:px-4 md:mx-2 rounded transition-colors duration-300"
            }
            to="/pricing"
          >
            Pricing
          </NavLink>

          <NavLink
            end
            style={({ isActive }) =>
              DarkMode === true
                ? {
                    color: isActive ? "var(--bg-fill4)" : "var(--bg-fill4)",
                    backgroundColor: isActive ? "var(--bg-fill2)" : "",
                  }
                : {
                    color: isActive ? "var(--txtColor2" : "var(--txtColor2",
                    backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                  }
            }
            className={
              DarkMode === true
                ? "p-2 pl-8 btn-hoverDark lg:px-4 md:mx-2 rounded transition-colors duration-300"
                : "p-2 pl-8 btn-hover lg:px-4 md:mx-2 rounded transition-colors duration-300"
            }
            to="/contact-us"
          >
            Contact
          </NavLink>
        </div>

        <div className="flex justify-end space-x-5">
          {/* Mobile Menu  */}
          {Menu === true ? (
            <div
              onClick={() => setMenu(!Menu)}
              className={
                Menu === true
                  ? "fixed top-0 left-0 h-screen w-full max-h-screen overflow-hidden flex flex-col lg:hidden z-10"
                  : "absolute top-0 w-full max-h-0 overflow-hidden flex flex-col items-center bg-gray-900 lg:hidden"
              }
            >
              <div className="w-full absolute top-0 left-0 h-screen backdrop-blur-md bg-black/50 flex flex-col items-center justify-around pb-20">
                <span className="pt-5 text-2xl ">Co-Crawler</span>

                <div className="h-2/3 w-full flex flex-col justify-around">
                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "var(--txtColor2)" : "var(--txtColor2)",
                      backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                    })}
                    className="w-full py-4 text-2xl text-center transition-colors duration-300"
                    to="/"
                  >
                    Home
                  </NavLink>

                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "var(--txtColor2)" : "var(--txtColor2)",
                      backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                    })}
                    className="w-full py-4 text-2xl text-center transition-colors duration-300"
                    to="/about"
                  >
                    About
                  </NavLink>

                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "var(--txtColor2)" : "var(--txtColor2)",
                      backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                    })}
                    className="w-full py-4 text-2xl text-center transition-colors duration-300"
                    to="/services"
                  >
                    Services
                  </NavLink>

                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "var(--txtColor2)" : "var(--txtColor2)",
                      backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                    })}
                    className="w-full py-4 text-2xl text-center transition-colors duration-300"
                    to="/pricing"
                  >
                    Pricing
                  </NavLink>

                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "var(--txtColor2)" : "var(--txtColor2)",
                      backgroundColor: isActive ? "var(--btn-bgColor2)" : "",
                    })}
                    className="w-full py-4 text-2xl text-center transition-colors duration-300"
                    to="/contact-us"
                  >
                    Contact
                  </NavLink>
                </div>
              </div>
            </div>
          ) : null}

          <div
            onClick={() => setMenu(!Menu)}
            className="px-3 py-3 flex lg:hidden items-center text-white text-sm"
          >
            <RiMenu4Fill size="2em" />
          </div>

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
                ? "px-6 py-4 hidden btn-hoverDark sm:flex items-center text-sm rounded-md"
                : "px-6 py-4 hidden btn-hover2 sm:flex items-center text-sm rounded-md"
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
          <button
            style={
              DarkMode === true
                ? {
                    color: "var(--bg-fill4)",
                    backgroundColor: "var(--btn-bgColor1)",
                  }
                : {
                    color: "var(--txtColor1)",
                    backgroundColor: "var(--bg-fill3)",
                  }
            }
            onClick={() => navigate("/user-login")}
            className={
              DarkMode === true
                ? "px-6 py-4 flex items-center  text-sm  btn-hover2 rounded-md"
                : "px-6 py-4 flex items-center  text-sm  btn-hover3 rounded-md"
            }
          >
            <BiLogIn size="1.3em" className="mr-2 self-center" /> Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
