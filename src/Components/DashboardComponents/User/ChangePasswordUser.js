import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Helmet from "react-helmet";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../App";
import UserRefreshToken from "../../../Pages/auth/User/UserRefreshToken";
import ApiURL from "../../../Config/Config";

function ChangePasswordUser() {
  const { DarkMode, RefreshUserLogin, setRefreshUserLogin } =
    useContext(ThemeContext);

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [BtnDisabled, setBtnDisabled] = useState(false);
  let navigate = useNavigate();
  const [passErr, setPassErr] = useState("");

  const editPassword = () => {
    const token = localStorage.getItem("AccessTokenUser");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      oldpassword: oldpassword,
      newpassword: newpassword,
      confirmPassword: confirmPassword,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (oldpassword === "" || newpassword === "" || confirmPassword === "") {
      toast.error("Please fill the empty fields!");
    } else if (newpassword != confirmPassword) {
      toast.error("Oops! Passwords do not match.!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (newpassword.length < 8 && confirmPassword.length < 8) {
      toast.error("Oops! Password must be of 8 character.!");
    } else {
      setBtnDisabled(true);
      fetch(ApiURL + "/user/change-password", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg !== "Token has expired") {
            if (result.status === 200) {
              toast.success("Password Edited Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setNewPassword("");
              setOldPassword("");
              setConfirmPassword("");
              setBtnDisabled(false);

              localStorage.setItem("AccessTokenUser", "");
              localStorage.setItem("RefreshTokenUser", "");
              localStorage.setItem("UserIsLogin", "false");

              setTimeout(function () {
                setRefreshUserLogin(RefreshUserLogin === true ? false : true);
              }, 2000);
            } else if (result.message === "OLD PASSWORD IS WRONG") {
              setBtnDisabled(false);
              toast.error("Old Password is Wrong!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else if (result.msg === "Token has expired") {
            UserRefreshToken();
          } else {
            toast.error("Oops! Some Error Occurred!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setBtnDisabled(false);
          }
        })

        .catch((error) => {
          toast.error("Oops! Some Error Occurred!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBtnDisabled(false);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Ticket System | User | Change Password</title>
      </Helmet>
      <div className="w-3/4 ">
        <ToastContainer />
        <div
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill3)",
                }
              : { backgroundColor: "var(--bg-fill3)" }
          }
          className={
            "w-full rounded-lg mx-auto mt-8 flex flex-col md:flex-row overflow-hidden shadow-lg"
          }
        >
          <div
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill4)",
                    color: "var(--txtColor2)",
                  }
                : {
                    backgroundColor: "var(--bg-fill5)",
                    color: "var(--txtColor2)",
                  }
            }
            className={"w-full md:w-1/3  py-8 px-3 md:px-8 inline-block"}
          >
            <div className="w-full">
              <h2
                className={
                  "font-medium text-base text-center mb-4 tracking-wide"
                }
              >
                Change Password
              </h2>
            </div>

            <p className={"text-xs text-center"}>
              To Change the password enter your old password, new password and
              confirm it!
            </p>
          </div>
          <div className="md:w-full w-full">
            <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 pt-12 px-10"
            >
              <label htmlFor="name" className="text-sm flex">
                Old Password<span className="text-red-800">*</span>
                <p
                  id="oldpassword"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Old Password is not filled!)
                </p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : { backgroundColor: "var(--bg-fill3)" }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base "
                }
                type="password"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter Old Password"
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
              <label htmlFor="name" className="text-sm flex">
                New Password<span className="text-red-800">*</span>
                <p
                  id="newpassword"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (New password is not filled!)
                </p>
                <p
                  id="newpassword2"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Password must have 8 characters!)
                </p>
                <p
                  id="newpassword3"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  ({passErr})
                </p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : { backgroundColor: "var(--bg-fill3)" }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
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
              className="py-2 mb-6 px-10"
            >
              <label htmlFor="name" className="text-sm flex ">
                Confirm Password<span className="text-red-800">*</span>
                <p
                  id="confirmpassword"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Confirm password is not filled!)
                </p>
                <p
                  id="confirmpassword2"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Passwords do not match!)
                </p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : { backgroundColor: "var(--bg-fill3)" }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="password"
                id="conf_pass_input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Confirm Password"
              />
            </div>
          </div>
        </div>
        <div
          className={
            " pt-6 md:pt-7 flex justify-between md:justify-end clearfix rounded-b-lg border-t"
          }
        >
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
            onClick={() => editPassword()}
            className={
              "btn-hover3 text-sm font-medium px-5 py-3 rounded float-right uppercase cursor-pointer"
            }
          >
            {BtnDisabled === false ? (
              "Update"
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
    </>
  );
}

export default ChangePasswordUser;
