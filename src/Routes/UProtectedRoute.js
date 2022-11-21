import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import UserLogin from "../Pages/auth/User/UserLogin";
import DashboardUser from "../Pages/Dashboards/DashboardUser";

const UProtectedRoute = () => {
  const { RefreshUserLogin } = useContext(ThemeContext);

  const [UserIsLogin, setUserIsLogin] = useState(
    localStorage.getItem("UserIsLogin")
  );

  useEffect(() => {
    setUserIsLogin(localStorage.getItem("UserIsLogin"));
    console.log(UserIsLogin, "user logged in successfully!!!");
  }, [RefreshUserLogin]);

  return UserIsLogin === "true" ? <DashboardUser /> : <DashboardUser />;
};

export default UProtectedRoute;
