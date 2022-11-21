import ApiUrl from "../../../Config/Config";
const AdminRefreshToken = ({ TokenRefresh, setTokenRefresh }) => {
  const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + AdminAuth.refresh_token);

  console.log("AdminAuth.refresh_token", AdminAuth.refresh_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let status;

  console.log("!!! Calling Refresh Token !!!");

  fetch(ApiUrl + "/AdminRefreshToken", requestOptions)
    .then((response) => ((status = response.status), response.json()))
    .then((result) => {
      if (status === 200) {
        localStorage.setItem("AdminAuth", JSON.stringify(result));

        setTokenRefresh(TokenRefresh === true ? false : true);
      } else {
        return "Refresh token failed!";
      }
    })
    .catch((error) => {
      return "Error 500!";
    });
};

export default AdminRefreshToken;
