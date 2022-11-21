import React, { useState, useContext, useEffect } from "react";
import Helmet from "react-helmet";
import { ThemeContext } from "../../../App";
import ApiURL from "../../../Config/Config";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";

function ViewProfileAdmin() {
  const { DarkMode } = useContext(ThemeContext);

  const [Name, setName] = useState("");
  const [Contact, setContact] = useState("");
  const [Email, setEmail] = useState("");

  const token = localStorage.getItem("AccessTokenAdmin");

  const getAdminDetails = () => {
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
          setName(result.details["username"]);
          setContact(result.details["phone_no"]);
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken();
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <div className="flex flex-col w-11/12 justify-start ">
      <Helmet>
        <title>Ticket System | Admin | View Profile</title>
      </Helmet>
      {/* MAIN BODY  */}
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
            className={" w-full md:w-1/3 py-7 px-3 md:px-8 inline-block"}
          >
            <div className=" w-full rounded-lg relative shadow-inset">
              <h2>Basic Information</h2>
              <h3 className={"text-sm"}>View Your Account Info</h3>
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
                Name
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                placeholder="Enter Your Name"
                value={Name}
                disabled
                required
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
              <label htmlFor="email" className="text-sm flex ">
                Email
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="email"
                placeholder="Enter Your  Email"
                value={Email}
                disabled
              />
            </div>
            {/* <div className="py-2 px-10">
              <label for="name" className="text-sm flex text-gray-600">
                Address
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
                }
                type="text"
                name="name"
                disabled
                value={Address}
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
              <label htmlFor="phone" className="text-sm flex ">
                Phone Number
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="number"
                name="phone"
                placeholder="Enter Your Phone Number"
                disabled
                value={Contact}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfileAdmin;
