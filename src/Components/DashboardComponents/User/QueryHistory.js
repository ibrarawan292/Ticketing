import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import ApiURL from "../../../Config/Config";
import PaginationButtons from "../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import { AiOutlineDownload } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../../../App";

function QueryHistory(props) {
  const { DarkMode } = useContext(ThemeContext);

  const [Loader, setLoader] = useState(true);
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);
  const [queryid, setQueryId] = useState("");

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

  const getQueries = (str) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + props.token);

    var raw = JSON.stringify({
      query: str,
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      ApiURL + "/UserSearchQueries/" + NumberOfRecordsPerPage + "/" + record,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result["user_queries"]);
        setTableData(result["user_queries"]);
        setTotalRecords(result.total_records);
        setTotalPages(result.pages);
      })
      .then(() => {
        setLoader(false);
        setRefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const ExportCSVAll = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + props.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(ApiURL + "/UserDownloadQueries", requestOptions)
      .then((result) => {
        return result.blob();
      })
      .then((data) => {
        if (data.type === "text/csv") {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "Total queries";
          a.click();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const ExportCSV = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + props.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(ApiURL + "/UserDownloadQuery/" + queryid, requestOptions)
      .then((result) => {
        return result.blob();
      })
      .then((data) => {
        if (data.type === "text/csv") {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "Results";
          a.click();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getFancyStatus = (uglyStatus) => {
    if (uglyStatus === "scraper_done") {
      return "✅";
    } else if (uglyStatus === "ready to start") {
      return "✈️";
    }
  };

  // useEffect(() => {
  //   getQueries("");
  // }, [refresh,searchUsers]);

  // useEffect(() => {
  //   getQueries("");
  // }, [record]);

  const State = (props) => {
    if (props.pick === "in Progress") {
      return <p className="text-yellow-500">{props.pick}</p>;
    } else if (props.pick === "Not Active") {
      return <p className="text-red-500">{props.pick}</p>;
    } else if (props.pick === "Complete") {
      return <p className="text-green-500">{props.pick}</p>;
    }
  };

  return (
    <div className="flex flex-col w-full -mt-5">
      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <form
          className="flex"
          onSubmit={(e) => (e.preventDefault(), getQueries(searchUsers))}
        >
          <input
            className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
            type="search"
            value={searchUsers}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search Reviews"
          />
          <button
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill5)",
                    color: "var(--txtColor2)",
                    border: "1px solid gray",
                  }
                : {
                    backgroundColor: "var(--bg-fill6)",
                    border: "1px solid gray",
                  }
            }
            type="submit"
            className=" btn-hover3 px-4 rounded-r border-gray-400"
          >
            <GoSearch />
          </button>
        </form>
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
          onClick={ExportCSVAll}
        >
          Download All
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
                          ID.
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          Search String
                        </th>

                        <th className="pl-9 pr-12 md:px-8 text-center py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          STATUS
                        </th>
                        <th className="pl-12 pr-14 sm:px-10 md:pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          DATE
                        </th>
                        <th className="pl-12 pr-14 sm:px-10 md:pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-b-lg">
                      {tableData &&
                        tableData.map((item) => {
                          return (
                            <tr>
                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["query_id"]}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["name"]}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap text-center">
                                  {getFancyStatus(item["status"])}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item["date_created"].slice(0, 17)}
                                </p>
                              </td>

                              <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <button
                                  onClick={(e) => {
                                    setQueryId(item["query_id"]);
                                    ExportCSV();
                                  }}
                                  type="button"
                                  className="px-2 py-2 mx-2 rounded-full border text-emerald-500 hover:text-emerald-400 text-lg border-white hover:border-emerald-400"
                                >
                                  <AiOutlineDownload />
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

export default QueryHistory;
