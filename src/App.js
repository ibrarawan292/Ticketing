import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/auth/Admin/AdminLogin";
import MainDashboard from "./Components/DashboardComponents/Admin/MainDashboard";
import ManageMembers from "./Components/DashboardComponents/Admin/ManageMembers";
import BuyTicket from "./Components/DashboardComponents/Admin/BuyTicket";
import ManageUsers from "./Components/DashboardComponents/Admin/ManageUsers";
import ManageCreditCards from "./Components/DashboardComponents/Admin/ManageCreditCards";
// import UserDashboard from "./Pages/Dashboards/UserDashboard";
// import MainDashboardUser from "./Components/UserDashboardComponents/MainDashboardUser";
// import UserLogin from "./Pages/auth/User/UserLogin";
// import Contacts from "./Components/UserDashboardComponents/Contacts";
// import QueryHistory from "./Components/UserDashboardComponents/QueryHistory";
// import UserInvoice from "./Components/UserDashboardComponents/UserInvoices";
// import ViewProfileUser from "./Components/UserDashboardComponents/ViewProfileUser";
// import EditProfileUser from "./Components/UserDashboardComponents/EditProfileUser";
import ViewProfileAdmin from "./Components/DashboardComponents/Admin/ViewProfileAdmin";
import EditProfileAdmin from "./Components/DashboardComponents/Admin/EditProfileAdmin";
import ChangePasswordAdmin from "./Components/DashboardComponents/Admin/ChangePasswordAdmin";
import AdminPasswordReset from "./Components/passwordReset/AdminPasswordReset";
import AProtectedRoute from "./Routes/AProtectedRoute";
import Error404 from "./Pages/ExtraPages/Error404";
import ThankYou from "./Pages/ExtraPages/ThankYou";
import Welcome from "./Pages/ExtraPages/WelcomePage";
// import ChangePasswordUser from "./Components/UserDashboardComponents/ChangePasswordUser";
// import PlanInfo from "./Components/UserDashboardComponents/PlanInfo";
import UserPasswordReset from "./Components/passwordReset/UserPasswordReset";
import VerifyUser from "./Pages/VerifyUser";
// import DemoRegistration from "./Pages/auth/User/DemoRegistration";
import MarketPlace from "./Components/DashboardComponents/Admin/MarketPlace";
// import UProtectedRoute from "./Routes/UProtectedRoute";
import ManageFamily from "./Components/DashboardComponents/Admin/ManageFamily";
import TicketingDetails from "./Components/DashboardComponents/Admin/TicketingDetails";
import MainDashboardUser from "./Components/DashboardComponents/User/MainDashboardUser";
import QueryHistory from "./Components/DashboardComponents/User/QueryHistory";
import PlanInfo from "./Components/DashboardComponents/User/PlanInfo";
import Contacts from "./Components/DashboardComponents/User/Contacts";
import ViewProfileUser from "./Components/DashboardComponents/User/ViewProfileUser";
import EditProfileUser from "./Components/DashboardComponents/User/EditProfileUser";
import ChangePasswordUser from "./Components/DashboardComponents/User/ChangePasswordUser";
import SignUp from "./Pages/auth/User/SignUp";
import UserLogin from "./Pages/auth/User/UserLogin";
import UProtectedRoute from "./Routes/UProtectedRoute";
import ManageEvents from "./Components/DashboardComponents/Admin/ManageEvents";
import ManageClubs from "./Components/DashboardComponents/Admin/ManageClubs";

export const ThemeContext = createContext();

function App() {
  const [RefreshAdminLogin, setRefreshAdminLogin] = useState(true);
  const [RefreshUserLogin, setRefreshUserLogin] = useState(true);
  const [TokenRefresh, setTokenRefresh] = useState(true);
  const [TokenRefreshUser, setTokenRefreshUser] = useState(true);

  const [DarkMode, setDarkMode] = useState(false);

  return (
    <div className="App">
      <ThemeContext.Provider
        value={{
          DarkMode,
          setDarkMode,
          RefreshAdminLogin,
          setRefreshAdminLogin,
          RefreshUserLogin,
          setRefreshUserLogin,
          TokenRefresh,
          setTokenRefresh,
          TokenRefreshUser,
          setTokenRefreshUser,
        }}
      >
        <Router>
          <Routes key={document.pathname}>
            <Route
              path="/admin-reset/:username/:token"
              element={<AdminPasswordReset />}
            />
            <Route
              path="/reset-password-user/:username/:token"
              element={<UserPasswordReset />}
            />

            <>
              <Route path="/admin-login" element={<Login />} />

              {/* Admin protected routes  */}
              <Route path="/" element={<AProtectedRoute />}>
                <Route index element={<MainDashboard />} />
                <Route path="" element={<MainDashboard />} />
                <Route path="manage-members" element={<ManageMembers />} />
                <Route path="buy-ticket" element={<BuyTicket />} />
                <Route path="manage-events" element={<ManageEvents />} />
                <Route path="manage-clubs" element={<ManageClubs />} />
                <Route path="manage-family" element={<ManageFamily />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route
                  path="manage-credit-cards"
                  element={<ManageCreditCards />}
                />
                <Route path="market-place" element={<MarketPlace />} />
                <Route
                  path="ticketing-details"
                  element={<TicketingDetails />}
                />
                <Route
                  path="view-profile-admin"
                  element={<ViewProfileAdmin />}
                />
                <Route
                  path="edit-profile-admin"
                  element={<EditProfileAdmin />}
                />
                <Route
                  path="change-password-admin"
                  element={<ChangePasswordAdmin />}
                />
              </Route>
            </>

            {/* USER ROUTES  */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user-login" element={<UserLogin />} />

            {/* user protected routes  */}
            <>
              <Route path="/user-dashboard" element={<UProtectedRoute />}>
                <Route index element={<MainDashboardUser />} />
                <Route
                  path="main-dashboard-user"
                  element={<MainDashboardUser />}
                />
                <Route path="query-history" element={<QueryHistory />} />
                <Route path="plan-info" element={<PlanInfo />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="view-profile-user" element={<ViewProfileUser />} />
                <Route path="edit-profile-user" element={<EditProfileUser />} />
                <Route
                  path="change-password-user"
                  element={<ChangePasswordUser />}
                />
              </Route>
            </>

            {/* Extra Pages  */}
            <Route path="*" element={<Error404 />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route
              path="/verify-user/:token/:username"
              element={<VerifyUser />}
            />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
