import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import PricingCard from "../Cards/PricingCard";
import PricingCardYearly from "../Cards/PricingCardYearly";
import { BsFillCalendarCheckFill } from "react-icons/bs";
// import ApiURL from "../config/config";

function Pricing() {
  const { DarkMode } = useContext(ThemeContext);

  const [PricingTab, setPricingTab] = useState(1);
  const [tableData, setTableData] = useState("");

  // const getPlans = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //   };

  //   fetch(ApiURL + "/UserListPlans", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setTableData(result["plans"]);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  // useEffect(() => {
  //   getPlans();
  //   console.log(tableData);
  // }, []);

  return (
    <section
      style={
        DarkMode === true
          ? { backgroundColor: "var(--txtColor3)" }
          : { backgroundColor: "var(--bg-fill4)" }
      }
      className="py-20"
    >
      <div className="w-full">
        <div className="w-full text-center flex flex-col items-center">
          <h2 className="lg:w-1/2 leading-tight w-full text-4xl font-bold pb-5">
            Choose The Pricing Tag
          </h2>
        </div>

        <div className="w-full py-10 flex justify-center">
          <button
            onClick={() => setPricingTab(1)}
            style={
              DarkMode === true && PricingTab === 1
                ? {
                    color: "var(--bg-fill4)",
                    backgroundColor: "var(--bg-fill5)",
                  }
                : {
                    color: "",
                  }
            }
            className={
              DarkMode === false && PricingTab === 2
                ? "px-10 py-3 flex rounded-l-full bg-white text-black"
                : "px-10 py-3 flex rounded-l-full bg-black text-white"
            }
          >
            <BsFillCalendarCheckFill
              color={DarkMode === true ? "" : "orange"}
              className="mr-2 self-center"
            />{" "}
            Monthly
          </button>
          <button
            onClick={() => setPricingTab(2)}
            style={
              DarkMode === true && PricingTab === 2
                ? {
                    color: "var(--bg-fill4)",
                    backgroundColor: "var(--bg-fill5)",
                  }
                : {
                    color: "",
                  }
            }
            className={
              DarkMode === false && PricingTab === 1
                ? "px-10 py-3 flex rounded-r-full bg-white text-black"
                : "px-10 py-3 flex rounded-r-full bg-black text-white"
            }
          >
            <BsFillCalendarCheckFill
              color={DarkMode === true ? "" : "orange"}
              className="mr-2 self-center"
            />{" "}
            Yearly
          </button>
        </div>

        <div className="w-full md:px-10">
          {PricingTab === 1 ? (
            <div className="w-full grid md:grid-col-2 lg:grid-col-3 xl:grid-cols-3 place-items-center gap-5 lg:gap-10">
              <PricingCard tableData={tableData} />
            </div>
          ) : null}

          {PricingTab === 2 ? (
            <div className="w-full grid md:grid-col-2 lg:grid-col-3 xl:grid-cols-3 place-items-center gap-5 lg:gap-10">
              <PricingCardYearly tableData={tableData} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
