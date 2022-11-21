import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import ApiURL from "../../../Config/Config";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../../../App";

function Contacts(props) {
  const { DarkMode } = useContext(ThemeContext);

  const [Loader, setLoader] = useState(true);
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);
  const [AddMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState("");

  const getUserMessages = () => {
    var requestOptions = {
      method: "get",
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(ApiURL + "/ShowMyMessages", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTableData(result["contact_messages"]);
      })
      .then(() => {
        setLoader(false);
        setRefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const postUserMessages = () => {
    var raw = JSON.stringify({
      message: message,
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/SendAdminMessage", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddMessage(!AddMessage);
        setRefresh(true);
        setLoader(false);
        notify();
      })
      .then(() => {})
      .catch((error) => console.log("error", error));
  };

  // useEffect(() => {
  //   getUserMessages("");
  // }, [refresh]);

  // useEffect(() => {
  //   getUserMessages("");
  // }, [record]);

  const notify = () => toast("Message sent Successfully");

  return (
    <div className="flex flex-col w-full -mt-5">
      <ToastContainer />
      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <input
          className="py-2 md:-ml-2 px-2 border border-gray-400 rounded-md w-full md:w-2/6"
          type="search"
          placeholder="Search Messages"
        />
        <button
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                  color: "var(--txtColor2)",
                }
              : {
                  backgroundColor: "var(--bg-fill6)",
                }
          }
          className="py-3 px-10 mt-5 md:mt-0 w-full md:w-fit rounded-md btn-hover3"
          onClick={() => setAddMessage(!AddMessage)}
        >
          Message
        </button>
      </div>
      <section className="w-full flex justify-center">
        <div className="container w-full mx-auto px-4 sm:px-8">
          <div className="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full rounded-lg overflow-hidden">
                <form>
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr className="bg-gray-100 text-gray-800 py-4">
                        <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          NAME
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          MESSAGE
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          EMAIL
                        </th>

                        <th className="px-12 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          DATE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData &&
                        tableData.map((item) => {
                          return (
                            <tr>
                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["name"]}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["message"]}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["email"]}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <div className="flex items-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["date_created"].slice(0, 17)}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADD Message SECTION  */}
      <section
        className={
          AddMessage === true
            ? "fixed flex top-0 left-0 w-full h-screen justify-center items-center edit-table-modal"
            : "hidden"
        }
      >
        <div className="w-full mx-5 relative md:w-3/5 flex flex-col sm:flex-row bg-white shadow-lg rounded-lg">
          <AiOutlineCloseCircle
            onClick={() => setAddMessage(!AddMessage)}
            className="absolute top-3 right-5 cursor-pointer text-2xl hover:text-gray-400"
          />

          <div className="w-full sm:w-60 p-5 text-center sm:text-left bg-gray-100 rounded-l-lg">
            <h2 className="text-lg">Message A User</h2>
            <p className="py-2 text-xs text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, cum.
            </p>
          </div>
          <div className="w-full md:w-5/6 p-5">
            <form
              className="flex flex-col p-5"
              onSubmit={(e) => (e.preventDefault(), postUserMessages())}
            >
              <label htmlFor="user-message ">
                Message
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  name="message"
                  className="p-2 mt-1 mb-5 w-full h-52 text-sm border rounded-md"
                  placeholder="Message"
                  required
                />
              </label>

              <div className="w-full flex justify-end">
                <button>ADD</button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacts;
