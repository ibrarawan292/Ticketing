import React, { useState, useEffect, useContext } from "react";
import ApiURL from "../../../Config/Config";
import { ToastContainer, toast } from "react-toastify";
import Helmet from "react-helmet";
import { PulseLoader } from "react-spinners";
import UserRefreshToken from "../../../Pages/auth/User/UserRefreshToken";
import { ThemeContext } from "../../../App";

function EditProfileUser(props) {
  const { DarkMode, RefreshUserLogin, setRefreshUserLogin } =
    useContext(ThemeContext);

  const [username, setUsername] = useState("");
  const [Contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [BtnDisabled, setBtnDisabled] = useState(false);

  const token = localStorage.getItem("AccessTokenUser");

  // GET USER DATA API STARTS
  const getUserDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/user/details", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.msg !== "Token has expired") {
          setEmail(result.details["email"]);
          setUsername(result.details["username"]);
          setContact(result.details["phone_no"]);
        } else if (result.msg === "Token has expired") {
          UserRefreshToken();
        }
      })
      .catch((error) => console.log("error", error));
  };
  // GET USER DATA API ENDS

  // EDIT USER DATA API STARTS
  const editUserDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const indexSpace = username.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    const nameCharacter = username.search(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    );

    if (username === "") {
      document.getElementById("name").innerHTML = "Name is not filled!";
    }
    if (email === "") {
      document.getElementById("email").innerHTML = "Email is not Filled!";
    }
    if (Contact === "") {
      document.getElementById("contact").innerHTML =
        "Phone number is not filled!";
    }

    if (username.length < 3) {
      document.getElementById("name").innerHTML = "User name is too short!";
    } else if (nameCharacter >= 0 || username !== indexSpace) {
      document.getElementById("name").innerHTML = "User name is invalid!";
    } else if (!regex.test(email)) {
      document.getElementById("email").innerHTML = "Email is invalid!";
    } else if (Contact.length < 8) {
      document.getElementById("contact").innerHTML = "Phone number is invalid!";
    } else {
      setBtnDisabled(true);
      document.getElementById("name").innerHTML = "";
      document.getElementById("email").innerHTML = "";
      document.getElementById("contact").innerHTML = "";
      var raw = JSON.stringify({
        username: username,
        email: email,
        phone: Contact,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(ApiURL + "/user/profile/edit", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg !== "Token has expired") {
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
              localStorage.setItem("AccessTokenUser", "");
              localStorage.setItem("RefreshTokenUser", "");
              localStorage.setItem("UserIsLogin", "false");

              setTimeout(function () {
                setRefreshUserLogin(RefreshUserLogin === true ? false : true);
              }, 2000);

              setBtnDisabled(false);
            }
          } else if (result.msg === "Token has expired") {
            UserRefreshToken();
            setBtnDisabled(false);
          }
        })
        .catch((error) => {
          setBtnDisabled(false);
          toast.error("Oopss!! Some error occurred!!!");
          console.log("error", error);
        });
    }
  };
  // EDIT USER DATA API ENDS

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col w-[80%]">
      <Helmet>
        <title>Ticket System | User | Edit Profile</title>
      </Helmet>
      <ToastContainer />
      <div className="w-full">
        {/* BASIC INFO  */}
        <div
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                }
              : { backgroundColor: "var(--bg-fill3)" }
          }
          className={
            "w-full shadow-lg rounded-lg mx-auto mt-4 flex flex-col md:flex-row overflow-hidden"
          }
        >
          <div
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill6)",
                    color: "var(--txtColor2)",
                  }
                : {
                    backgroundColor: "var(--bg-fill5)",
                    color: "var(--txtColor2)",
                  }
            }
            className={"w-full md:w-1/3 py-7 px-3 md:px-8 inline-block"}
          >
            <div className=" w-full rounded-lg relative shadow-inset">
              <h2>Basic Information</h2>
              <h3 className={"text-sm"}>Edit Your Account Info</h3>
            </div>
          </div>

          {/* RIGHT HAND SIDE  */}
          <div className="md:w-2/3 pt-4 pb-6 w-full">
            <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 pt-4 px-10"
            >
              <label htmlFor="name" className="flex text-sm">
                Username
                <p
                  id="name"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                ></p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : {
                        backgroundColor: "var(--bg-fill3)",
                      }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                placeholder="Enter Your Name"
                value={username}
                name={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* <div className="py-2 px-10">
              <label htmlFor="name" className="text-sm flex text-gray-600">
                Contact
                <p
                  id="contact"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                >
                  (Contact is not filled!)
                </p>
                <p
                  id="contact2"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                >
                  (Contact is too short!)
                </p>
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
                }
                type="number"
                placeholder="Enter Your Phone Number"
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div> */}

            <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 px-10"
            >
              <label htmlFor="name" className="text-sm flex">
                Email
                <p
                  id="email"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                ></p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : {
                        backgroundColor: "var(--bg-fill3)",
                      }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="email"
                placeholder="Enter Your  Email"
                value={email}
                name={email}
                id={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 px-10"
            >
              <label htmlFor="phone" className="text-sm flex">
                Phone Number
                <p
                  id="contact"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                ></p>
              </label>

              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : {
                        backgroundColor: "var(--bg-fill3)",
                      }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base "
                }
                type="number"
                name="phone"
                placeholder="Enter Your Phone Number"
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full flex justify-end">
        <button
          disabled={BtnDisabled}
          onClick={() => editUserDetails()}
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
          className={
            "btn-hover3 text-sm font-medium px-5 py-3 rounded float-right uppercase cursor-pointer"
          }
        >
          {BtnDisabled === false ? (
            "Get Data"
          ) : (
            <PulseLoader color={"white"} size={10} style={{ zIndex: "-10" }} />
          )}
        </button>
      </div>
    </div>
  );
}

export default EditProfileUser;
