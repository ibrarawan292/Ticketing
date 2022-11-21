import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiURL from "../../../Config/Config";
import ScaleLoader from "react-spinners/ScaleLoader";
import PaginationButtons from "../../Pagination/PaginationButtons";
import Helmet from "react-helmet";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";
import Multiselect from "multiselect-react-dropdown";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import ReCAPTCHA from "react-google-recaptcha";
import TableOpen from "../../Cards/TableOpen";

function BuyTicket(props) {
  const membersRef = useRef(null);
  const [Loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);
  const [famList, setFamList] = useState([]);
  const [tikcetList, setTicketList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [totalRecords, setTotalRecords] = useState([]);
  const [NumberOfRecordsPerPage] = useState(5);
  // const [totalSearchRecords, setTotalSearchRecords] = useState("");
  // const [currentSearchPage, setCurrentSearchPage] = useState(1);
  // const [searchGoto, setSearchGoto] = useState("");
  // const [totalSearchPages, setTotalSearchPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState("");
  const [TokenRefresh] = useState(true);

  const data1 = [
    { member: "Qasim", bloc: "A", row: 1, seat: "132" },
    { member: "Mustafa", bloc: "A", row: 1, seat: "133" },
    { member: "Junaid", bloc: "A", row: 1, seat: "134" },
    { member: "Ibrar", bloc: "A", row: 1, seat: "135" },
  ];
  const data2 = [
    {
      ip: "192.168.1..",
      event: "Event 1",
      member: "Qasim",
      no: "132",
      status: "finding..",
    },
    {
      ip: "192.168.1..",
      event: "Event 1",
      member: "Mustafa",
      no: "132",
      status: "pending..",
    },
    {
      ip: "192.168.1..",
      event: "Event 1",
      member: "Junaid",
      no: "132",
      status: "pending..",
    },
    {
      ip: "192.168.1..",
      event: "Event 1",
      member: "Ibrar",
      no: "132",
      status: "finding..",
    },
  ];
  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };
  const getMembers = () => {
    setLoader(true);
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);
    let body = {
      query: search,
    };

    console.log(body, "search");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    fetch(
      ApiURL +
        `/ListMembers/${NumberOfRecordsPerPage}/${
          (currentPage - 1) * NumberOfRecordsPerPage
        }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "helo");
        if (result.status === 406) {
          setLoader(false);
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            setLoader(false);
            setData(result.data);
            setTotalPages(result.pages);
            if (search === "") {
              setTempData(result);
            }
            setTotalRecords(result.total_records);
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
          // handleCloseAddModal();
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getMembers();
  }, [search, currentPage]);
  const onChangeCaptcha = (value) => {
    console.log("Captcha value:", value);
  };
  return (
    <div className="flex flex-col w-full -mt-5">
      <Helmet>
        <title>Ticket System | Admin | Buy Ticket</title>
      </Helmet>
      <ToastContainer />
      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between"></div>
      <section className="w-full flex justify-center">
        <div className="container w-full mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="formTicketBuy">
              <h1 className="text-2xl mt-4 mb-6">Buy Ticket</h1>
              <p className="text-gray-700 whitespace-no-wrap text-base mt-3 mb-1">
                Select Member <span className="text-red-900">*</span>
              </p>
              <Multiselect
                displayValue="key"
                onKeyPressFn={function noRefCheck() {}}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={function noRefCheck() {}}
                singleSelect
                placeholder={"Select Member"}
                ref={membersRef}
                options={[
                  { cat: 1, key: "Qasim" },
                  { cat: 2, key: "Noor Mustafa" },
                  { cat: 3, key: "Junaid" },
                ]}
                style={{ marginTop: "3px" }}
              />
              <p className="text-gray-700 whitespace-no-wrap text-base mt-3 mb-1">
                Select Event <span className="text-red-900">*</span>
              </p>
              <Multiselect
                displayValue="key"
                onKeyPressFn={function noRefCheck() {}}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={function noRefCheck() {}}
                singleSelect
                placeholder={"Select Event"}
                ref={membersRef}
                options={[
                  { cat: 1, key: "Event 1" },
                  { cat: 2, key: "Event 2" },
                  { cat: 3, key: "Event 3" },
                ]}
                style={{ marginTop: "3px" }}
              />
              <div className="my-4 flex">
                <div className="checkboxClass mr-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="same"
                  />
                  <label className="ml-2 text-base text-gray-700">
                    Use Captcha
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="same"
                  />
                  <label className="ml-2 text-base text-gray-700">
                    Use Geosurf
                  </label>
                </div>
                {/* <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChangeCaptcha}
                /> */}
              </div>
              <button
                style={{ background: "var(--bg-fill1)" }}
                className="btn-hover text-white uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Submit
              </button>
            </div>
            <div className="formTicket">
              <h1 className="text-2xl mt-4 mb-6">Tickets Purchased</h1>
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="bg-gray-100 text-gray-800 py-4">
                      <th className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                        Member Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                        Bloc
                      </th>
                      <th className="pl-7 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                        Row
                      </th>

                      <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                        Seat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data1.map((item, index) => {
                      return (
                        <tr>
                          <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.member}
                            </p>
                          </td>
                          <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.bloc}
                            </p>
                          </td>

                          <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.row}
                            </p>
                          </td>
                          <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.seat}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mt-4">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100 text-gray-800 py-4">
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                    Event
                  </th>
                  <th className="pl-7 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                    Member
                  </th>

                  <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                    No
                  </th>
                  <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                    Buy
                  </th>
                </tr>
              </thead>
              <tbody>
                {data2.map((item, index) => {
                  return <TableOpen item={item} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuyTicket;
