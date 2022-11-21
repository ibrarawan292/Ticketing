import { useState } from "react";
import ApiURL from "../../Config/Config";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const UserPasswordReset = () => {
  let { username, token } = useParams();

  let navigate = useNavigate();

  const { DarkMode, RefreshUserLogin, setRefreshUserLogin } =
    useContext(ThemeContext);

  const [btnDisabled, setBtnDisabled] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ResetPassUser = () => {
    if (password === "") {
      document.getElementById("password-field").innerHTML =
        "Please enter your new password!";
    } else if (confirmPassword === "") {
      document.getElementById("password-field").innerHTML =
        "Please enter confirm password!";
    } else if (password.length < 8) {
      document.getElementById("password-field").innerHTML =
        "Password should have more than 8 characters!";
      document.getElementById("password-field").innerHTML = "";
    } else if (password !== confirmPassword) {
      document.getElementById("password-field").innerHTML =
        "Confirm password does not match!";
    } else {
      setBtnDisabled(true);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        newpassword: password,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(ApiURL + "/reset-password-user/" + token, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
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

            toast.success("Redirecting to the login page!");

            localStorage.setItem("AccessTokenUser", "");
            localStorage.setItem("RefreshTokenUser", "");
            localStorage.setItem("UserIsLogin", "false");

            setTimeout(function () {
              setRefreshUserLogin(RefreshUserLogin === true ? false : true);
              navigate("/user-dashboard");
            }, 2000);
            setBtnDisabled(false);
          } else if (result.status === 406) {
            toast.error("Token is either invalid or expired!");
          } else {
            toast.error("Oops! Some Error Occurred!");

            setBtnDisabled(false);
          }
        })
        .catch((error) => {
          setBtnDisabled(false);
          toast.error("Oops! Some Error Occurred!");
        });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <ToastContainer />

      <div className="w-full flex justify-center items-center">
        <div
          style={{
            backgroundColor: "var(--bg-fill5)",
          }}
          className="w-10/12 lg:w-1/2 px-20 py-20 flex flex-col items-center rounded-lg shadow-lg"
        >
          <h6 className="mb-2 text-2xl font-bold text-center md:text-3xl">
            <span
              style={{
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }}
            >
              Reset password
            </span>
          </h6>

          <div className="w-full py-3 text-center text-red-500 text-sm">
            <p id="password-field"></p>
          </div>

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border p-3 w-full text-base"
            placeholder="Enter new password"
            required
          />

          <input
            type="password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-md border mt-5 p-3 w-full text-base"
            placeholder="Confirm new password"
            required
          />

          <div className="w-full flex justify-end mt-5">
            <button
              style={{
                backgroundColor: "var(--bg-fill4)",
                color: "var(--txtColor1)",
              }}
              disabled={btnDisabled}
              className="px-5 py-3 rounded-md btn-hover2"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                ResetPassUser();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPasswordReset;
