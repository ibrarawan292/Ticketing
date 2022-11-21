import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import { AiFillFire } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ApiURL from "../../Config/Config";
import { PulseLoader } from "react-spinners";

function PricingCard() {
  let navigate = useNavigate();

  const { DarkMode } = useContext(ThemeContext);

  const [time, setTime] = useState("Month");
  const [duration, setDuration] = useState(1);
  const [planid, setPlanId] = useState("");

  const [Loading, setLoading] = useState(false);

  const [Plans, setPlans] = useState([]);

  // pricing card api starts
  const getPricingMonthly = () => {
    setLoading(true);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(ApiURL + "/UserListMonthlyPlans", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setPlans(result.plans);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  // pricing card api ends

  useEffect(() => {
    getPricingMonthly();
  }, []);

  return (
    <>
      {Loading === true ? (
        <div className="w-full flex justify-center items-center absolute right-0">
          <PulseLoader
            color={"var(--bg-fill5)"}
            size={30}
            style={{ zIndex: "10" }}
          />
        </div>
      ) : (
        <>
          {/* {tableData && tableData.map((item) => ( */}
          {Plans.slice(-3)?.map((item) => (
            <div
              key={item.id}
              style={
                DarkMode === true
                  ? {
                      backgroundColor: "var(--bg-fill5)",
                      color: "var(--txtColor3)",
                    }
                  : { backgroundColor: "var(--bg-fill3)" }
              }
              className={
                DarkMode === true
                  ? "w-11/12 lg:w-[370px] py-10  rounded-lg hover:-translate-y-2 hover:duration-500 hover:shadow-lg hover:shadow-gray-700"
                  : "w-11/12 lg:w-[370px] py-10  rounded-lg hover:-translate-y-2 hover:duration-500 hover:shadow-lg hover:shadow-orange-200"
              }
            >
              <div className="w-full pl-10 lg:pl-16 text-2xl">
                <p>{item.plan_name}</p>
              </div>
              <div className="w-full flex pl-10 lg:pl-16 py-5 text-2xl">
                <p className="text-sm mr-1">$</p>
                <p className="text-4xl self-end mr-1">{item.price}</p>
                <p className=" text-sm mb-1 self-end">/ monthly</p>
              </div>

              <div className="w-full space-y-2 pt-5 pl-14 lg:pl-20">
                <div className="flex items-center">
                  <p className=" ">
                    {item.description}
                    {/* <PlanDesc data={item["description"].split(",")} /> */}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <Link
                  to="/"
                  // to={
                  //   "/signup/" +
                  //   time +
                  //   "/" +
                  //   duration +
                  //   "/" +
                  //   item["plan_id"] +
                  //   "/" +
                  //   item["price"]
                  // }
                >
                  <button
                    style={
                      DarkMode === true
                        ? {
                            color: "var(--bg-fill4)",
                            backgroundColor: "var(--btn-bgColor1)",
                          }
                        : {
                            color: "var(--txtColor2)",
                            backgroundColor: "var(--btn-bgColor1)",
                          }
                    }
                    className={
                      DarkMode === true
                        ? "px-6 py-3 mt-10 flex items-center btn-hoverDark2 rounded-md"
                        : "px-6 py-3 mt-10 flex items-center btn-hover4 rounded-md"
                    }
                    onClick={() => navigate("/pricing")}
                  >
                    <AiFillFire
                      size="1.3em"
                      color={DarkMode === true ? "" : "orange"}
                      className="mr-2 self-center"
                    />
                    Try it Now
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {/* ))} */}
        </>
      )}
    </>
  );
}

export default PricingCard;
