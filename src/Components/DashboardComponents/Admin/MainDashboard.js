import { useState, useEffect } from "react";
import { BsBarChart, BsPersonCheck, BsPersonPlus } from "react-icons/bs";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
function MainDashboard(props) {
  var [countusers, setCountUsers] = useState();
  var [activeusers, setActiveusers] = useState();

  // var axios = require("axios");
  let navigate = useNavigate();

  // var config = {
  //   method: "get",
  //   url: " http://127.0.0.1:5000/AdminListAllUsers",

  //   headers: {
  //     Authorization: "Bearer " + props.token,
  //   },
  // };

  // axios(config)
  //   .then(function (response) {
  //     countusers = response.data.users;
  //     setCountUsers(countusers.length);
  //     console.log(countusers);
  //     activeusers = countusers.filter((element) => element.isActive == "1");
  //     activeusers = activeusers.length;
  //     setActiveusers(activeusers);
  //   })
  //   .catch(function (error) {
  //   });

  return (
    <div className="flex flex-col min-w-[90%]">
      <Helmet>
        <title>Ticket System | Admin | Dashboard</title>
      </Helmet>
      <div className=" min-w-[90%] h-full flex flex-col md:flex-row items-center md:justify-between md:items-start">
        <div
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center bg-white shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"text-gray-900 tracking-wider text-lg font-bold"}>
                Users Registered
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of Users Registered
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                {countusers}
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
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center bg-white shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"text-gray-900 tracking-wider text-lg font-bold"}>
                Active Users
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of Active Users
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                {activeusers}
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
      <div className=" min-w-[90%] h-full flex flex-col md:flex-row items-center md:justify-between md:items-start">
        <div
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center bg-white shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"text-gray-900 tracking-wider text-lg font-bold"}>
                Payments
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of Current Month Payments
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                $200
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
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center bg-white shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"text-gray-900 tracking-wider text-lg font-bold"}>
                Payments
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of All Payments
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                1
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
    </div>
  );
}

export default MainDashboard;
