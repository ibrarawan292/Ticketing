import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Thank You</title>
      </Helmet>
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div className="lg:px-40 lg:py-20 md:px-20 md:py-10 py-8 px-4 bg-white rounded-md shadow-xl">
          <div className="flex flex-col items-center">
            <h1 className="font-semibold pb-2 font-sans text-gray-700 lg:text-8xl text-5xl">
              Thank You
            </h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-emerald-500">
                Your Order Has Been Approved!
              </span>
            </h6>

            <p className="mb-8 text-center text-gray-500 md:text-lg">
              You will receive your order in approximately 30:00 minutes.
            </p>

            <Link
              to="/"
              type="button"
              className="btn text-white flex w-fit bg-emerald-500 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:bg-emerald-400 font-medium rounded text-sm px-5 py-3 mb-3 md:mb-0 text-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
