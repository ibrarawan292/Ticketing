import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineGoogle } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import ApiURL from "../../../Config/Config";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { ThemeContext } from "../../../App";

function Login() {
  const [ForgotPass, setForgotPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  // VERIFICATION
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [BtnDisabled2, setBtnDisabled2] = useState(false);

  const { DarkMode, setRefreshAdminLogin, RefreshAdminLogin } =
    useContext(ThemeContext);

  let navigate = useNavigate();

  // LOGIN API STARTS
  const handleLogin = () => {
    setBtnDisabled(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: userName,
      password: Password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/AdminLogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.status);
        if (result.status === 200) {
          console.log(result);
          localStorage.setItem("AdminAuth", JSON.stringify(result));
          localStorage.setItem("AdminIsLogin", "true");
          setRefreshAdminLogin(RefreshAdminLogin === true ? false : true);
          setBtnDisabled(false);
          navigate("/");
        } else if (result.status !== 200) {
          document.getElementById("error").style.display = "block";
          setBtnDisabled(false);
        }
      })
      .catch((error) => {
        setBtnDisabled(false);
        console.log("error", error);
      });
  };
  // LOGIN API ENDS

  // FORGOT PASSWORD API STARTS
  const ForgotPassApi = () => {
    setBtnDisabled2(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (forgetEmail === "") {
      document.getElementById("email").innerHTML = "(Enter Email Address!)";
      setBtnDisabled2(false);
    } else if (regex.test(forgetEmail)) {
      document.getElementById("email").innerHTML = "";

      var raw = JSON.stringify({
        email: forgetEmail,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(ApiURL + "/forgot-password-user", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            toast.success(result.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setBtnDisabled2(false);
            setForgetEmail("");
          } else if (result.status === 406) {
            toast.error(result.message);
          } else if (result.status === 404) {
            document.getElementById("email").innerHTML = "(Email not found!)";
            toast.error("Email not found!!");
          }
          setBtnDisabled2(false);
        })
        .catch((error) => {
          setBtnDisabled2(false);
        });
    } else {
      document.getElementById("email").innerHTML =
        "(Email Address is not valid)";
      toast.error("Email Address is not valid");
      document.getElementById("email2").innerHTML = "";
      setBtnDisabled2(false);
    }
  };
  // FORGOT PASSWORD API ENDS

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>Ticket System | Admin | Login</title>
      </Helmet>
      <ToastContainer />

      {/* left hand side  */}
      <div className="w-full md:w-[40%] md:h-full bg-red-800">
        <div className="px-8 sm:px-20 md:px-10 text-white lg:px-20 py-16 h-[20%] text-3xl font-serif font-extrabold">
          Ticket System
        </div>

        <div className="w-full py-10 h-5/6 lg:h-[80%] space-y-4 flex flex-col justify-center px-8 sm:px-20 md:px-10 lg:px-20 -mt-16">
          <p className="text-gray-300 font-light">
            We are glad to see you again!
          </p>
          <p className="text-3xl font-bold text-white tracking tracking-widest ">
            Please login to go to your dashboard
          </p>
        </div>
      </div>

      {/* right hand side  */}
      <div className="w-full md:w-[60%] h-full relative flex items-center justify-center">
        <form
          className="w-10/12 sm:w-2/3 text-center pb-10 lg:pb-0"
          onSubmit={(e) => (e.preventDefault(), handleLogin())}
        >
          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor2)" }
                : { color: "var(--txtColor1)" }
            }
            className="mt-10 w-full flex flex-col items-center"
          >
            <h2 className="text-2xl  font-semibold text-black-800">
              Sign in to Ticket System
            </h2>

            {/* <div className="w-full flex my-5 space-x-3 flex-wrap">
              <button className="flex justify-center items-center py-2 px-5 my-2 md::w-6/12 rounded-md bg-red-600 text-white">
                <p className="font-bold text-xl mx-2">
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
            </div> */}

            {/* <div className="w-full flex justify-center py-5">
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
              <div className="px-5">
                <h2 className="text-sm text-gray-500">Or With Email</h2>
              </div>
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
            </div> */}
          </div>

          <div className="w-full text-center">
            <p
              id="error"
              style={{ display: "none" }}
              className="text-sm text-red-600"
            >
              Username or Password is incorrect
            </p>
          </div>

          <div className="mt-8">
            <div className="my-6">
              <div className="">
                <div className="">
                  <label
                    htmlFor="username"
                    className="w-full flex flex-col items-start space-y-2"
                  >
                    <p className="text-sm"> Username</p>
                    <input
                      type="text"
                      name="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={
                        DarkMode === true
                          ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                      }
                      placeholder="Your username"
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
              <button
                disabled={BtnDisabled}
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
                  "Login"
                ) : (
                  <PulseLoader
                    color={"white"}
                    size={10}
                    style={{ zIndex: "-10" }}
                  />
                )}
              </button>
            </div>
            <div className="text-right">
              <a
                onClick={() => setForgotPass(!ForgotPass)}
                className="text-red-500 cursor-pointer"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>

      {/* FORGOT PASSWORD MODAL  */}
      {ForgotPass === true ? (
        <div className="z-40 w-full h-full absolute top-0 left-0 bg-black/40 flex justify-center items-center">
          <div
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill1)",
                    color: "var(--txtColor2)",
                  }
                : {
                    backgroundColor: "var(--bg-fill3)",
                    color: "var(--txtColor1)",
                  }
            }
            className="w-4/6 md:w-2/6 flex flex-col relative border rounded-lg p-5 text-xs"
          >
            <AiOutlineCloseCircle
              onClick={() => setForgotPass(!ForgotPass)}
              size="1.6em"
              className="absolute top-2 right-3 cursor-pointer hover:text-gray-400"
            />
            <h2 className="text-lg py-3 cursor-pointer">Forgot Password ?</h2>
            <p className="text-sm text-red-600 pb-2" id="email"></p>
            <p className="text-sm text-red-600 pb-2" id="email2"></p>

            <input
              type="email"
              name="email"
              value={forgetEmail}
              onChange={(e) => setForgetEmail(e.target.value)}
              className="rounded-md border py-2 px-2 w-full text-base"
              placeholder="Email Address"
            />
            <div className="w-full flex justify-end mt-5">
              <button
                disabled={BtnDisabled2}
                style={
                  DarkMode === true
                    ? { backgroundColor: "var(--btn-bgColor1)" }
                    : {
                        backgroundColor: "var(--bg-fill5)",
                        color: "var(--txtColor2)",
                      }
                }
                className="px-5 py-3 rounded-md btn-hover"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  ForgotPassApi();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
