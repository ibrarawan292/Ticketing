import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Helmet from "react-helmet";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

import { ThemeContext } from "../../../App";
import ApiURL from "../../../Config/Config";

function SignUp() {
  const { DarkMode } = useContext(ThemeContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [BtnDisabled, setBtnDisabled] = useState(false);

  // SIGNUP API STARTS
  const [UserName, setUserNAme] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // username checks
    const indexNumber = UserName.search(/[0-9]/);
    const indexCharacter = UserName.search(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    );
    const indexSpace = UserName.search(" ");

    // password checks
    const passNumber = Password.search(/[0-9]/);
    const passSmall = Password.search(/[a-z]/);
    const passCapital = Password.search(/[A-Z]/);
    const passSpecial = Password.search(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    );
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    if (
      UserName === "" ||
      Email === "" ||
      Password === "" ||
      ConfirmPassword === ""
    ) {
      document.getElementById("error").innerHTML =
        "Please fill the empty field(s)!";
    } else if (UserName.length < 3) {
      document.getElementById("error").innerHTML =
        "User name must have at least 3 characters!";
    } else if (indexNumber === 0 || indexCharacter === 0 || indexSpace >= 0) {
      document.getElementById("error").innerHTML =
        "User name must start with an alphabet and with no extra spaces!";
    } else if (indexSpace >= 0) {
      document.getElementById("error").innerHTML =
        "User name must not contain Spaces!";
    } else if (!regex.test(Email)) {
      document.getElementById("error").innerHTML = "Email is Invalid";
    } else if (Password !== ConfirmPassword) {
      document.getElementById("error").innerHTML = "Passwords did not Match!";
    } else if (Password < 8 || ConfirmPassword < 8) {
      document.getElementById("error").innerHTML =
        "Password must have at least 8 Characters";
    } else if (
      passNumber < 0 ||
      passSmall < 0 ||
      passCapital < 0 ||
      passSpecial < 0
    ) {
      if (
        passNumber < 0 ||
        passSmall < 0 ||
        passCapital < 0 ||
        passSpecial < 0
      ) {
        document.getElementById("error").innerHTML =
          "Password must contain at least one capital letter, number and special Character";
      }
    } else {
      setBtnDisabled(true);
      document.getElementById("error").innerHTML = "";
      var raw = JSON.stringify({
        username: UserName,
        email: Email,
        password: Password,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(ApiURL + "/user/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            toast.success("Account created successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setBtnDisabled(false);
            document.getElementById("error").innerHTML = "";
            navigate("/user-login");
          } else if (result.status === 406) {
            toast.error("An account with this email already exists!");
          }
        })
        .catch((error) => {
          setBtnDisabled(false);
          console.log("error", error);
        });
    }
  };
  // SIGNUP API ENDS

  let navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>Ticket System | User | Signup</title>
      </Helmet>
      <ToastContainer />

      {/* left hand side  */}
      <div className="w-full md:w-[40%] md:h-full bg-red-800">
        <div className="px-8 sm:px-20 md:px-10 text-white lg:px-20 py-16 h-[20%] text-3xl font-serif font-extrabold">
          Ticket System
        </div>

        <div className="w-full py-10 h-5/6 lg:h-[80%] space-y-4 flex flex-col justify-center px-8 sm:px-20 md:px-10 lg:px-20 -mt-16">
          <p className="text-gray-300 font-light">
            We welcome you to our wonderland!
          </p>
          <p className="text-3xl font-bold text-white tracking tracking-widest ">
            Join Our Community and explore something new!
          </p>
        </div>
      </div>

      {/* right hand side  */}
      <div className="w-full md:w-[60%] h-screen md:overflow-y-scroll relative flex items-center justify-center">
        {/* floating sigin div  */}
        <div className="absolute right-10 top-8">
          <p className="mt-3 font-extralight text-gray-500 text-sm">
            Already a part of Ticket System?
            <a
              onClick={() => navigate("/user-login")}
              className="text-sm text-red-500 ml-1 cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </div>

        <div className="w-10/12 sm:w-2/3 mt-40 md:mt-56 text-center pb-20">
          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor2)" }
                : { color: "var(--txtColor2)" }
            }
            className="mt-10 w-full flex flex-col items-start"
          >
            <h2 className="text-2xl font-semibold text-black-800">
              Sign up to Ticket System
            </h2>

            <div className="w-full flex my-5 space-x-3 flex-wrap">
              <button className="flex justify-center items-center py-2 px-5 my-2 md::w-6/12 rounded-md bg-red-600 text-white">
                <p className="font-bold text-xl mr-2">
                  <AiOutlineGoogle />
                </p>
                Sign up with Google
              </button>

              <button className="py-2 px-3 my-2 rounded-md bg-blue-600 text-white">
                <p className="font-bold text-xl">
                  <FaFacebookF />
                </p>
              </button>

              <button className="py-2 px-3 my-2 rounded-md bg-sky-400 text-white">
                <p className="font-bold text-xl">
                  <BsTwitter />
                </p>
              </button>

              <button className="py-2 px-3 my-2 rounded-md bg-sky-700 text-white">
                <p className="font-bold text-xl">
                  <FaLinkedinIn />
                </p>
              </button>
            </div>

            <div className="w-full flex justify-center py-5">
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
              <div className="px-5">
                <h2 className="text-sm text-gray-500">Or With Email</h2>
              </div>
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <p id="error" className="text-xs text-red-600"></p>
          </div>
          <div className="mt-8">
            <div className="my-6">
              <div className="">
                <div className="">
                  <label
                    htmlFor="full_name"
                    className="w-full flex flex-col items-start space-y-2"
                  >
                    <p className="text-sm">User Name</p>
                    <input
                      type="text"
                      name="full_name"
                      value={UserName}
                      onChange={(e) => setUserNAme(e.target.value)}
                      className={
                        DarkMode === true
                          ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                      }
                      placeholder="Your User Name"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="my-6">
              <div className="">
                <div className="">
                  <label
                    htmlFor="email"
                    className="w-full flex flex-col items-start space-y-2"
                  >
                    <p className="text-sm">Email Address</p>
                    <input
                      type="email"
                      name="email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={
                        DarkMode === true
                          ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                      }
                      placeholder="Your Email Address"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="my-6">
              <div className="">
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="w-full flex flex-col items-start mb-2"
                  >
                    <p className="text-sm"> Password</p>
                  </label>

                  <div className="w-full flex items-center">
                    {showPassword === true ? (
                      <input
                        type="text"
                        name="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        }
                        placeholder="Your password"
                        required
                      />
                    ) : (
                      <input
                        type="password"
                        name="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        }
                        placeholder="Your password"
                        required
                      />
                    )}
                    {showPassword === true ? (
                      <BiHide
                        onClick={() => setShowPassword(!showPassword)}
                        className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                      />
                    ) : (
                      <BiShow
                        onClick={() => setShowPassword(!showPassword)}
                        className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <div className="">
                <div className="flex flex-col">
                  <label
                    htmlFor="confirm_password"
                    className="w-full flex flex-col items-start mb-2"
                  >
                    <p className="text-sm">Confirm Password</p>
                  </label>

                  <div className="w-full flex items-center">
                    {showPassword2 === true ? (
                      <input
                        type="text"
                        name="confirm_password"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        }
                        placeholder="Confirm password"
                        required
                      />
                    ) : (
                      <input
                        type="password"
                        name="password"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        }
                        placeholder="Confirm password"
                        required
                      />
                    )}
                    {showPassword2 === true ? (
                      <BiHide
                        onClick={() => setShowPassword2(!showPassword2)}
                        className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                      />
                    ) : (
                      <BiShow
                        onClick={() => setShowPassword2(!showPassword2)}
                        className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <button
                disabled={BtnDisabled}
                onClick={() => {
                  handleSignup();
                }}
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill1)",
                        color: "var(--txtColor2)",
                      }
                    : {
                        backgroundColor: "var(--bg-fill5)",
                        color: "var(--txtColor2)",
                      }
                }
                className="inline-block btn-hover rounded-md font-medium cursor-pointer text-center text-base py-3 px-6  w-full"
                type="submit"
              >
                {BtnDisabled === false ? (
                  "Create Account"
                ) : (
                  <PulseLoader
                    color={"white"}
                    size={10}
                    style={{ zIndex: "-10" }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
