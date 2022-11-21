import React, { useEffect, useState, useRef } from "react";
import { Data } from "./PlansData";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
// import EditableRow from "./EditableRow";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import ApiURL from "../../../Config/Config";
import ScaleLoader from "react-spinners/ScaleLoader";
import SetGetInput from "../../SetGetInput/SetGetInput";
import SetGetArea from "../../SetGetInput/SetGetArea";
// import PlanDesc from "../../PlanDesc/PlanDesc";
import PaginationButtons from "../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import Helmet from "react-helmet";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import Multiselect from "multiselect-react-dropdown";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";

function ManageClubs(props) {
  const [Loader, setLoader] = useState(false);
  const [record, setRecord] = useState(0);
  const [refresh, setRefresh] = useState(false);

  // Pagination
  const [totalRecords, setTotalRecords] = useState("");
  const [searchRecord, setSearchRecord] = useState(0);
  const [NumberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(2);
  const [totalSearchRecords, setTotalSearchRecords] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchGoto, setSearchGoto] = useState("");
  const [totalSearchPages, setTotalSearchPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchUsers, setSearchUser] = useState("");
  const [data, setData] = useState();
  const [tempData, setTempData] = useState("");

  const [TokenRefresh] = useState(true);

  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };

  const [id, setID] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clubdata, setClubData] = useState([]);
  const [clubName, setClubName] = useState("");
  const [clubNameEdit, setClubNameEdit] = useState("");

  const GetDataInEditModal = (id, item) => {
    console.log(id, item, "ietmmmm");
    setID(id);
    let filterSite = data?.filter((obj) => obj.id === id);
    // console.log(filterSite[0]);
    setClubNameEdit(filterSite[0].club_name);
  };

  //access token
  const token = localStorage.getItem("AccessToken");

  const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));

  //add members into family
  const [selectedValues, setSelectedValues] = useState([]);
  const multiselectRef = useRef(null);
  var arr = [];

  const Search = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const multiselectRef = useRef(null);
    var arr = [];

    const handleSaveAdmin = () => {
      var Addadmin = multiselectRef.current.getSelectedItems();
      Addadmin.map(
        (role) => {
          arr.push(role.cat);
        },

        setSelectedValues(arr)
      );
    };

    useEffect(() => {
      handleSaveAdmin();
    }, [arr]);
  };

  // getapi starts
  const getListClubsData = () => {
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
        `/ListClubs/${NumberOfRecordsPerPage}/${
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
    getListClubsData();
  }, [currentPage]);
  useEffect(() => {
    getListClubsData();
  }, [search]);
  //get api ends

  // add club api starts
  const addClubData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: clubName,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (clubName === "") {
      toast.error("please fill the field");
    } else {
      fetch(ApiURL + "/AddClub", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setShowModal(false);
            toast.success("club added succesfully");
            getListClubsData();
            setClubName("")
          }
          else if(result.status === 406)
          {
            toast.error(result.message);
            setClubName("")
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  //add club api ends

  //delete club data
  const deleteClub = (idDelete) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log();
    fetch(ApiURL + `/DeleteClub/${idDelete}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 406) {
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            toast.success("Club Deleted successfully");
            getListClubsData();
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //edit club data
  const editClub = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      club_name: clubNameEdit,
    });

    console.log(raw, "----------", id);
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + `/EditClub/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 406) {
          setLoader(false);
        } else if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            getListClubsData();
            setShowEditModal(false);
            toast.success("Club Edited successfully");
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="flex flex-col w-full -mt-5">
      <Helmet>
        <title>Ticket System | Admin | Manage Clubs</title>
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
                : getListClubsData();
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
            placeholder="Search Clubs"
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
          Add Club
        </button>

        {/* ADD Club MODAL  */}
        <>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
                <div className="relative w-auto my-6 mx-auto max-w-full">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Club Info</h3>
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
                        Club Name <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full rounded-md border p-3"
                        placeholder="Club Name"
                        value={clubName}
                        required
                        onChange={(e) => setClubName(e.target.value)}
                      />

                      {/* <input
                        type="text"
                        className="w-full rounded-md border p-3"
                        placeholder="Club Owner"
                      />

                      <input
                        type="number"
                        className="w-full rounded-md border p-3"
                        placeholder="Number of Members"
                      />

                      <Multiselect
                        displayValue="key"
                        onKeyPressFn={function noRefCheck() { }}
                        onRemove={function noRefCheck() { }}
                        onSearch={function noRefCheck() { }}
                        onSelect={function noRefCheck() { }}
                        singleSelect
                        placeholder={"Select Members"}
                        ref={multiselectRef}
                        options={[
                          {
                            cat: "1",
                            key: "Option 1",
                          },
                          {
                            cat: "2",
                            key: "Option 2",
                          },
                          {
                            cat: "3",
                            key: "Option 3",
                          },
                          {
                            cat: "4",
                            key: "Option 4",
                          },
                          {
                            cat: "5",
                            key: "Option 5",
                          },
                          {
                            cat: "6",
                            key: "Option 6",
                          },
                          {
                            cat: "7",
                            key: "Option 7",
                          },
                        ]}
                      />

                      <Multiselect
                        displayValue="key"
                        onKeyPressFn={function noRefCheck() { }}
                        onRemove={function noRefCheck() { }}
                        onSearch={function noRefCheck() { }}
                        onSelect={function noRefCheck() { }}
                        placeholder={"Select Organizers"}
                        ref={multiselectRef}
                        options={[
                          {
                            cat: "1",
                            key: "Option 1",
                          },
                          {
                            cat: "2",
                            key: "Option 2",
                          },
                          {
                            cat: "3",
                            key: "Option 3",
                          },
                          {
                            cat: "4",
                            key: "Option 4",
                          },
                          {
                            cat: "5",
                            key: "Option 5",
                          },
                          {
                            cat: "6",
                            key: "Option 6",
                          },
                          {
                            cat: "7",
                            key: "Option 7",
                          },
                        ]}
                      /> */}
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
                        onClick={() => {
                          addClubData();
                        }}
                      >
                        Add Club
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

      {/* MAIN TABLE  */}
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
                                Club NAME
                              </th>
                              {/* <th className="pl-7 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                            Place/Destination
                          </th>

                          <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                            Owner
                          </th> */}

                              <th className="px-7 sm:px-6 md:pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                ACTIONS
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {data?.map((item) => {
                              return (
                                <tr key={item.id}>
                                  <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.club_name}
                                    </p>
                                  </td>

                                  {/* <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  dsfsdfsfdsdf
                                </p>
                              </td>

                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                <p className="text-gray-600 whitespace-no-wrap">
                                  Active
                                </p>
                              </td> */}

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <button
                                      // onClick={(e) => {
                                      //   setQueryId(item["query_id"]);
                                      //   ExportCSV();
                                      // }}
                                      onClick={() => {
                                        setShowEditModal(true);
                                        setClubNameEdit(item.name);
                                        setID(item.id);
                                        GetDataInEditModal(item.id, item);
                                      }}
                                      type="button"
                                      className="px-2 py-2 mx-2 rounded-full border text-emerald-500 hover:text-emerald-400 text-lg border-white hover:border-emerald-400"
                                    >
                                      <AiOutlineEdit />
                                    </button>

                                    {/* Edit CLUB MODAL  */}
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
                                                    Edit Club Info
                                                  </h3>
                                                  <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() =>
                                                      setShowEditModal(false)
                                                    }
                                                  >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
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
                                                    Club Name{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <input
                                                    type="text"
                                                    className="w-full rounded-md border p-3"
                                                    placeholder="Club Name"
                                                    value={clubNameEdit}
                                                    onChange={(e) => {
                                                      setClubNameEdit(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />

                                                  {/* <input
                                                type="text"
                                                className="w-full rounded-md border p-3"
                                                placeholder="Club Owner"
                                              />

                                              <input
                                                type="number"
                                                className="w-full rounded-md border p-3"
                                                placeholder="Number of Members"
                                              /> */}
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
                                                    onClick={() =>
                                                      editClub(item.id)
                                                    }
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
                                        deleteClub(item.id);
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

export default ManageClubs;
