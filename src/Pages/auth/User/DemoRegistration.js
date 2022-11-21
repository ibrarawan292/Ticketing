import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../../../App";
import { PulseLoader } from "react-spinners";
import ApiURL from "../../../config/config";

// icons
import cpu from "../../../Assets/Images/icons/cpu.png";

function DemoRegistration() {
  const { DarkMode } = useContext(ThemeContext);

  const [Email, setEmail] = useState("");
  const [Search, setSearch] = useState("");
  const [BtnDisabled, setBtnDisabled] = useState(false);

  const handleDemo = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (Search === "" || Email === "") {
      document.getElementById("error").innerHTML =
        "Please fill the empty field(s)!";
    } else if (!regex.test(Email)) {
      document.getElementById("error").innerHTML = "Email is Invalid";
    } else {
      setBtnDisabled(true);
      document.getElementById("error").innerHTML = "";
      var raw = JSON.stringify({
        email: Email,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(ApiURL + "/sample/record", requestOptions)
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
            navigate("/");
          } else if (result.status === 406) {
            document.getElementById("error").innerHTML = "Email already used!";
            toast.error("You have already used demo version on this email!");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  let navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50 relative h-full overflow-hidden flex flex-col lg:flex-row">
      {/* clipped background  */}
      <div className="w-[1100px] h-full absolute bg-emerald-200 clippy lg:-right-80"></div>
      <Helmet>
        <title>Co-Crawler | User | Demo Registration</title>
      </Helmet>
      <ToastContainer />

      {/* left hand side  */}
      <div className="w-full lg:w-[45%] h-full lg:h-full z-10">
        <div className="px-8 sm:px-20 md:px-10 lg:px-20 py-16 text-3xl font-serif font-extrabold">
          Co-Crawler
        </div>

        <div className="w-full space-y-4 flex flex-col justify-center px-8 sm:px-20 md:px-10 lg:px-20">
          <p className="text-4xl md:w-5/6 font-bold tracking tracking-widest ">
            Discover your online business opportunities!
          </p>

          <p className="text-gray-500 font-light">
            What can you get with Co-Crawler's evolutionary business plans and
            ideas ?
          </p>
        </div>
        <div className="w-full flex justify-between px-10 md:pl-20 py-5">
          {/* set 1  */}
          <div className="w-[30%] flex flex-col space-y-5">
            {/* point 1  */}
            <div className="p-3">
              <span className="">
                <img className="w-1/3" src={cpu} alt="cpu icon" />
              </span>
              <h2>Title</h2>
              <p className="text-xs">Short Description</p>
            </div>

            {/* point 2  */}
            <div className="p-3">
              <span className="">
                <img className="w-1/3" src={cpu} alt="cpu icon" />
              </span>
              <h2>Title</h2>
              <p className="text-xs">Short Description</p>
            </div>
          </div>

          {/* set 2  */}
          <div className="w-[30%] mt-16 flex flex-col">
            {/* point 1  */}
            <div className="p-3">
              <span className="">
                <img className="w-1/3" src={cpu} alt="cpu icon" />
              </span>
              <h2>Title</h2>
              <p className="text-xs">Short Description</p>
            </div>

            {/* point 2  */}
            <div className="p-3">
              <span className="">
                <img className="w-1/3" src={cpu} alt="cpu icon" />
              </span>
              <h2>Title</h2>
              <p className="text-xs">Short Description</p>
            </div>
          </div>

          {/* set 3  */}
          <div className="w-[30%] flex flex-col">
            {/* point 1  */}
            <div className="p-3">
              <span className="">
                <img className="w-1/3" src={cpu} alt="cpu icon" />
              </span>
              <h2>Title</h2>
              <p className="text-xs">Short Description</p>
            </div>

            {/* point 2  */}
            <div className="p-3">
              <span className="">
                <img className="w-1/3" src={cpu} alt="cpu icon" />
              </span>
              <h2>Title</h2>
              <p className="text-xs">Short Description</p>
            </div>
          </div>
        </div>
      </div>

      {/* right hand side  */}
      <div className="w-full h-full py-10 lg:py-0 lg:h-screen lg:w-[55%] lg:overflow-y-hidden relative lg:overflow-x-hidden flex items-center justify-center">
        <div className="w-9/12 z-10 sm:w-2/3 lg:w-1/2 text-center p-10 bg-white rounded-lg shadow-lg">
          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor2)" }
                : { color: "var(--txtColor1)" }
            }
            className=" w-full flex flex-col items-start"
          >
            <h2 className="text-2xl font-semibold text-black">
              Start Your Free Demo Today!
            </h2>
          </div>

          <div className="py-4 w-full flex flex-col items-center">
            <p id="error" className="text-sm text-red-500"></p>
          </div>

          <div className="mt-4">
            <div className="">
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

            <div className="">
              <div className="">
                <div className="flex flex-col">
                  <label
                    htmlFor="search_keyword"
                    className="w-full flex flex-col items-start mb-2"
                  >
                    <p className="text-sm">Search Keyword</p>
                  </label>

                  <div className="w-full flex items-center">
                    <input
                      type="search"
                      name="search_keyword"
                      value={Search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={
                        DarkMode === true
                          ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                      }
                      placeholder="Search the desired keyword"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <button
                onClick={() => handleDemo()}
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
                className="inline-block btn-hoverDark2 rounded-md font-medium cursor-pointer text-center text-base py-3 px-6  w-full"
                type="submit"
              >
                {BtnDisabled === false ? (
                  "Get Data"
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

export default DemoRegistration;
