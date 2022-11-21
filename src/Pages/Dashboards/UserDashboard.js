import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import Helmet from "react-helmet";
import ApiURL from "../../Config/Config";
import UserRefreshToken from "../auth/User/UserRefreshToken";

// icons
import { FiMenu } from "react-icons/fi";
import {
  AiOutlineMessage,
  AiOutlineCloseCircle,
  AiFillSetting,
} from "react-icons/ai";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import {
  MdDashboardCustomize,
  MdHistory,
  MdOutlineAddTask,
  MdOutlineRateReview,
} from "react-icons/md";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

const UserDashboard = () => {
  const [active, setActive] = useState(1);
  const [active2, setActive2] = useState(0);
  const [Accordion, setAccordion] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [UserModal, setUserModal] = useState(false);
  const [ShrinkMenu, setShrinkMenu] = useState(false);

  const { DarkMode, setDarkMode, RefreshUserLogin, setRefreshUserLogin } =
    useContext(ThemeContext);

  const toggle2 = () => {
    if (Accordion === 1) {
      return setAccordion(0);
    }
    setAccordion(1);
  };

  const token = localStorage.getItem("AccessTokenUser");

  // USER LOGOUT API STARTS
  const UserLogout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/user/logout", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.msg === "Token has expired") {
          localStorage.setItem("UserIsLogin", "");
          localStorage.setItem("AccessTokenUser", "");
          localStorage.setItem("RefreshTokenUser", "");
          setRefreshUserLogin(RefreshUserLogin === true ? false : true);
        } else if (result.msg !== "Token has expired") {
          UserRefreshToken();
          UserLogout();
        }
      })
      .catch((error) => console.log("error", error));
  };
  // ADMIN LOGOUT API ENDS

  return (
    <div>
      <Helmet>
        <title>Ticket System | User | Dashboard</title>
      </Helmet>
      <div
        className={
          DarkMode === true
            ? "w-full flex justify-center bg-gray-600"
            : "w-full flex justify-center bg-gray-200"
        }
      >
        <div
          className={
            ShrinkMenu === true
              ? "w-[90px] overflow-hidden relative hidden md:block h-screen"
              : "min-w-[230px] w-20% relative hidden md:block h-screen"
          }
        >
          <div
            className={
              ShrinkMenu === true
                ? "fixed h-full md:w-[90px] overflow-hidden"
                : "fixed h-full md:w-[230px]"
            }
          >
            <div
              style={
                DarkMode === true
                  ? { backgroundColor: "var(--bg-fill5)" }
                  : { backgroundColor: "var(--bg-fill5)" }
              }
              className="container w-full pl-6 pr-3 py-4 flex items-center justify-between"
            >
              <div className="flex">
                <p
                  className={
                    ShrinkMenu === true
                      ? "text-xl text-white/0 py-2"
                      : "text-xl text-white py-2"
                  }
                >
                  Dashboard
                </p>
              </div>

              <span
                onClick={() => setShrinkMenu(true)}
                className="text-white text-2xl hover:animate-pulse cursor-pointer"
              >
                <BiArrowToLeft />
              </span>
            </div>

            {/* SIDE BAR  */}
            <div
              style={
                DarkMode === true
                  ? { backgroundColor: "var(--bg-fill6)" }
                  : { backgroundColor: "" }
              }
              className="container bg-white/50 shadow-lg h-screen pt-8 pb-3 px-3 flex flex-col"
            >
              {/* FULL MENU  */}
              <span className={ShrinkMenu === true ? "hidden" : "space-y-5"}>
                <p
                  style={
                    DarkMode === true
                      ? { color: "var(--bg-fill5)" }
                      : { color: "var(--bg-fill5)" }
                  }
                  className="text-xl px-5 py-2"
                >
                  Ticket System
                </p>

                {/* MENU ITEM 1 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(1);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 w-full flex rounded-full justify-between btn-hover3"
                  to=""
                >
                  <MdDashboardCustomize
                    size="1.3em"
                    className="mr-3 self-center"
                  />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Dashboard
                    </div>
                  </div>
                </NavLink>

                {/* MENU ITEM 2 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(4);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="manage-members"
                >
                  <MdOutlineAddTask size="1.3em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Manage Members
                    </div>
                  </div>
                </NavLink>

                {/* MENU ITEM 3 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(5);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="manage-family"
                >
                  <MdOutlineAddTask size="1.3em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Manage Family
                    </div>
                  </div>
                </NavLink>

                {/* MENU ITEM 4 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(10);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="manage-credit-cards"
                >
                  <AiFillSetting size="1.3em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Manage Credit-Cards
                    </div>
                  </div>
                </NavLink>

                {/* MENU ITEM 5 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(3);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="market-place"
                >
                  <MdOutlineRateReview
                    size="1.3em"
                    className="mr-3 self-center"
                  />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Market Places
                    </div>
                  </div>
                </NavLink>

                {/* MENU ITEM 6 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(5);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="ticketing-details"
                >
                  <AiOutlineMessage size="1.3em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Ticketing Details
                    </div>
                  </div>
                </NavLink>
              </span>

              {/* ICON ONLY MENU  */}
              <span className={ShrinkMenu === true ? "space-y-5" : "hidden"}>
                {/* MENU ITEM 1 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(1);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 w-full flex rounded-full justify-between btn-hover3"
                  to="main-dashboard"
                >
                  <MdDashboardCustomize
                    size="1.3em"
                    className="mr-3 self-center"
                  />
                </NavLink>

                {/* MENU ITEM 2 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(4);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="manage-members"
                >
                  <MdOutlineAddTask size="1.3em" className="mr-3 self-center" />
                </NavLink>

                {/* MENU ITEM ?? */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(10);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="manage-credit-cards"
                >
                  <AiFillSetting size="1.3em" className="mr-3 self-center" />
                </NavLink>

                {/* MENU ITEM 4 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(3);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="manage-Reviews"
                >
                  <MdOutlineRateReview
                    size="1.3em"
                    className="mr-3 self-center"
                  />
                </NavLink>

                {/* MENU ITEM 5 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(5);
                    setActive2(0);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="messages"
                >
                  <AiOutlineMessage size="1.3em" className="mr-3 self-center" />
                </NavLink>
              </span>
            </div>
          </div>
        </div>

        {/* HEADER  */}
        <div className="w-full lg:w-full flex flex-col items-start">
          <div
            style={
              DarkMode === true
                ? { backgroundColor: "var(--bg-fill5)" }
                : { backgroundColor: "var(--bg-fill5)" }
            }
            className="w-full relative flex flex-col items-center justify-center h-fit"
          >
            <div className="w-full top-0 flex justify-between items-center px-3 md:px-0 md:pl-7 md:pr-7 py-6">
              {/* Mobile Menu  */}
              <div className="flex md:hidden items-center">
                <FiMenu
                  className="cursor-pointer"
                  color={
                    DarkMode === true ? "var(--bg-fill3)" : "var(--bg-fill1)"
                  }
                  onClick={() => setShowMenu(!showMenu)}
                  size="1.3em"
                />
              </div>

              {/* MENU ITEMS START  */}
              <div
                style={
                  DarkMode === true
                    ? { backgroundColor: "var(--bg-fill6)" }
                    : { backgroundColor: "var(--bg-fill6)" }
                }
                className={
                  showMenu === true
                    ? "md:hidden w-full max-w-full max-h-full z-20 dashboard-animation backdrop-blur-lg fixed top-0 left-0 h-full"
                    : "md:hidden max-w-0 max-h-0 overflow-hidden z-20 dashboard-animation backdrop-blur-lg fixed top-0 left-0 h-full"
                }
              >
                <div className="container pr-5 w-full bg-black py-4 flex items-center justify-between">
                  <div className="closing-menu text-white w-full flex items-center justify-between">
                    <div className="flex pl-4 pr-10">
                      <p>Co-Crawler</p>
                    </div>
                    <FiMenu
                      className="zindex-dropdown"
                      color="darkgray"
                      onClick={() => setShowMenu(!showMenu)}
                      size="1.2em"
                    />
                  </div>
                </div>

                <div className="container h-screen space-y-5 pt-14 pb-3 flex flex-col">
                  {/* MENU ITEM 1 */}
                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      backgroundColor: isActive ? "var(--bg-fill1)" : "",
                    })}
                    onClick={() => {
                      setActive(1);
                      setActive2(0);
                      toggle2();
                    }}
                    className="py-4 text-2xl w-full flex justify-center text-gray-800"
                    to="main-dashboard-user"
                  >
                    <MdDashboardCustomize className="mr-3 self-center" />
                    <div className="self-center font-light cursor-pointer">
                      Dashboard
                    </div>
                  </NavLink>

                  {/* MENU ITEM 2 */}
                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      backgroundColor: isActive ? "var(--bg-fill1)" : "",
                    })}
                    onClick={() => {
                      setActive(2);
                      setActive2(0);
                      toggle2();
                    }}
                    className="py-4 text-2xl w-full flex justify-center text-gray-800"
                    to="query-history"
                  >
                    <MdHistory className="mr-3 self-center" />
                    <div className="self-center font-light cursor-pointer">
                      Query History
                    </div>
                  </NavLink>

                  {/* MENU ITEM 3 */}
                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      backgroundColor: isActive ? "var(--bg-fill1)" : "",
                    })}
                    onClick={() => {
                      setActive(3);
                      setActive2(0);
                      toggle2();
                    }}
                    className="py-4 text-2xl w-full flex justify-center text-gray-800"
                    to="plan-info"
                  >
                    <MdHistory className="mr-3 self-center" />
                    <div className=" self-center font-light cursor-pointer">
                      Plan Info
                    </div>
                  </NavLink>

                  {/* MENU ITEM 4 */}
                  <NavLink
                    end
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      backgroundColor: isActive ? "var(--bg-fill1)" : "",
                    })}
                    onClick={() => {
                      setActive(4);
                      setActive2(0);
                      toggle2();
                    }}
                    className="py-4 text-2xl w-full flex justify-center text-gray-800"
                    to="contacts"
                  >
                    <AiOutlineMessage className="mr-3 self-center" />
                    <div className="self-center font-light cursor-pointer">
                      Contacts
                    </div>
                  </NavLink>
                </div>
              </div>
              {/* MOBILE MENU ENDS HERE */}

              <div
                style={
                  DarkMode === true
                    ? { color: "var(--txtColor2)" }
                    : { color: "var(--txtColor1)" }
                }
                className="w-full flex justify-between"
              >
                <h2 className="pl-3 flex md:px-0 self-center text-lg text-white/0">
                  .
                  <span
                    onClick={() => setShrinkMenu(false)}
                    className={
                      ShrinkMenu === true
                        ? "text-white self-center text-2xl hover:animate-pulse cursor-pointer -ml-24"
                        : "hidden"
                    }
                  >
                    <BiArrowToRight />
                  </span>
                </h2>

                <div className="flex space-x-5">
                  <span className="text-lg self-center rounded-full text-white">
                    {DarkMode === true ? (
                      <BsFillSunFill
                        className="cursor-pointer "
                        onClick={() => setDarkMode(false)}
                      />
                    ) : (
                      <BsFillMoonFill
                        className="cursor-pointer "
                        onClick={() => setDarkMode(true)}
                      />
                    )}
                  </span>

                  <span className="flex space-x-3 text-white">
                    <FaUser
                      size="1.2em"
                      className={
                        active === 7 || active === 8 || active === 9
                          ? " self-center"
                          : " self-center"
                      }
                    />
                    <h2
                      onClick={() => setUserModal(!UserModal)}
                      className="self-center text-sm cursor-pointer hover:underline"
                    >
                      User Info
                    </h2>
                  </span>
                </div>

                {UserModal === true ? (
                  <div
                    onClick={() => setUserModal(!UserModal)}
                    className=" w-screen h-screen absolute top-0 right-0 user-modal flex justify-end"
                  >
                    <div
                      style={
                        DarkMode === true
                          ? {
                              backgroundColor: "var(--bg-fill5)",
                            }
                          : {
                              backgroundColor: "var(--bg-fill3)",
                            }
                      }
                      className="w-5/12 sm:w-4/12 md:w-2/12 h-fit flex flex-col relative mt-16 mr-10 border rounded-lg p-5 text-xs"
                    >
                      <AiOutlineCloseCircle
                        onClick={() => setUserModal(!UserModal)}
                        size="1.6em"
                        className="absolute top-2 right-3 cursor-pointer hover:text-gray-400"
                      />

                      <NavLink
                        end
                        style={({ isActive }) =>
                          DarkMode === true
                            ? {
                                color: isActive ? "var(--txtColor2)" : "",
                              }
                            : {
                                color: isActive ? "var(--txtColor1)" : "",
                              }
                        }
                        onClick={() => {
                          setActive(9);
                          setActive2(0);
                          toggle2();
                        }}
                        className="pb-2 cursor-pointer hover:underline "
                        to="view-profile-user"
                      >
                        View Profile
                      </NavLink>

                      <NavLink
                        end
                        style={({ isActive }) =>
                          DarkMode === true
                            ? {
                                color: isActive ? "var(--txtColor2)" : "",
                              }
                            : {
                                color: isActive ? "var(--txtColor1)" : "",
                              }
                        }
                        onClick={() => {
                          setActive(10);
                          setActive2(0);
                          toggle2();
                        }}
                        className="pb-2 cursor-pointer hover:underline "
                        to="edit-profile-user"
                      >
                        Edit Profile
                      </NavLink>

                      <NavLink
                        end
                        style={({ isActive }) =>
                          DarkMode === true
                            ? {
                                color: isActive ? "var(--txtColor2)" : "",
                              }
                            : {
                                color: isActive ? "var(--txtColor1)" : "",
                              }
                        }
                        onClick={() => {
                          setActive(11);
                          setActive2(0);
                          toggle2();
                        }}
                        className="pb-2 cursor-pointer hover:underline "
                        to="change-password-user"
                      >
                        Change Password
                      </NavLink>

                      <span
                        style={
                          DarkMode === true
                            ? {
                                color: "var(--txtColor2)",
                              }
                            : {
                                color: "var(--txtColor1)",
                              }
                        }
                        onClick={() => UserLogout()}
                        className="pb-2 cursor-pointer hover:underline"
                      >
                        Log Out
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* DASHBOARD SCREEN  */}
          <div className=" py-10 px-3 md:px-0 w-full md:w-full md:h-full flex justify-center items-start">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
