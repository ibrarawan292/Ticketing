import React, { useEffect, useState, useRef } from "react";
import { Data } from "./PlansData";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import ApiURL from "../../../Config/Config";
import ScaleLoader from "react-spinners/ScaleLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PaginationButtons from "../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import Helmet from "react-helmet";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Multiselect from "multiselect-react-dropdown";

function ManageFamily(props) {
  const [Loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);

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
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState();
  const [tempData, setTempData] = useState("");

  const [TokenRefresh] = useState(true);

  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };

  //add members into family

  const [selectedValues, setSelectedValues] = useState([]);
  const familyCardRef = useRef(null);
  const masterCardRef = useRef(null);
  const familyCardRefEdit = useRef(null);
  const masterCardRefEdit = useRef(null);
  var arr = [];
  const [familyCard, setFamilyCard] = useState([]);
  const [masterCard, setMasterCard] = useState([]);
  const [familyName, setFamilyName] = useState("");
  const [familyNameEdit, setFamilyNameEdit] = useState("");
  const [familyCardEdit, setFamilyCardEdit] = useState([]);
  const [masterCardEdit, setMasterCardEdit] = useState([]);
  const [id, setID] = useState("");
  const [search, setSearch] = useState("");
  const getFamilyCards = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(ApiURL + `/GetCreditCard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 406) {
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            setFamilyCard(result.data);
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const getMasterCard = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(ApiURL + `/GetMembership`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 406) {
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            setMasterCard(result.data);
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getFamilyCards();
    getMasterCard();
  }, []);

  const getFamilies = () => {
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
        `/ListFamily/${NumberOfRecordsPerPage}/${
          (currentPage - 1) * NumberOfRecordsPerPage
        }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 406) {
          setLoader(false);
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            setLoader(false);
            setData(result.data);
            setTotalPages(result.pages);
            setTotalRecords(result.total_records);
            if (search === "") {
              setTempData(result);
            }
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
    getFamilies();
  }, [currentPage]);
  useEffect(() => {
    getFamilies();
  }, [search]);

  const addFamily = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var familyID = familyCardRef.current.getSelectedItems();
    var masterID = masterCardRef.current.getSelectedItems();

    var raw = JSON.stringify({
      name: familyName,
      master_id: masterID[0].cat,
      family_card: familyID[0].cat,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (
      familyName == "" ||
      masterID[0].cat == null ||
      masterID[0].cat == null
    ) {
      toast.error("Please fill the fields");
    } else {
      fetch(ApiURL + `/AddFamily`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 406) {
            setLoader(false);
          } else if (result.msg !== "Token has expired") {
            if (result.status === 200) {
              getFamilies();
              setShowModal(false);
              toast.success("Family added successfully");
              setFamilyName("");
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
  const editFamily = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var familyID = familyCardRefEdit.current.getSelectedItems();
    var masterID = masterCardRefEdit.current.getSelectedItems();

    var raw = JSON.stringify({
      name: familyNameEdit,
      master_id: masterID[0].cat,
      family_card: familyID[0].cat,
    });

    console.log(raw, "----------", id);
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (
      familyNameEdit == "" ||
      masterID[0].cat == null ||
      masterID[0].cat == null
    ) {
      toast.error("Please fill the fields");
    } else {
      fetch(ApiURL + `/EditFamily/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 406) {
            setLoader(false);
          } else if (result.msg !== "Token has expired") {
            if (result.status === 200) {
              getFamilies();
              setShowEditModal(false);
              toast.success("Family Edited successfully");
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
  const deleteFamily = (idDelete) => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log();
    fetch(ApiURL + `/DeleteFamily/${idDelete}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 406) {
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            toast.success("Family Deleted successfully");
            getFamilies();
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
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

    fetch(ApiURL + "/ExportFamily", requestOptions)
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
    var file1 = document.getElementById("familyfieldId");
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
      fetch(ApiURL + "/ImportFamily", requestOptions)
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
              getFamilies("");
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

    fetch(ApiURL + `/FamilySampleFile`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result, "hellllllo");
        const blob = new Blob([result], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `Family_sample_file.csv`
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
        getFamilies();

        document.getElementById("familyfieldId").value = "";
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
        <title>Ticket System | Admin | Manage Families</title>
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
                : getFamilies();
            }
          }}
        >
          <input
            className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === "") {
                setData(tempData.data);
                setTotalPages(tempData.pages);
                setTotalRecords(tempData.total_records);
              }
            }}
            placeholder="Search Family"
          />
          <button
            type="submit"
            style={{ background: "var(--bg-fill1)" }}
            className=" text-white btn-hover px-4 rounded-r border-gray-400"
          >
            <GoSearch />
          </button>
        </form>
        <button
          style={{ background: "var(--bg-fill1)" }}
          className="py-2 btn-hover px-10 mt-5 md:mt-0 w-full md:w-fit rounded-md text-white"
          onClick={() => setShowModal(true)}
        >
          Add Family
        </button>

        {/* ADD Familys MODAL  */}
        <>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
                <div className="relative w-auto my-6 mx-auto max-w-full">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Add Family</h3>
                      <button
                        className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <p className="text-gray-500 whitespace-no-wrap text-sm mb-1">
                        Family Name <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full rounded-md border p-3"
                        placeholder="Family Name"
                        value={familyName}
                        onChange={(e) => {
                          setFamilyName(e.target.value);
                        }}
                      />
                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Family Card <span className="text-red-900">*</span>
                      </p>
                      <Multiselect
                        displayValue="key"
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck() {}}
                        singleSelect
                        placeholder={"Select Family Card"}
                        ref={familyCardRef}
                        options={familyCard}
                        style={{ marginTop: "3px" }}
                      />
                      <p className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1">
                        Family Master <span className="text-red-900">*</span>
                      </p>
                      <Multiselect
                        displayValue="key"
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck() {}}
                        singleSelect
                        placeholder={"Select Family Master"}
                        ref={masterCardRef}
                        options={masterCard}
                      />
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
                        onClick={() => addFamily()}
                      >
                        Add Family
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>

        {/* import & export drpdwn */}
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
                          id="familyfieldId"
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
                {Loader || data === undefined ? (
                  <div className="bg-white p-10 flex justify-center">
                    <ScaleLoader
                      color={"var(--bg-fill5)"}
                      loading={Loader}
                      size={20}
                    />
                  </div>
                ) : (
                  <>
                    {data.length == 0 ? (
                      <>
                        <div className="text-center p-16">
                          <button
                            style={{ background: "var(--bg-fill1)" }}
                            className="btn-hover  py-2 mr-5 px-10 mt-5 mb-4 content-center	 md:mt-0 w-full md:w-fit rounded-md text-white"
                            // onClick={() => setSearch("")}
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
                              <th className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                NAME
                              </th>
                              <th className="pl-7 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                USERNAME
                              </th>

                              <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                HOLDER NAME
                              </th>

                              <th className="px-7 sm:px-6 md:pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                ACTIONS
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {data.map((item, index) => {
                              return (
                                <tr>
                                  <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.name}
                                    </p>
                                  </td>

                                  <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.username}
                                    </p>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {item.holder_name !== null
                                        ? item.holder_name
                                        : "N/A"}
                                    </p>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <button
                                      onClick={() => {
                                        setID(item.id);
                                        setFamilyCardEdit(
                                          familyCard.filter(
                                            (fl) => fl.key === item.holder_name
                                          )
                                        );
                                        setMasterCardEdit(
                                          masterCard.filter(
                                            (fl) => fl.key === item.username
                                          )
                                        );
                                        console.log(
                                          masterCard.filter(
                                            (fl) => fl.key === item.username
                                          ),
                                          "-----Hi there!!"
                                        );
                                        setFamilyNameEdit(item.name);
                                        setShowEditModal(true);
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
                                                    Edit Family
                                                  </h3>
                                                  <button
                                                    className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() =>
                                                      setShowEditModal(false)
                                                    }
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
                                                    Family Name{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <input
                                                    type="text"
                                                    className="w-full rounded-md border p-3"
                                                    placeholder="Family Name"
                                                    value={familyNameEdit}
                                                    onChange={(e) => {
                                                      setFamilyNameEdit(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    Family Card{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <Multiselect
                                                    displayValue="key"
                                                    onKeyPressFn={function noRefCheck() {}}
                                                    onRemove={function noRefCheck() {}}
                                                    onSearch={function noRefCheck() {}}
                                                    onSelect={function noRefCheck() {}}
                                                    singleSelect
                                                    placeholder={
                                                      "Select Family Card"
                                                    }
                                                    ref={familyCardRefEdit}
                                                    options={familyCard}
                                                    selectedValues={
                                                      familyCardEdit
                                                    }
                                                  />
                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    Family Master{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <Multiselect
                                                    displayValue="key"
                                                    onKeyPressFn={function noRefCheck() {}}
                                                    onRemove={function noRefCheck() {}}
                                                    onSearch={function noRefCheck() {}}
                                                    onSelect={function noRefCheck() {}}
                                                    singleSelect
                                                    placeholder={
                                                      "Select Master Card"
                                                    }
                                                    ref={masterCardRefEdit}
                                                    options={masterCard}
                                                    selectedValues={
                                                      masterCardEdit
                                                    }
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
                                                    onClick={() => editFamily()}
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
                                      onClick={() => {
                                        deleteFamily(item.id);
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

export default ManageFamily;
