import React, { useEffect, useRef, useState } from "react";
import { Data } from "./PlansData";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
// import EditableRow from "./EditableRow";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
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
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";
import Multiselect from "multiselect-react-dropdown";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";

function ManageMembers(props) {
  const [Loader, setLoader] = useState(false);
  const [planName, setPlanName] = useState("");
  const [qAvailable, setQavailable] = useState("");
  const [sDays, setSdays] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [statusP, setStatusP] = useState("");
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);

  // for Edit
  const [planNameEdit, setPlanNameEdit] = useState("");
  const [qAvailableEdit, setQavailableEdit] = useState("");
  const [sDaysEdit, setSdaysEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");
  const [statusPEdit, setStatusPEdit] = useState("");
  const [Editstatus, setEditStatus] = useState(true);
  const [Viewstatus, setViewStatus] = useState(false);

  // for add Members
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  // const [familyId, setFamilyId] = useState("");
  const [password, setPassword] = useState("");
  // const [tkSource, setTkSource] = useState("");
  // const [cardId, setCardId] = useState("");
  // const [clubId, setClubId] = useState("");
  const [famList, setFamList] = useState([]);
  const [tikcetList, setTicketList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [show, setShow] = useState(false);
  const [isRadio, setIsRadio] = useState();

  // Pagination
  const [totalRecords, setTotalRecords] = useState([]);
  // const [searchRecord, setSearchRecord] = useState(0);
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

  const [AddPlan, setAddPlan] = useState(false);
  //  //access token
  //  const token = localStorage.getItem("AccessToken");

  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };

  // get family option api starts
  const getFamilyList = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/GetFamily", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data, "tksource");
        setFamList(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getFamilyList();
  }, []);

  // get family option api ends

  // get tikcet option api starts
  const getTicketList = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/GetTicketing", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data, "tksource");
        setTicketList(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getTicketList();
  }, []);

  // get tikcet option api ends

  //get card options api starts
  const getCardList = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/GetCreditCard", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data, "tksource--------------------------");
        setCardList(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getCardList();
  }, []);

  //get card options api ends

  //get club options api starts
  const getClubList = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/GetClub", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data, "tksource");
        setClubList(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getClubList();
  }, []);
  // get Members list data
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

  // get Members list data end

  // save members api starts
  const ticketingRef = useRef(null);
  const familyRef = useRef(null);
  const cardRef = useRef(null);
  const clubRef = useRef(null);
  const [value, setValue] = useState("create");
  const [familyName, setFamilyName] = useState("");
  const handleSaveMember = () => {
    var arr = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var AddTicket = ticketingRef.current.getSelectedItems();
    AddTicket.map((role) => {
      // console.log(role.cat, "helolllllll");
      arr.push(role.cat);
    });

    var addfamily;
    if (value === "select") {
      addfamily = familyRef.current.getSelectedItems();
      addfamily.map((role) => {
        // console.log(role.cat, "helolllllll");
        arr1.push(role.cat);
      });
    }

    var addcard = cardRef.current.getSelectedItems();
    addcard.map((role) => {
      // console.log(role.cat, "helolllllll");
      arr2.push(role.cat);
    });
    var addclub = clubRef.current.getSelectedItems();
    addclub.map((role) => {
      // console.log(role.cat, "helolllllll");
      arr3.push(role.cat);
    });

    // console.log(arr, arr1, arr2,arr3)
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var raw;
    value === "select"
      ? (raw = JSON.stringify({
          first_name: name,
          last_name: lastName,
          username: userName,
          family_name: null,
          family_id: arr1,
          password: password,
          ticketing_source: arr,
          club_id: arr3,
          card_id: arr2,
        }))
      : (raw = JSON.stringify({
          first_name: name,
          last_name: lastName,
          username: userName,
          family_name: familyName,
          family_id: null,
          password: password,
          ticketing_source: arr,
          club_id: arr3,
          card_id: arr2,
        }));

    console.log(raw, "------Flag here");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/AddMembers", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            getMembers();
            setLoader(false);
            toast.success("members Created Successfully!");
            setName("");
            setLastName("");
            setUserName("");

            // handleCloseAddModal();
          } else if (result.status === 406) {
            toast(result.message);
            setLoader(false);
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setLoader(false);
          toast.error("Oops! An Error Occurred!");
        }
      })
      .catch((error) => console.log("error", error));
  };
  // save members api ends

  // Delete memers api starts
  const handleDeleteMember = (id) => {
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

    fetch(ApiURL + "/DeleteMembers/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(id);
        if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            getMembers();
            toast.success("memeber Deleted Successfully");
            setLoader(false);
            setRefresh(!refresh);
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setLoader(false);
        } else toast.error("Oops! An Error Occurred!!");
      })
      .catch((error) => {
        console.log("error", error);
        setLoader(false);
        toast.error("Oops! An Error Occurred!!");
      });
  };

  // Delete memers api ends

  const [editId, setEditId] = useState("");
  const [memberNameEdit, setMemberNameEdit] = useState("");
  const [memberLastNameEdit, setMemberLastNameEdit] = useState("");
  const [userNameEdit, setUserNameEdit] = useState("");
  const [tkSourceEdit, setTkSourceEdit] = useState([]);
  const [memFamilyNameEdit, setMemFamilyNameEidt] = useState([]);
  const [memberCardEdit, setMemberCardEdit] = useState([]);
  const [memberClubEdit, setMemberClubEdit] = useState([]);
  //get data in edit Modal
  const GetDataInEditModal = (id, item) => {
    console.log(item.club_name, "holdernameeeee");
    setEditId(id);
    let filterSite = data?.filter((obj) => obj.id === id);
    console.log(filterSite[0]);
    setMemberNameEdit(filterSite[0].first_name);
    setMemberLastNameEdit(filterSite[0].last_name);
    setUserNameEdit(filterSite[0].username);
    setTkSourceEdit(
      tikcetList.filter((tl) => tl.key === item.ticketing_source)
    );
    setMemFamilyNameEidt(famList.filter((fl) => fl.key === item.family_name));
    setMemberCardEdit(cardList.filter((cdl) => cdl.key === item.holder_name));
    setMemberClubEdit(clubList.filter((cl) => cl.key === item.club_name));
    // console.log(memberClubEdit, "clubssssss");
  };

  //edit members api starts
  const familyNameRefEdit = useRef(null);
  const ticketRefEdit = useRef(null);
  const cardHolderRefEdit = useRef(null);
  const clubHolderRefEdit = useRef(null);
  const handleEditAdmin = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Authorization", "Bearer " + AdminAuth["access_token"]);
    myHeaders.append("Content-Type", "application/json");

    var familyId = familyNameRefEdit.current.getSelectedItems();
    var tkSource = ticketRefEdit.current.getSelectedItems();
    var clubId = clubHolderRefEdit.current.getSelectedItems();
    var cardId = cardHolderRefEdit.current.getSelectedItems();

    console.log(tkSource, "sourceeeeeeeee");
    var raw = JSON.stringify({
      first_name: memberNameEdit,
      last_name: memberLastNameEdit,
      // username: userNameEdit,
      family_id: familyId[0].cat,
      // password: password,
      ticketing_source: tkSource[0].cat,
      club_id: clubId[0].cat,
      card_id: cardId[0].cat,
    });

    console.log(raw);
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/EditMembers/" + editId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.msg !== "Token has expired") {
          if (result.status === 200) {
            setLoader(false);
            toast.success("Admin Edited Successfully!");
            getMembers();
            // handleCloseEditModal();
          }
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          toast.error("Oops! An Error Occurred!");
          // handleCloseEditModal();
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Oops! An Error Occurred!");
        setLoader(false);
      });
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

    fetch(ApiURL + "/ExportMembers", requestOptions)
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
    var file1 = document.getElementById("membersfileId");
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
      fetch(ApiURL + "/ImportMembers", requestOptions)
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
              getMembers("");
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

    fetch(ApiURL + `/MemberSampleFile`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result, "hellllllo");
        const blob = new Blob([result], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `Member_sample_file.csv`
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
        getMembers();

        document.getElementById("membersfileId").value = "";
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
        <title>Ticket System | Admin | Manage Members</title>
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
                : getMembers();
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
            placeholder="Search Members"
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
          Add Member
        </button>

        {/* ADD Members MODAL  */}
        <>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
                <div className="relative w-auto mt-96 mx-auto max-w-full">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Member Info</h3>
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
                    <div className="relative p-6 flex-auto ">
                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        First Name <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full rounded-md border p-3"
                        placeholder="First Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Last Name <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full rounded-md border p-3"
                        placeholder="last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />

                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        User Name <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full rounded-md border p-3"
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />

                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Enter Password <span className="text-red-900">*</span>
                      </p>
                      <input
                        style={{
                          border: "1px solid gray",
                          padding: "5px 10px",
                        }}
                        className="w-full rounded-md border p-3"
                        type="password"
                        placeholder="Admin's Account Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Select Ticket <span className="text-red-900">*</span>
                      </p>
                      <Multiselect
                        closeIcon={"cancel"}
                        displayValue="key"
                        placeholder="Ticketing Source"
                        ref={ticketingRef}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={() => function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        selectionLimit={1}
                        onSelect={() => {
                          function noRefCheck() {}
                        }}
                        options={tikcetList}
                      />

                      {/* // radio button */}
                      <div className="flex">
                        <label className=" ">
                          <input
                            style={{
                              border: "1px solid gray",
                            }}
                            className="mt-5 rounded-md border p-3"
                            type="radio"
                            name="radio"
                            value="create"
                            checked={value === "create"}
                            onChange={(e) => setValue(e.currentTarget.value)}
                          />
                          <span className="p-3">Create your own Family</span>
                          <input
                            style={{
                              border: "1px solid gray",
                            }}
                            className="mt-5 rounded-md border p-3"
                            type="radio"
                            value="select"
                            name="radio"
                            checked={value === "select"}
                            onChange={(e) => setValue(e.currentTarget.value)}
                          />
                          <span className="p-3">select from Family</span>
                        </label>
                      </div>

                      {value === "select" && (
                        <>
                          <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                            Select Family Name{" "}
                            <span className="text-red-900">*</span>
                          </p>
                          <Multiselect
                            style={{ margin: "0px" }}
                            closeIcon={"cancel"}
                            displayValue="key"
                            placeholder="Family Name"
                            ref={familyRef}
                            onKeyPressFn={function noRefCheck() {}}
                            onRemove={() => function noRefCheck() {}}
                            onSearch={function noRefCheck() {}}
                            selectionLimit={1}
                            onSelect={() => {
                              function noRefCheck() {}
                            }}
                            options={famList}
                            // showCheckbox={true}
                          />
                        </>
                      )}

                      {value === "create" && (
                        <>
                          <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                            Create Family{" "}
                            <span className="text-red-900">*</span>
                          </p>
                          <input
                            type="text"
                            className="w-full rounded-md border p-3"
                            placeholder="Define Your family"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                          />
                        </>
                      )}
                      {/* <>
                        {show ? (
                          <>
                            {" "}
                            <input
                              type="text"
                              className="w-full rounded-md border p-3"
                              placeholder="Create Your own family"
                              // value={userName}
                              // onChange={(e) => setUserName(e.target.value)}
                            />
                          </>
                        ) : (
                          <p>
                            {" "}
                            <Multiselect
                              style={{ margin: "0px" }}
                              closeIcon={"cancel"}
                              displayValue="key"
                              placeholder="Family Name"
                              ref={familyRef}
                              onKeyPressFn={function noRefCheck() {}}
                              onRemove={() => function noRefCheck() {}}
                              onSearch={function noRefCheck() {}}
                              selectionLimit={1}
                              onSelect={() => {
                                function noRefCheck() {}
                              }}
                              options={famList}
                              // showCheckbox={true}
                            />
                          </p>
                        )}
                      </> */}

                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Select Card Holder Name
                        <span className="text-red-900">*</span>
                      </p>
                      <Multiselect
                        closeIcon={"cancel"}
                        displayValue="key"
                        placeholder="card Name"
                        ref={cardRef}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={() => function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        selectionLimit={1}
                        onSelect={() => {
                          function noRefCheck() {}
                        }}
                        options={cardList}
                      />

                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Select Club Name <span className="text-red-900">*</span>
                      </p>
                      <Multiselect
                        closeIcon={"cancel"}
                        displayValue="key"
                        placeholder="club Name"
                        ref={clubRef}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={() => function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        selectionLimit={1}
                        onSelect={() => {
                          function noRefCheck() {}
                        }}
                        options={clubList}
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
                        onClick={() => {
                          handleSaveMember();
                          setShowModal(false);
                        }}
                      >
                        Add Member
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
                          id="membersfileId"
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
                    {data.length == 0 ? (
                      <>
                        <div className="text-center p-16">
                          <button
                            style={{ background: "var(--bg-fill1)" }}
                            className="btn-hover py-2  px-10  content-center	 md:my-6 w-full md:w-fit rounded-md text-white"
                            // onClick={() => setSearch("")}
                          >
                            No data found
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
                                Family Name
                              </th>

                              <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                Ticketing Resource
                              </th>

                              <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                Club Name
                              </th>

                              <th className="pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                Card Holder Name
                              </th>

                              <th className="px-7 sm:px-6 md:pl-6 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                                ACTIONS
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {data?.map((item) => {
                              console.log(item, "members");
                              return (
                                <tr key={item.id}>
                                  <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.first_name}
                                    </p>
                                  </td>

                                  <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.username}
                                    </p>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {item.family_name === null
                                        ? "N/A"
                                        : item.family_name}
                                    </p>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {item.ticketing_source === null
                                        ? "N/A"
                                        : item.ticketing_source}
                                    </p>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {item.club_name === null
                                        ? "N/A"
                                        : item.club_name}
                                    </p>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {item.holder_name === null
                                        ? "N/A"
                                        : item.holder_name}
                                    </p>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <button
                                      // onClick={(e) => {
                                      //   setQueryId(item["query_id"]);
                                      //   ExportCSV();
                                      // }}
                                      onClick={() => {
                                        setShowEditModal(true);
                                        console.log(item.id, "ibrar");
                                        GetDataInEditModal(item.id, item);
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
                                            <div className="relative w-auto mt-44 mx-auto max-w-full">
                                              {/*content*/}
                                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                  <h3 className="text-3xl font-semibold">
                                                    Edit Member Info
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
                                                <div className="relative p-6 flex-auto ">
                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1 text-start"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    First Name{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <input
                                                    type="text"
                                                    className="w-full rounded-md border p-3"
                                                    placeholder="First Name"
                                                    value={memberNameEdit}
                                                    onChange={(e) =>
                                                      setMemberNameEdit(
                                                        e.target.value
                                                      )
                                                    }
                                                  />

                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1 text-start"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    Last Name{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <input
                                                    type="text"
                                                    className="w-full rounded-md border p-3"
                                                    placeholder="last Name"
                                                    value={memberLastNameEdit}
                                                    onChange={(e) =>
                                                      setMemberLastNameEdit(
                                                        e.target.value
                                                      )
                                                    }
                                                  />

                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    User Name{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <input
                                                    type="text"
                                                    className="w-full rounded-md border p-3"
                                                    placeholder="User Name"
                                                    disabled
                                                    value={userNameEdit}
                                                    onChange={(e) =>
                                                      setUserNameEdit(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  {/* <input
                                                style={{
                                                  border: "1px solid gray",
                                                  padding: "5px 10px",
                                                }}
                                                className="w-full rounded-md border p-3"
                                                type="password"
                                                placeholder="Admin's Account Password"
                                                onChange={(e) =>
                                                  setPassword(e.target.value)
                                                }
                                                required
                                              /> */}

                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    Select Ticket{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <Multiselect
                                                    closeIcon={"cancel"}
                                                    displayValue="key"
                                                    placeholder="Ticketing Source"
                                                    onKeyPressFn={function noRefCheck() {}}
                                                    onRemove={() =>
                                                      function noRefCheck() {}
                                                    }
                                                    onSearch={function noRefCheck() {}}
                                                    selectionLimit={1}
                                                    onSelect={() => {
                                                      function noRefCheck() {}
                                                    }}
                                                    ref={ticketRefEdit}
                                                    options={tikcetList}
                                                    selectedValues={
                                                      tkSourceEdit
                                                    }
                                                  />

                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    Select Family Name{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <Multiselect
                                                    closeIcon={"cancel"}
                                                    displayValue="key"
                                                    placeholder="Family Name"
                                                    ref={familyNameRefEdit}
                                                    onKeyPressFn={function noRefCheck() {}}
                                                    onRemove={() =>
                                                      function noRefCheck() {}
                                                    }
                                                    onSearch={function noRefCheck() {}}
                                                    selectionLimit={1}
                                                    onSelect={() => {
                                                      function noRefCheck() {}
                                                    }}
                                                    options={famList}
                                                    selectedValues={
                                                      memFamilyNameEdit
                                                    }
                                                  />

                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    Select Card Holder Name
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <Multiselect
                                                    closeIcon={"cancel"}
                                                    displayValue="key"
                                                    placeholder="card holder Name"
                                                    ref={cardHolderRefEdit}
                                                    onKeyPressFn={function noRefCheck() {}}
                                                    onRemove={() =>
                                                      function noRefCheck() {}
                                                    }
                                                    onSearch={function noRefCheck() {}}
                                                    selectionLimit={1}
                                                    onSelect={() => {
                                                      function noRefCheck() {}
                                                    }}
                                                    options={cardList}
                                                    selectedValues={
                                                      memberCardEdit
                                                    }
                                                  />

                                                  <p
                                                    className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1"
                                                    style={{
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    Select Club Name{" "}
                                                    <span className="text-red-900">
                                                      *
                                                    </span>
                                                  </p>
                                                  <Multiselect
                                                    closeIcon={"cancel"}
                                                    displayValue="key"
                                                    placeholder="club Name"
                                                    ref={clubHolderRefEdit}
                                                    onKeyPressFn={function noRefCheck() {}}
                                                    selectionLimit={1}
                                                    onRemove={() =>
                                                      function noRefCheck() {}
                                                    }
                                                    onSearch={function noRefCheck() {}}
                                                    onSelect={() => {
                                                      function noRefCheck() {}
                                                    }}
                                                    options={clubList}
                                                    selectedValues={
                                                      memberClubEdit
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
                                                    onClick={() => {
                                                      setShowEditModal(false);
                                                      handleEditAdmin();
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
                                      // onClick={(e) => {
                                      //   setQueryId(item["query_id"]);
                                      //   ExportCSV();
                                      // }}
                                      type="button"
                                      className="px-2 py-2 mx-2 rounded-full border text-red-500 hover:text-red-400 text-lg border-white hover:border-emerald-400"
                                    >
                                      <AiOutlineDelete
                                        onClick={() =>
                                          handleDeleteMember(item.id)
                                        }
                                      />
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

export default ManageMembers;
