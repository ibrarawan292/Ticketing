import React, { useContext } from "react";
import ApiUrl from "../../../App";
import { ThemeContext } from "../../../App";

const AdminRefreshToken = () => {
  const token = localStorage.getItem("RefreshTokenUser");

  const { TokenRefreshUser, setTokenRefreshUser } = useContext(ThemeContext);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let status;

  fetch(ApiUrl + "/UserRefreshToken", requestOptions)
    .then((response) => ((status = response.status), response.json()))
    .then((result) => {
      if (status === 200) {
        // localStorage.setItem("AdminAuth", JSON.stringify(result));
        localStorage.getItem("RefreshTokenUser", JSON.stringify(result));
        localStorage.getItem("AccessTokenUser", JSON.stringify(result));
      }
    })
    .then(() => {
      if (status === 200) {
        setTokenRefreshUser(TokenRefreshUser === true ? false : true);
        return "Refresh token successful!";
      } else {
        return "Refresh token failed!";
      }
    })
    .catch((error) => {
      return "Error 500!";
    });
};

export default AdminRefreshToken;
