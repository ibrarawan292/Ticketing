import React, { useState, useEffect } from "react";
import { BsBarChart, BsPersonCheck, BsPersonPlus } from "react-icons/bs";
import ApiURL from "../../../Config/Config";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../App";

function MainDashboardUser(props) {
  const [name, setQuery] = useState("");
  const [message, SetMessage] = useState("");
  const notify = () => toast(message);
  let navigate = useNavigate();

  const { DarkMode } = useContext(ThemeContext);

  const sendQuery = () => {
    var raw = JSON.stringify({
      name: name,
    });

    // Raw Data
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + props.token);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/CreateUserQuery", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        SetMessage(result);
        notify(message);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return (
    <>
      <h1>{message}</h1>
      <div className="flex flex-col min-w-[90%]">
        {/* <div className="flex items-center justify-center ">
          <div className="flex border-2 border-gray-200 rounded">
            <input
              className="px-4 py-2 w-80"
              type="search"
              name="search"
              placeholder="Search"
              required
              id="name"
              value={name}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="px-4 text-white bg-emerald-500 border-l"
              disabled={!name}
              onClick={(e) => {
                e.preventDefault();
                sendQuery();
              }}
            >
              Search
            </button>
          </div>
        </div> */}
        <ToastContainer />

        <div className=" min-w-[90%] h-full flex flex-col md:flex-row items-center md:justify-between md:items-start">
          <div
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill5)",
                    color: "var(--txtColor2)",
                  }
                : { backgroundColor: "var(--bg-fill3)" }
            }
            className={
              "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center shadow-lg text-3xl rounded"
            }
          >
            <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
              <div className="flex flex-col mt-1">
                <h2 className={" tracking-wider text-lg font-bold"}>
                  Services Subscribed
                </h2>
                <h3 className="text-gray-400  tracking-wider text-xs font-light">
                  Total Number Of Subscribed Services
                </h3>
              </div>
              <div className="flex w-full justify-between px-0 mt-4">
                <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                  24
                </h2>
                <BsPersonCheck
                  className="bg-blue-800 w-10 h-10 p-2 rounded"
                  color="white"
                  size="0.6em"
                />
              </div>
            </div>
          </div>
          <div
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill5)",
                    color: "var(--txtColor2)",
                  }
                : { backgroundColor: "var(--bg-fill3)" }
            }
            className={
              "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center shadow-lg text-3xl rounded"
            }
          >
            <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
              <div className="flex flex-col mt-1">
                <h2 className={" tracking-wider text-lg font-bold"}>
                  Services Available
                </h2>
                <h3 className="text-gray-400  tracking-wider text-xs font-light">
                  Total Number Of Services Available
                </h3>
              </div>
              <div className="flex w-full justify-between px-0 mt-4">
                <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                  57
                </h2>
                <BsBarChart
                  className="bg-green-800 w-10 h-10 p-2 rounded"
                  color="white"
                  size="0.6em"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                  color: "var(--txtColor2)",
                }
              : { backgroundColor: "var(--bg-fill3)" }
          }
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"tracking-wider text-lg font-bold"}>
                Expired Services
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of Services That Require Renewal
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                5
              </h2>
              <BsPersonPlus
                className="bg-red-700 w-10 h-10 p-2 rounded"
                color="white"
                size="0.6em"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainDashboardUser;
