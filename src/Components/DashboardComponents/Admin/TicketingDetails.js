import React, { useEffect, useState } from "react";
import { Data4 } from "./PlansData";
import { nanoid } from "nanoid";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import EditableRowMessages from "./EditableRowMessages";
// import ReadOnlyRowMessages from "./ReadOnlyRowMessages";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ApiURL from "../../../Config/Config";
import PaginationButtons from "../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import Helmet from "react-helmet";

function TicketingDetails(props) {
  const [Loader, setLoader] = useState(true);
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);
  //for notifications
  const notifyDelete = () => toast("Message Deleted Successfully");
  // Pagination
  const [totalRecords, setTotalRecords] = useState("");
  const [searchRecord, setSearchRecord] = useState(0);
  const [NumberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(5);
  const [totalSearchRecords, setTotalSearchRecords] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchGoto, setSearchGoto] = useState("");
  const [totalSearchPages, setTotalSearchPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchUsers, setSearchUser] = useState("");

  // console.log(props.token);

  const getMessages = (str) => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + props.token);

    var raw = JSON.stringify({
      query: str,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "http://127.0.0.1:5000/AdminSearchMessages/" +
        NumberOfRecordsPerPage +
        "/" +
        record,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLoader(false);
        setTableData(result["contact_messages"]);
        setTotalRecords(result.total_records);
        setTotalPages(result.pages);
      })
      .then(() => {
        setLoader(false);
        setRefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteMessages = (id) => {
    console.log("delete triggered!!!", id);
    setLoader(true);
    var requestOptions = {
      method: "patch",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    };
    fetch(ApiURL + "/DeleteContactMessage/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        notifyDelete();
        setRefresh(true);
        setLoader(true);
        console.log("Button Clicked!!");
        setLoader(false);
      })
      .catch((error) => {
        console.log("Button Clicked!!!!!!");
        console.log(error, "error");
        setLoader(false);
      });
  };

  useEffect(() => {
    getMessages("");
  }, [refresh]);

  useEffect(() => {
    getMessages("");
  }, [record]);

  return (
    <div className="flex flex-col w-full -mt-5">
      <Helmet>
        <title>Ticket System | Admin | Ticketing Details</title>
      </Helmet>
      <ToastContainer />
      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <form
          className="flex"
          onSubmit={(e) => (e.preventDefault(), getMessages(searchUsers))}
        >
          <input
            className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
            type="search"
            value={searchUsers}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search Ticketing Details"
          />
          <button
            type="submit"
            style={{ background: "var(--bg-fill1)" }}
            className=" text-white btn-hover px-4 rounded-r border-gray-400"
          >
            <GoSearch />
          </button>
        </form>
      </div>
      <section className="w-full flex justify-center">
        <div className="container w-full mx-auto px-4 sm:px-8">
          <div className="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <form>
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr className="bg-gray-100 text-gray-800 py-4">
                        <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          NAME
                        </th>

                        <th className="px-6 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          MESSAGE
                        </th>

                        <th className="px-7 sm:px-6 md:pl-6 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          EMAIL
                        </th>

                        <th className="px-12 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          DATE
                        </th>

                        <th className="px-7 sm:px-6 md:pl-6 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          ACTIONS
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
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["date_created"].slice(0, 17)}
                                </p>
                              </td>

                              <td className=" py-5 border-b border-gray-200 bg-white text-sm">
                                <button
                                  type="button"
                                  className="px-2 py-2 mx-2 rounded-full border text-red-600 hover:text-red-400 text-lg border-white hover:border-red-400"
                                  onClick={() => deleteMessages(item["id"])}
                                >
                                  <AiFillDelete className="self-center" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </form>
              </div>
              <PaginationButtons
                totalRecords={totalRecords}
                setRecord={setRecord}
                record={record}
                NumberOfRecordsPerPage={NumberOfRecordsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setGoto={setGoto}
                goto={goto}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TicketingDetails;
