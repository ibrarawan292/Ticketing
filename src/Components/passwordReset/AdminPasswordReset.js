import { Routes, Route, useParams } from "react-router-dom";
import { useState } from "react";
import ApiURL from "../../Config/Config";
const AdminPasswordReset = () => {
  let { username, token } = useParams();

  const [password, setPassword] = useState("");

  const PasswordResetAdmin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      newpassword: password,
    });

    var requestOptions = {
      method: "patch",
      headers: myHeaders,
      body: raw,
    };

    fetch(ApiURL + "/ResetPasswordAdmin/" + token, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="lg:px-40 lg:py-20 md:px-20 md:py-10 py-8 px-4 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-600"> Reset password</span>
          </h6>
          <input
            type="email"
            name="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border py-2 px-2 w-full text-base"
            placeholder="Enter new password"
            required
          />

          <div className="w-full flex justify-end mt-5">
            <button
              className="bg-black px-5 py-3 text-white"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                PasswordResetAdmin();
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

export default AdminPasswordReset;
