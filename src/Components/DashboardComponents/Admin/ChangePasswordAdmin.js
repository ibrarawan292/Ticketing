import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePasswordAdmin(props) {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const [passErr, setPassErr] = useState("");
  const Check = (e) => {
    if (oldpassword === "") {
      document.getElementById("oldpassword").style.display = "block";
    } else document.getElementById("oldpassword").style.display = "none";

    // Checking New Password
    const passNumber = newpassword.search(/[0-9]/);
    const passSmall = newpassword.search(/[a-z]/);
    const passCapital = newpassword.search(/[A-Z]/);
    const passSpecial = newpassword.search(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    );
    if (newpassword === "") {
      document.getElementById("newpassword").style.display = "block";
      document.getElementById("newpassword2").style.display = "none";
      document.getElementById("newpassword3").style.display = "none";
    } else if (newpassword.length < 8) {
      document.getElementById("newpassword2").style.display = "block";
      document.getElementById("newpassword").style.display = "none";
      document.getElementById("newpassword3").style.display = "none";
    } else if (
      passNumber < 0 ||
      passSmall < 0 ||
      passCapital < 0 ||
      passSpecial < 0
    ) {
      var num = "",
        small = "",
        cap = "",
        special = "";
      if (passNumber < 0) {
        num = "number, ";
      }
      if (passSmall < 0) {
        small = "small letter, ";
      }
      if (passCapital < 0) {
        cap = "capital letter, ";
      }
      if (passSpecial < 0) {
        special = "special character, ";
      }
      setPassErr(num + small + cap + special + "is missing");
      document.getElementById("newpassword3").style.display = "block";
      document.getElementById("newpassword").style.display = "none";
      document.getElementById("newpassword2").style.display = "none";
    } else {
      document.getElementById("newpassword").style.display = "none";
      document.getElementById("newpassword2").style.display = "none";
      document.getElementById("newpassword3").style.display = "none";
    }
    if (confirmPassword === "") {
      document.getElementById("confirmpassword").style.display = "block";
      document.getElementById("confirmpassword2").style.display = "none";
    } else if (confirmPassword !== newpassword) {
      document.getElementById("confirmpassword2").style.display = "block";
      document.getElementById("confirmpassword").style.display = "none";
      setConfirmPassword("");
    } else {
      document.getElementById("confirmpassword").style.display = "none";
      document.getElementById("confirmpassword2").style.display = "none";
    }

    // if (ConfirmPassword === "") {
    //   document.getElementById("confirmpassword").style.display = "block";
    // } else document.getElementById("confirmpassword").style.display = "none";
    // if (ConfirmPassword !== NewPassword) {
    //   document.getElementById("confirmpassword2").style.display = "block";
    // } else document.getElementById("confirmpassword2").style.display = "none";
    // if (ConfirmPassword === NewPassword) {
    //   document.getElementById("confirmpassword2").style.display = "none";
    // }
    // if (ConfirmPassword !== NewPassword) {
    //   document.getElementById("conf_pass_input").value = "";
    // }
    e.stopPropagation();
  };

  return (
    <>
      <Helmet>
        <title>Ticket System | Admin | Change Password</title>
      </Helmet>
      <div className="w-3/4 ">
        <div
          className={
            "bg-white w-full rounded-lg mx-auto mt-8 flex flex-col md:flex-row overflow-hidden shadow-lg"
          }
        >
          <div
            style={{ background: "var(--bg-fill5)", color: "var(--bg-fill3)" }}
            className={" w-full md:w-1/3  py-8 px-3 md:px-8 inline-block"}
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
            <div className="py-2 pt-12 px-10">
              <label for="name" className="text-sm flex text-gray-600">
                Old Password<span className="text-red-800">*</span>
                <p
                  id="oldpassword"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Old Password is not filled!)
                </p>
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
                }
                type="password"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter Old Password"
              />
            </div>
            <div className="py-2 px-10">
              <label for="name" className="text-sm flex text-gray-600">
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
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
                }
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
              />
            </div>
            <div className="py-2 mb-6 px-10">
              <label for="name" className="text-sm flex text-gray-600">
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
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
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
            style={{ background: "var(--bg-fill5)" }}
            className={
              "btn-hover text-white text-sm font-medium px-5 py-3 rounded float-right uppercase cursor-pointer"
            }
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordAdmin;
