import React, { useState, useEffect, useContext } from "react";
import AdminLogin from "../Pages/auth/Admin/AdminLogin";
import { ThemeContext } from "../App";
// import AdminDashboard from "../Pages/Dashboards/AdminDashboard";
import Dashboard from "../Pages/Dashboards/Dashboard";

const AProtectedRoute = () => {
  const { RefreshAdminLogin } = useContext(ThemeContext);

  const [AdminIsLogin, setAdminIsLogin] = useState(
    localStorage.getItem("AdminIsLogin")
  );

  useEffect(() => {
    setAdminIsLogin(localStorage.getItem("AdminIsLogin"));
    console.log(AdminIsLogin);
  }, [RefreshAdminLogin]);

  return AdminIsLogin === "true" ? <Dashboard /> : <AdminLogin />;
};

export default AProtectedRoute;
