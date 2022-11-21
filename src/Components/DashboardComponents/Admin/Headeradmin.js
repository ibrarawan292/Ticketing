// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ApiURL from "../../../config/config";
// const Headeradmin = (props) => {
//   let navigate = useNavigate();
//   var axios = require("axios");
//   var data = "";

//   var config = {
//     method: "post",
//     url: ApiURL + "/AdminLogout",

//     headers: {
//       Authorization: "Bearer " + props.token,
//     },
//     data: data,
//   };

//   const logMeOut = () => {
//     axios(config)
//       .then(function (response) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("refresh");
//       })
//       .then(function (response) {
//         navigate("/admin-login");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   return (
//     <a
//       onClick={logMeOut}
//       className="cursor-pointer hover:underline hover:text-emerald-500"
//     >
//       Log Out
//     </a>
//   );
// };

// export default Headeradmin;
