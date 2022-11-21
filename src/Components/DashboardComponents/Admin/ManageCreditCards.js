import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Result } from "postcss";
import ScaleLoader from "react-spinners/ScaleLoader";
import PaginationButtons from "../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import Helmet from "react-helmet";
import ApiURL from "../../../Config/Config";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";

function ManageCreditCards(props) {
  const [record, setRecord] = useState(0);
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [Loader, setLoader] = useState(true);
  const [updateTable, setUpdateTable] = useState(true);

  // Pagination

  const [totalRecords, setTotalRecords] = useState([]);
  // const [searchRecord, setSearchRecord] = useState(0);
  const [NumberOfRecordsPerPage] = useState(2);
  // const [totalSearchRecords, setTotalSearchRecords] = useState("");
  // const [currentSearchPage, setCurrentSearchPage] = useState(1);
  // const [searchGoto, setSearchGoto] = useState("");
  // const [totalSearchPages, setTotalSearchPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState();

  const [searchRecord, setSearchRecord] = useState(0);
  const [totalSearchRecords, setTotalSearchRecords] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchGoto, setSearchGoto] = useState("");
  const [totalSearchPages, setTotalSearchPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  //token refresh
  const [TokenRefresh] = useState(true);

  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };

  const getTicketingData = () => {
    setLoader(true);
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    let body = {
      query: search,
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    fetch(
      ApiURL +
        `/ListCredit/${NumberOfRecordsPerPage}/${
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
            console.log(result.data);
            setTableData(result.data);
            setTotalPages(result.pages);
            setTotalRecords(result.total_records);
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //add credit card api

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  const addCreditCard = () => {
    setLoader(true);
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var raw = JSON.stringify({
      type: type,
      number: number,
      holder_name: name,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
      cvc_number: cvc,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (
      name == "" ||
      type == "" ||
      number == "" ||
      cvc == "" ||
      expiryMonth == "" ||
      expiryYear == ""
    ) {
      toast.error("Please fill the fields");
    } else if (expiryYear.length > 2 || expiryMonth.length > 2) {
      toast.error("Not a valid year or month ");
    } else if (expiryMonth < 0 || expiryMonth > 12) {
      toast.error("Not a valid month");
    } else if (number.length != 16) {
      toast.error("Card number limit must be 16");
    } else {
      fetch(ApiURL + `/AddCreditCard`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 406) {
            setLoader(false);
          } else if (result.msg !== "Token has expired") {
            if (result.status === 200) {
              setLoader(false);
              setShowModal(false);
              toast.success("Card added successfully");
              setType("");
              setName("");
              setNumber("");
              setCvc("");
              setExpiryMonth("");
              setExpiryYear("");
              getTicketingData();
            }
          } else if (result.msg === "Token has expired") {
            AdminRefreshToken(setTokenRefresh, TokenRefresh);
            setRefresh(!refresh);
            setLoader(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  //edit credit card

  const [editID, seteditID] = useState("");

  const [nameEdit, setNameEdit] = useState("");
  const [numberEdit, setNumberEdit] = useState("");
  const [typeEdit, setTypeEdit] = useState("");
  const [expiryMonthEdit, setExpiryMonthEdit] = useState("");
  const [expiryYearEdit, setExpiryYearEdit] = useState("");
  const [cvcEdit, setCvcEdit] = useState("");

  const getDataEditModal = (id) => {
    seteditID(id);
    let filterData = tableData?.filter((obj) => obj.id === id);
    setNameEdit(filterData[0]["holder_name"]);
    setTypeEdit(filterData[0]["type"]);
    setCvcEdit(filterData[0]["cvc_number"]);
    setExpiryMonthEdit(filterData[0]["expiry_month"]);
    setExpiryYearEdit(filterData[0]["expiry_year"]);
  };

  const editCreditCard = () => {
    setLoader(true);
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var raw = JSON.stringify({
      type: typeEdit,
      number: numberEdit,
      holder_name: nameEdit,
      expiry_month: expiryMonthEdit,
      expiry_year: expiryYearEdit,
      cvc_number: cvcEdit,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + `/EditCreditCard/${editID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 406) {
          setLoader(false);
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            setLoader(false);
            toast.success("Card edited successfully");
            getTicketingData();
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getTicketingData();
  }, [currentPage]);

  useEffect(() => {
    getTicketingData();
  }, [search]);

  //delete card

  const deleteCreditCard = (id) => {
    setLoader(true);
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + `/DeleteCreditCard/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 406) {
          setLoader(false);
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            setLoader(false);
            toast.success("Deleted successfully");
            getTicketingData();
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const checkCardtype = (e) => {
    if (e[0] == 4) {
      setType("Visa");
    } else if (e[0] == 5) {
      setType("Mastercard");
    } else if (e[0] == 7) {
      setType("American Express");
    } else if (e[0] == 6) {
      setType("Discover");
    } else {
      setType("Unknown");
    }
  };

   // export csv file
   const handleExport = () => {
    toast.success("Downloading processed");
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/ExportCards", requestOptions)
      .then((res) => {
        if (res.status === 500) {
          return res.json();
        } else {
          return res.blob();
        }
      })
      .then((data) => {
        if (data.type === "text/csv") {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "Results";
          a.click();
        } else if (data.msg === "Token has expired") {
          AdminRefreshToken({ TokenRefresh, setTokenRefresh });
          setTimeout(function () {
            handleExport();
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error("Can't be able to download file");
        console.log("error", error);
      });
  };

  // import csv file
  const [showInputModal, setShowInputModal] = useState(false);
  const handleImport = () => {
    var file1 = document.getElementById("creditcardfield");
    console.log(file1, "filesssssssssssss");
    if (file1.value !== "") {
      setLoader(true);
      const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

      var formdata = new FormData();
      formdata.append("file", file1.files[0]);

      if (file1.files[0] != undefined) {
        formdata.append("file", file1.files[0]);
        console.log("File found");
      } else {
        console.log("Not Found");
      }
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      console.log(ApiURL + "CreateUserQuery");
      fetch(ApiURL + "/ImportCards", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result, "check filess");
          console.log(result.status === 406);
          if (result.status === 406) {
            toast.error(result.message);
            setLoader(false);
          } else {
            if (result.msg !== "Token has expired") {
              setLoader(false);
              getTicketingData("");
              toast.success("File added Successfully");
            } else if (result.msg === "Token has expired") {
              AdminRefreshToken({ TokenRefresh, setTokenRefresh });

              setTimeout(function () {
                handleImport();
              }, 1000);
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoader(true);
          // setUploadLoader(false);
        });
    } else {
      toast.error("Please upload file!");
    }
  };

  const handleDownloadfile = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + `/CardSampleFile`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result, "hellllllo");
        const blob = new Blob([result], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `Credit_card_sample_file.csv`
        );
        a.click();
        setLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoader(false);
      });
  };
  // FILE VALIDATION
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const handleChange = (e) => {
    console.log(e.target.files, "eeeeee Qasim");
    setLoader(true);
    var files = e.target.files;
    console.log(files);
    var filesArray = [].slice.call(files);
    if (e.target.files[0].type === "text/csv") {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          var check = Object.values(results.data)[0];
          var check1 = Object.keys(check);
          console.log(results, "Hello I am here!!");
        },
      });
    } else if (
      e.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      e.target.files[0].type === "application/vnd.ms-excel"
    ) {
      readXlsxFile(e.target.files[0]).then((rows) => {
        var check = Object.values(rows)[0];
        console.log(check);
      });
    }

    filesArray.forEach((e) => {
      setFileName(e.name);
      if (
        e.type != "text/csv" &&
        e.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        e.type !== "application/vnd.ms-excel"
      ) {
        toast.error("This file type is not allowed please upload file again", {
          duration: 2000,
        });
        setLoader(true);
        setShowInputModal(false);
        getTicketingData();

        document.getElementById("creditcardfield").value = "";
        setFileName("");
        setFileType("");
      }
    });
  };
  
  const handleSelect = (e) => {
    if (e.target.value === "Import") {
      setShowInputModal(true);
    } else if (e.target.value === "export") {
      handleExport();
    } else if (e.target.value === "samplefile") {
      handleDownloadfile();
    }
  };
  return (
    <div className="flex flex-col w-full -mt-5">
      <Helmet>
        <title>Ticket System | Admin | Manage Credit-Cards</title>
      </Helmet>
      <ToastContainer />

      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            {
              search.length <= 0
                ? toast.error("Search form is empty")
                : getTicketingData();
            }
          }}
        >
          <input
            className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Credit Cards"
          />
          <button
            type="submit"
            style={{ background: "var(--bg-fill1)" }}
            className="btn-hover text-white px-4 rounded-r border-gray-400"
          >
            <GoSearch />
          </button>
        </form>
        <span className="">
          <button
            style={{ background: "var(--bg-fill1)" }}
            className="btn-hover py-2 mr-5 px-10 mt-5 md:mt-0 w-full md:w-fit rounded-md text-white"
            onClick={() => setShowModal(true)}
          >
            Add Card
          </button>

          {/* ADD CARD MODAL  */}
          <>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
                  <div className="relative w-auto my-6 mx-auto max-w-full">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[530px] bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Card Info</h3>
                        <button
                          className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <p
                          className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                          style={{
                            textAlign: "start",
                          }}
                        >
                          Card Holder Name{" "}
                          <span className="text-red-900">*</span>
                        </p>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full rounded-md border p-3"
                          placeholder="Card Holder Name"
                        />
                        <p
                          className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                          style={{
                            textAlign: "start",
                          }}
                        >
                          Card Number <span className="text-red-900">*</span>
                        </p>
                        <input
                          type="text"
                          value={number}
                          onChange={(e) => {
                            checkCardtype(e.target.value);
                            setNumber(e.target.value);
                          }}
                          required
                          maxLength="16"
                          className="w-full rounded-md border p-3"
                          placeholder="Card Number"
                        />
                        <div className="flex">
                          <div className="w-50">
                            <p
                              className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                              style={{
                                textAlign: "start",
                              }}
                            >
                              Card Type <span className="text-red-900">*</span>
                            </p>
                            <input
                              type="text"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                              required
                              disabled
                              className="w-50 rounded-md border p-3"
                              placeholder="Card Type"
                            />
                          </div>
                          <div className="w-50">
                            <p
                              className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start ml-4"
                              style={{
                                textAlign: "start",
                              }}
                            >
                              CVC <span className="text-red-900">*</span>
                            </p>
                            <input
                              type="text"
                              value={cvc}
                              onChange={(e) => setCvc(e.target.value)}
                              required
                              maxLength="3"
                              className="w-50 rounded-md border ml-4 p-3"
                              placeholder="CVC"
                            />
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-50">
                            <p
                              className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                              style={{
                                textAlign: "start",
                              }}
                            >
                              Expiry Month{" "}
                              <span className="text-red-900">*</span>
                            </p>
                            <input
                              type="text"
                              value={expiryMonth}
                              maxLength="2"
                              onChange={(e) => setExpiryMonth(e.target.value)}
                              required
                              className="w-75 rounded-md border p-3  "
                              placeholder="Expiry Month"
                            />
                          </div>
                          <div className="w-50">
                            <p
                              className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start ml-4"
                              style={{
                                textAlign: "start",
                              }}
                            >
                              Expiry Year{" "}
                              <span className="text-red-900">*</span>
                            </p>
                            <input
                              type="text"
                              value={expiryYear}
                              maxLength={"2"}
                              onChange={(e) => setExpiryYear(e.target.value)}
                              required
                              className="w-75 rounded-md border ml-4  p-3"
                              placeholder="Expiry Year"
                            />
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          style={{ background: "black" }}
                          className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          style={{ background: "var(--bg-fill1)" }}
                          className="btn-hover text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            addCreditCard();
                          }}
                        >
                          Add Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </>
        </span>
        
        {/* input & export drpdwn */}
        <div>
          <select
            onChange={handleSelect}
            defaultValue={"options"}
            style={{
              padding: "5px",
              border: "2px solid rgb(117 4 30)",
              borderRadius: "8px",
            }}
          >
            <option value="options" >Import/Export</option>
            <option value="Import">Import</option>
            <option value="export">Export</option>
            <option value="samplefile" >Sample File</option>
          </select>

          {/* <button
            style={{ background: "var(--bg-fill1)" }}
            className="py-2 px-5 btn-hover mt-5 md:mt-0 mr-4 w-full md:w-fit rounded-md text-white"
            onClick={handleExport}
          >
            Export
          </button>
          <button
            style={{ background: "var(--bg-fill1)" }}
            className="py-2 px-5 btn-hover  mt-5 md:mt-0 w-full md:w-fit rounded-md text-white"
            onClick={() => {
              setShowInputModal(true);
            }}
          >
            Import
          </button> */}
          <>
            {showInputModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
                  <div className="relative w-auto  mx-auto max-w-full">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Select File</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowInputModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto ">
                        <p
                          className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1 text-start"
                          style={{
                            textAlign: "start",
                          }}
                        >
                          Select csv File{" "}
                          <span className="text-red-900">*</span>
                        </p>
                        <input
                          type="file"
                          id="creditcardfield"
                          className="w-full rounded-md border p-3"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          style={{
                            background: "black",
                          }}
                          className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowInputModal(false)}
                        >
                          Close
                        </button>
                        <button
                          style={{
                            background: "var(--bg-fill1)",
                          }}
                          className="btn-hover text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowInputModal(false);
                            handleImport();
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </>
        </div>
      </div>

      <section className="w-full flex justify-center">
        <div className="container w-full mx-auto px-4 sm:px-8">
          <div className="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                {Loader ? (
                  <div className="bg-white p-10 flex justify-center">
                    <ScaleLoader
                      color={"var(--bg-fill5)"}
                      loading={Loader}
                      size={20}
                    />
                  </div>
                ) : (
                  <>
                    {tableData.length == 0 ? (
                      <>
                        <div className="text-center p-16">
                          <button
                            style={{ background: "var(--bg-fill1)" }}
                            className="btn-hover  py-2 mr-5 px-10 mt-5 mb-4 content-center	 md:mt-0 w-full md:w-fit rounded-md text-white"
                            onClick={() => setSearch("")}
                          >
                            No data Found
                          </button>
                        </div>
                      </>
                    ) : (
                      <form>
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr className="bg-gray-100 text-gray-800 py-4">
                              <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                                HOLDER NAME
                              </th>

                              <th className=" pl-9 pr-12 md:px-8 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                                TYPE
                              </th>

                              <th className="pl-9 pr-12 md:px-8 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                            CARD NUMBER
                          </th>

                              <th className="pl-9 pr-12 md:px-8 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          CVC
                        </th>
                              <th className="pl-9 pr-12 md:px-8 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                                EXPIRY MONTH
                              </th>
                              <th className="pl-9 pr-12 md:px-8 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                                EXPIRY YEAR
                              </th>
                              <th className="pl-9 pr-12 md:px-8 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                                ACTIONS
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <>
                              {tableData.map((obj) => {
                                return (
                                  <tr>
                                    <td className="pl-3 sm:px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                      <p className="px-12 sm:px-0"></p>

                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {obj.holder_name}
                                      </p>
                                    </td>
                                    <td className="pl-3 sm:px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                      <p className="px-12 sm:px-0"></p>

                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {obj.type}
                                      </p>
                                    </td>
                                    <td className="pl-3 sm:px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                  <p className="px-12 sm:px-0"></p>
  
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {obj.number}
                                  </p>
                                </td>
                                    <td className="pl-3 sm:px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="px-12 sm:px-0"></p>
  
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {obj.cvc_number}
                                </p>
                              </td>
                                    <td className="pl-3 sm:px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                      <p className="px-12 sm:px-0"></p>

                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {obj.expiry_month}
                                      </p>
                                    </td>
                                    <td className="pl-3 sm:px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                      <p className="px-12 sm:px-0"></p>

                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {obj.expiry_year}
                                      </p>
                                    </td>
                                    <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <button
                                        // onClick={(e) => {
                                        //   setQueryId(item["query_id"]);
                                        //   ExportCSV();
                                        // }}
                                        onClick={() => {
                                          setShowEditModal(true);
                                          getDataEditModal(obj.id);
                                        }}
                                        type="button"
                                        className="px-2 py-2 mx-2 rounded-full border text-emerald-500 hover:text-emerald-400 text-lg border-white hover:border-emerald-400"
                                      >
                                        <AiOutlineEdit />
                                      </button>

                                      {/* Edit CARD MODAL  */}
                                      <>
                                        {showEditModal ? (
                                          <>
                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
                                              <div className="relative w-auto my-6 mx-auto max-w-full">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                                                  {/*header*/}
                                                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">
                                                      Edit Card Info
                                                    </h3>
                                                    <button
                                                      className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowEditModal(false);
                                                      }}
                                                    >
                                                      <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                      </span>
                                                    </button>
                                                  </div>
                                                  {/*body*/}
                                                  <div className="relative p-6 flex-auto">
                                                    <p
                                                      className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                                                      style={{
                                                        textAlign: "start",
                                                      }}
                                                    >
                                                      Card Holder Name{" "}
                                                      <span className="text-red-900">
                                                        *
                                                      </span>
                                                    </p>
                                                    <input
                                                      type="text"
                                                      value={nameEdit}
                                                      onChange={(e) =>
                                                        setNameEdit(
                                                          e.target.value
                                                        )
                                                      }
                                                      className="w-full rounded-md border p-3"
                                                      placeholder="Card Holder Name"
                                                    />
                                                    <div className="flex">
                                                      <div className="w-50">
                                                        <p
                                                          className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                                                          style={{
                                                            textAlign: "start",
                                                          }}
                                                        >
                                                          Card Type{" "}
                                                          <span className="text-red-900">
                                                            *
                                                          </span>
                                                        </p>
                                                        <input
                                                          type="text"
                                                          value={typeEdit}
                                                          onChange={(e) =>
                                                            setTypeEdit(
                                                              e.target.value
                                                            )
                                                          }
                                                          className="w-75 rounded-md border p-3"
                                                          placeholder="Card Type"
                                                        />
                                                      </div>
                                                      <div className="w-50">
                                                        <p
                                                          className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start ml-12"
                                                          style={{
                                                            textAlign: "start",
                                                          }}
                                                        >
                                                          Number{" "}
                                                          <span className="text-red-900">
                                                            *
                                                          </span>
                                                        </p>
                                                        <input
                                                          type="number"
                                                          value={cvcEdit}
                                                          onChange={(e) =>
                                                            setCvcEdit(
                                                              e.target.value
                                                            )
                                                          }
                                                          className="w-75 rounded-md ml-12 border p-3"
                                                          placeholder="CVC"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="flex">
                                                      <div className="w-50">
                                                        <p
                                                          className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                                                          style={{
                                                            textAlign: "start",
                                                          }}
                                                        >
                                                          Expiry Month{" "}
                                                          <span className="text-red-900">
                                                            *
                                                          </span>
                                                        </p>
                                                        <input
                                                          type="number"
                                                          value={
                                                            expiryMonthEdit
                                                          }
                                                          onChange={(e) =>
                                                            setExpiryMonthEdit(
                                                              e.target.value
                                                            )
                                                          }
                                                          className="w-75 rounded-md border p-3  "
                                                          placeholder="Expiry Month"
                                                        />
                                                      </div>
                                                      <div className="w-50">
                                                        <p
                                                          className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start ml-12"
                                                          style={{
                                                            textAlign: "start",
                                                          }}
                                                        >
                                                          Expiry Year{" "}
                                                          <span className="text-red-900">
                                                            *
                                                          </span>
                                                        </p>
                                                        <input
                                                          type="number"
                                                          value={expiryYearEdit}
                                                          onChange={(e) =>
                                                            setExpiryYearEdit(
                                                              e.target.value
                                                            )
                                                          }
                                                          className="w-75 rounded-md border ml-12  p-3"
                                                          placeholder="Expiry Year"
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>

                                                  {/*footer*/}
                                                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                      style={{
                                                        background: "black",
                                                      }}
                                                      className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                      type="button"
                                                      onClick={() =>
                                                        setShowEditModal(false)
                                                      }
                                                    >
                                                      Close
                                                    </button>
                                                    <button
                                                      style={{
                                                        background:
                                                          "var(--bg-fill1)",
                                                      }}
                                                      className="btn-hover text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                      type="button"
                                                      onClick={() => {
                                                        editCreditCard();
                                                        setShowEditModal(false);
                                                      }}
                                                    >
                                                      Save Changes
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                          </>
                                        ) : null}
                                      </>

                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          deleteCreditCard(obj.id);
                                        }}
                                        type="button"
                                        className="px-2 py-2 mx-2 rounded-full border text-red-500 hover:text-red-400 text-lg border-white hover:border-emerald-400"
                                      >
                                        <AiOutlineDelete />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          </tbody>
                        </table>
                      </form>
                    )}
                  </>
                )}
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

export default ManageCreditCards;
