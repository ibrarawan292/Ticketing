import React from "react";

function Adminlogin() {
  return (
    <div className="py-20 flex justify-center items-center">
      {/* FORGOT PASSWORD MODAL  */}
      <div className="w-80 bg-gray-800 flex flex-col">
        <div className="w-full px-5 py-3 border flex justify-between">
          <h2 className="text-white">Forgot Password?</h2>
          <h3 className="text-white pr-2 cursor-pointer">x</h3>
        </div>

        <div className="py-3 px-5 w-full flex flex-col">
          <label className="flex text-white " htmlFor="forgot pass">
            Email Address<p className="text-red-400 px-1">*</p>{" "}
          </label>
          <input
            className=" py-2 px-3 w-full text-sm"
            type="email"
            placeholder="Email Address"
            required
          />
        </div>

        <div className="px-5 w-full flex flex-col">
          <label className="flex text-white" htmlFor="forgot pass">
            Confirm Address<p className="text-red-400 px-1">*</p>{" "}
          </label>
          <input
            className="border-2 py-2 px-3 w-full text-sm "
            type="email"
            placeholder="Confirm Address"
            required
          />
        </div>

        <div className="py-5 w-full flex justify-center ">
          <button className="w-2/3 flex justify-center bg-gray-600 hover:opacity-90  rounded-md text-white text-[13px] py-3 px-8">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
