import React, { useState, useEffect } from "react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import ReactPaginate from "react-paginate";
import ApiURL from "../../../Config/Config";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../../../App";

function PlanInfo(props) {
  const { DarkMode } = useContext(ThemeContext);

  const [Loader, setLoader] = useState(true);
  const [tableData, setTableData] = useState("");
  const [planData, setPlanData] = useState("");

  const [refrh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);

  const [CardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardCVC, setCVC] = useState("");
  const [PayModal, setPayModal] = useState(false);
  const [PlanId, setPlanID] = useState(0);

  const process = () => toast("Payment is being processed");
  const processError = () => toast("Invalid Details!");
  const processDone = () => toast("Payment Confirmed!");

  const getPlan = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + props.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/UserListPlans", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPlanData(result["plans"]);
        console.log(planData);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "error");
      });
  };

  const Plan_Upgrade = () => {
    var month = cardMonth.split("-");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + props.token);
    process();
    var raw = JSON.stringify({
      payment_method: "stripe",
      cardNumber: CardNumber,
      exp_month: parseInt(month[1]),
      exp_year: parseInt(month[0]),
      cvc: cardCVC,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/UserUpgradePlan/" + PlanId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "Result Here!!!");
        console.log(result, "Status Here!!!");
        if (result === 200) {
          processDone();
        } else {
          processError();
        }
      })
      .catch((error) => {
        console.log(error, " error");
        processError();
      });
  };

  console.log(PlanId);

  const getPlans = () => {
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    };

    fetch(ApiURL + "/UserInvoices", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result["user_invoices"]);
        setTableData(result["user_invoices"]);
      })

      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getPlans();
  }, []);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((pick) => (
            <>
              <tr>
                <td className="px-5 space-x-2 py-3 border-b border-gray-200 bg-white text-xs">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {pick.plan}
                  </p>
                </td>

                <td className="px-14 py-3 border-b border-gray-200 bg-white text-xs">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {pick.remaining}
                  </p>
                </td>

                <td className=" px-5 py-3 border-b border-gray-200 bg-white text-sm">
                  <p
                    id="query_status_r1"
                    className="text-gray-600 whitespace-no-wrap"
                  >
                    {pick.start}
                  </p>
                </td>

                <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {pick.expiry}
                  </p>
                </td>
                <td className="flex border-b border-gray-200 bg-white text-sm">
                  <button
                    type="button"
                    className="py-5 mx-2 flex flex-col items-center rounded-full border text-emerald-500 hover:text-emerald-400 text-xs border-white "
                  >
                    <AiOutlineArrowUp />
                    <p>Upgrade</p>
                  </button>
                  <button
                    type="button"
                    className="py-5 mx-2 flex flex-col items-center rounded-full border text-red-600 hover:text-red-400 text-xs border-white "
                  >
                    <AiOutlineArrowDown />
                    <p>Downgrade</p>
                  </button>
                </td>
              </tr>
            </>
          ))}
      </>
    );
  }

  return (
    <div className="flex flex-col w-full -mt-5">
      <Helmet>
        <title>Ticket System | User | Plans Info</title>
      </Helmet>

      <ToastContainer />

      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <form className="flex" onSubmit={(e) => e.preventDefault()}>
          <input
            className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
            type="search"
            placeholder="Search Plans"
          />
          <button
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill5)",
                    color: "var(--txtColor2)",
                    border: "1px solid gray",
                  }
                : {
                    backgroundColor: "var(--bg-fill6)",
                    border: "1px solid gray",
                  }
            }
            type="submit"
            className=" btn-hover3 px-4 rounded-r border-gray-400"
          >
            <GoSearch />
          </button>
        </form>
      </div>
      <section className="w-full flex justify-center">
        <div className="container w-full mx-auto px-4 sm:px-8">
          <div className="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full rounded-lg overflow-hidden">
                <form>
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr className="bg-gray-100 text-gray-800 py-4">
                        <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          PLAN
                        </th>

                        <th className="px-3 py-3 border-b-2 border-gray-200 text-center md:text-left text-xs font-semibold uppercase tracking-wider">
                          QUERIES REMAINING
                        </th>

                        <th className=" md:px-6 py-3 border-b-2 border-gray-200 text-center md:text-left text-xs font-semibold uppercase tracking-wider">
                          <p className="w-32 md:w-0"></p>
                          START DATE
                        </th>

                        <th className="md:px-10 py-3 border-b-2 border-gray-200 text-center md:text-left text-xs font-semibold uppercase tracking-wider">
                          <p className="w-32 md:w-0"></p>
                          EXPIRY
                        </th>
                        <th className="md:pl-12 py-3 border-b-2 border-gray-200  text-center md:text-left text-xs font-semibold uppercase tracking-wider">
                          UPDATE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData &&
                        tableData.map((item) => {
                          return (
                            <tr>
                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["plan_name"]}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["queries_remaining"]}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["start_date"].slice(0, 17)}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["end_date"].slice(0, 17)}
                                </p>
                              </td>
                              <td className=" py-5 border-b border-gray-200 bg-white text-sm text-center">
                                <button
                                  type="button"
                                  className="px-2 py-2 mx-2 rounded-full border text-emerald-500 hover:text-emerald-400 text-lg border-white hover:border-emerald-400"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    getPlan();
                                    setPayModal(true);
                                  }}
                                >
                                  <AiOutlineArrowUp />
                                </button>
                                {/* <button
                                    onClick={(e) => {
                                   
                                    }}
                                    type="button"
                                    className="px-2 py-2 mx-2 rounded-full border text-red-600 hover:text-red-400 text-lg border-white hover:border-red-400"
                                  >
                                    <AiOutlineArrowDown />
                                  </button> */}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT MODAL  */}
      {PayModal === true ? (
        <div className="w-screen h-screen z-50 my-background absolute top-0 left-0 flex justify-center items-center">
          <div className="w-11/12 md:w-1/2 lg:w-1/3 rounded-lg bg-white p-5 relative">
            <AiOutlineCloseCircle
              onClick={() => setPayModal(false)}
              className="absolute right-5 text-2xl hover:text-gray-500 cursor-pointer"
            />
            <div className="mb-6 mt-3">
              <div className="">
                <label
                  htmlFor="PlanDetails"
                  className="flex flex-col items-start text-gray-500"
                >
                  <span className="flex">
                    {" "}
                    <p className="text-gray-600">Plan Info</p>
                  </span>
                  <select
                    type="select"
                    name="PlanDetails"
                    value={PlanId}
                    onChange={(e) => {
                      setPlanID(e.target.value);
                    }}
                    className="w-full border mt-1 border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                    placeholder="Your Plan Details"
                  >
                    {planData &&
                      planData.map((items) => {
                        return (
                          <option value={items["plan_id"]}>
                            {items["plan_name"]}
                          </option>
                        );
                      })}
                  </select>
                </label>
              </div>
            </div>
            <h2 className="pb-3 text-xl font-bold flex align-middle">
              Stripe Payment
            </h2>
            <form
              className="space-y-5"
              action="payment"
              onSubmit={(e) => (e.preventDefault(), Plan_Upgrade())}
            >
              <div className="flex flex-col">
                <p className="text-gray-700 flex text-sm mb-1">
                  Card Number<span className="text-red-600"> *</span>
                  <p
                    id="card-number"
                    className="text-red-500 hidden text-xs font-light self-center"
                  >
                    (invalid!)
                  </p>
                </p>
                <input
                  type="number"
                  value={CardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                  placeholder="Credit Card Number"
                  required
                />
              </div>

              <div className="flex space-x-8">
                <div className="flex flex-col w-full">
                  <p className="text-gray-700 text-sm mb-1">
                    Expiry Month<span className="text-red-600"> *</span>
                  </p>
                  <input
                    type="month"
                    value={cardMonth}
                    onChange={(e) => setCardMonth(e.target.value)}
                    className="w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="text-gray-700 text-sm flex mb-1">
                    CVC<span className="text-red-600"> *</span>
                    <p
                      id="cvc"
                      className="text-red-500 hidden text-xs font-light self-center"
                    >
                      (Invalid!)
                    </p>
                  </p>
                  <input
                    type="number"
                    value={cardCVC}
                    onChange={(e) => setCVC(e.target.value)}
                    className="w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                    placeholder="CVC"
                    required
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  // Check();
                }}
                className="inline-block rounded-sm bg-black font-medium border border-solid cursor-pointer text-center text-base py-3 px-6 text-white w-full mt-5"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PlanInfo;
