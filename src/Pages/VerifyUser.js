import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiURL from "../Config/Config";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const VerifyUser = () => {
  let { username, token } = useParams();

  const [message, setMessage] = useState("");

  const verifyEmail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      ApiURL + "/verify-email-user/" + token + "/" + username,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMessage(result.message);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <>
      <Helmet>
        <title>User Verification </title>
      </Helmet>
      <div className="flex items-center justify-center w-full h-screen crab-bg">
        <div className="lg:px-40 lg:py-20 md:px-20 md:py-10 py-8 px-4 bg-white rounded-md shadow-xl">
          <div className="flex flex-col items-center">
            <h1
              style={{
                color: "var(--bg-fill5)",
              }}
              className="font-bold font-mono lg:text-8xl text-5xl"
            >
              Welcome!
            </h1>
            <h6 className="mb-2 pt-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              {message}
            </h6>
            <Link
              style={{
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }}
              to="/user-login"
              type="button"
              className="btn-hover3 mt-5 rounded-md text-sm px-5 py-3 mb-3 md:mb-0 text-center"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyUser;
