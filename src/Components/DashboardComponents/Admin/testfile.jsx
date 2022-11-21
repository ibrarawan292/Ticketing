import { useState, useEffect } from "react";

//Packages
import toast from "react-hot-toast";
import Moment from "moment";
import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import PulseLoader from "react-spinners/PulseLoader";
import Dropdown from "react-bootstrap/Dropdown";
import { ImFilesEmpty } from "react-icons/im";
import Papa from "papaparse";
import ProgressBar from "react-bootstrap/ProgressBar";
import readXlsxFile from "read-excel-file";
import FileSaver from "file-saver";

//Components

// import PaginationButtons from "../../../components/Pagination/PaginationButtons";
import PaginationButtons from "../Pagination/PaginationButtons";
import { CheckHeaders3 } from "../../pages/UserDashboard/Dashboard/CheckHeaders";

//ApiURL
// import ApiURL from "../../../config/config";
import ApiURL from "../../config/config";
// import UserRefreshToken from "../Api/UserRefreshToken";
import UserRefreshToken from "../../pages/UserDashboard/Api/UserRefreshToken";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const MDTFilter = {
  vendor: 1,
  region: 2,
};

const getFilterValue = (id) => {
  if (id === MDTFilter.region) {
    return "region";
  }
  if (id === MDTFilter.vendor) {
    return "vendor";
  }
  return "";
};

const OutputFiles = {
  PQV: "PQV",
  PPV: "PPV",
  INVOICES: "Invoices",
};
const InputFiles = {
  SHORTAGES: "shortages",
  REMITTANCE_INVOICE: "remittance_invoices",
  REMITTANCE_PAYMENT: "remittance_payments",
};

const OSSR = () => {
  useEffect(() => {
    document.title = "Charge Guard | User Dashboard";
  }, []);

  const DDButton = (props) => {
    return (
      <Dropdown>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          onClick={() =>
            OPfile(props.id, props.name, "UserDownloadOutputQuery")
          }
        >
          Download Files
        </Dropdown.Toggle>

        {/* <Dropdown.Menu>
          {props.output === 0 ? (
            <Dropdown.Item
              href="#/action-2"
              className="text-center"
              onClick={() =>
                OPfile(props.id, props.name, "UserDownloadInputQuery")
              }
            >
              Input File
            </Dropdown.Item>
          ) : (
            <>
              <Dropdown.Item
                href="#/action-1"
                className="text-center"
                onClick={() =>
                  OPfile(props.id, props.name, "UserDownloadInputQuery")
                }
              >
                Output File
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                className="text-center"
                onClick={() =>
                  OPfile(props.id, props.name, "UserDownloadOutputQuery")
                }
              >
                Input File
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu> */}
      </Dropdown>
    );
  };

  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [fileType1, setFileType1] = useState("");
  const [fileType2, setFileType2] = useState("");
  const [loader, setLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [TokenRefresh, setTokenRefresh] = useState(true);

  const [data, setData] = useState();

  // Pagination
  const [totalRecords, setTotalRecords] = useState(data);
  const [searchRecord, setSearchRecord] = useState(0);
  const [NumberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(5);
  const [totalSearchRecords, setTotalSearchRecords] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchGoto, setSearchGoto] = useState("");
  const [totalSearchPages, setTotalSearchPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [searchUsers, setSearchUser] = useState("");

  // Choose File Loaders
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);

  // MDTFilter
  const [MDTFILTER, setMDTFILTER] = useState(1);

  const [SearchString, setSearchString] = useState("");

  // Get Data
  const getQuery = (word) => {
    setLoader(false);
    const items = JSON.parse(localStorage.getItem("UserAuth"));
    var formdata = new FormData();
    formdata.append("query", word);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + items.access_token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${ApiURL}/UserSearchQueries/` +
        NumberOfRecordsPerPage +
        "/" +
        searchRecord,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.user_queries);
        setTotalPages(response.pages);
        setTotalRecords(response.total_records);
        console.log(data);
        setLoader(true);
      });
  };

  useEffect(() => {
    getQuery("");
  }, []);
  // useEffect(() => {
  //     getQuery(searchQuery);
  // }, []);
  // // Get Data ----- End

  // File 1 ----- Validation
  let handleChange1 = (e) => {
    setLoader1(true);
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
      setFileName1(e.name);
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
        setLoader1(false);
        document.getElementById("ShortageFileID").value = "";
        setFileName1("");
        setFileType1("");
      }
    });
  };
  let handleChange2 = (e) => {
    setLoader1(true);
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
      setFileName1(e.name);
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
        setLoader1(false);
        document.getElementById("RemittanceInvoiceID").value = "";
        setFileName1("");
        setFileType1("");
      }
    });
  };
  let handleChange3 = (e) => {
    setLoader1(true);
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
      setFileName1(e.name);
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
        setLoader1(false);
        document.getElementById("RemittancePaymentsID").value = "";
        setFileName1("");
        setFileType1("");
      }
    });
  };

  // Create Query ----- Upload Files

  const [InputLoader, setInputLoader] = useState(false);
  const [OutputLoader, setOutputLoader] = useState(false);

  const CreateQuery = () => {
    var file1 = document.getElementById("ShortageFileID");
    var file2 = document.getElementById("RemittanceInvoiceID");
    var file3 = document.getElementById("RemittancePaymentsID");

    console.log(file1);
    if (file1.value !== "" && file2.value !== "") {
      setUploadLoader(true);
      const items = JSON.parse(localStorage.getItem("UserAuth"));
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + items.access_token);

      var formdata = new FormData();
      formdata.append("shortage_file", file1.files[0]);
      formdata.append("invoice_file", file2.files[0]);

      if (file3.files[0] != undefined) {
        formdata.append("payment_file", file3.files[0]);
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
      fetch(ApiURL + "CreateUserQuery", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.status);
          console.log(result.status === 406);
          if (result.status === 406) {
            toast.error(result.message);
            setUploadLoader(false);
          } else {
            if (result.msg !== "Token has expired") {
              setUploadLoader(false);
              getQuery("");
              toast.success("Files Uploaded Successfully");
            } else if (result.msg === "Token has expired") {
              UserRefreshToken({ TokenRefresh, setTokenRefresh });

              setTimeout(function () {
                CreateQuery();
              }, 1000);
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoader(true);
          setUploadLoader(false);
        });
    } else {
      toast.error("Please upload both files!");
    }
  };

  // Upload Files ----- End

  // Download ------ Output and Input Files
  const OPfile = (id, name, queryAPI) => {
    toast.success("Downloading processed");
    const items = JSON.parse(localStorage.getItem("UserAuth"));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + items.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/" + queryAPI + "/" + id, requestOptions)
      .then((res) => {
        if (res.status === 500) {
          return res.json();
        } else {
          return res.blob();
        }
      })
      .then((data) => {
        if (data.msg !== "Token has Expired") {
          console.log("I am here");
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "Output file";
          a.click();
        } else if (data.msg === "Token has expired") {
          UserRefreshToken({ TokenRefresh, setTokenRefresh });
          setTimeout(function () {
            OPfile(id, name, queryAPI);
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error("Can't be able to download file");
        console.log("error", error);
      });
  };
  const onPressSearch = (e) => {
    e.preventDefault();
    setLoader(false);
    const items = JSON.parse(localStorage.getItem("UserAuth"));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + items.access_token);
    myHeaders.append("Content-Type", "application/json");
    console.log(getFilterValue(MDTFILTER));
    fetch(`${ApiURL}/UserSearchQueries/${10}/${0}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        query: searchQuery,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response.user_queries);
        setTotalPages(response.pages);
        setTotalRecords(response.total_records);
        console.log(data);
        setLoader(true);
      });
  };
  const onChangeFilter = (index) => {
    setMDTFILTER(index + 1);
  };
  // Download Files ---- End

  const DownloadOutPutFile = (outputFile, queryID, clientName) => {
    setOutputLoader(true);
    const items = JSON.parse(localStorage.getItem("UserAuth"));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + items.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${ApiURL}/UserDownloadOutputQuery/${outputFile}/${queryID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const blob = new Blob([result], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `${clientName + "_" + outputFile + "_" + Date.now()}.csv`
        );
        a.click();
        setOutputLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
        setOutputLoader(false);
      });
  };
  const DownloadInPutFile = (inputFile, queryID, clientName) => {
    setInputLoader(true);
    const items = JSON.parse(localStorage.getItem("UserAuth"));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + items.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${ApiURL}/UserDownloadInputFile/${inputFile}/${queryID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const blob = new Blob([result], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `${clientName + "_" + inputFile + "_" + Date.now()}.csv`
        );
        a.click();
        setInputLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
        setInputLoader(false);
      });
  };

  return (
    <>
      <div class="container-sm text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            CreateQuery();
          }}
        >
          {uploadLoader ? (
            <div className="my-3">
              <PulseLoader size={10} color={"#ef1442"} />
              <label for="formFile" class="form-label">
                Please wait file is uploading...
              </label>
            </div>
          ) : (
            <div class="row d-inline-flex">
              <div class="col">
                {loader1 && false ? (
                  <label for="ShortageFileIDHtml" class="form-label flexflex">
                    Checking File
                    <PulseLoader size={2} color={"#111"} className="ms-1" />
                  </label>
                ) : (
                  <label for="ShortageFileIDHtml" class="form-label fw-bold">
                    Upload Shortages
                  </label>
                )}

                <input
                  id="ShortageFileID"
                  class="form-control upload_file"
                  type="file"
                  onChange={(e) => handleChange1(e)}
                />
              </div>
              <div class="col">
                {loader1 && false ? (
                  <label for="RemInvoicesHtml" class="form-label flexflex">
                    Checking File
                    <PulseLoader size={2} color={"#111"} className="ms-1" />
                  </label>
                ) : (
                  <label for="RemInvoicesHtml" class="form-label fw-bold">
                    Remittance Invoices
                  </label>
                )}

                <input
                  id="RemittanceInvoiceID"
                  class="form-control upload_file"
                  type="file"
                  onChange={(e) => handleChange2(e)}
                />
              </div>
              <div class="col">
                {loader1 && false ? (
                  <label for="RemPaymentsHtml" class="form-label flexflex">
                    Checking File
                    <PulseLoader size={2} color={"#111"} className="ms-1" />
                  </label>
                ) : (
                  <label for="RemPaymentsHtml" class="form-label fw-bold">
                    Remittance Payments
                  </label>
                )}

                <input
                  id="RemittancePaymentsID"
                  class="form-control upload_file"
                  type="file"
                  onChange={(e) => handleChange3(e)}
                />
              </div>
            </div>
          )}
          <div class="col">
            <button className="btn-primary  mt-3 mb-3" type="submit">
              <span className="me-1">
                <FaCloudUploadAlt />
              </span>
              Start Processing
            </button>
          </div>
        </form>
      </div>

      <div className="container-sm">
        <form onSubmit={(e) => (e.preventDefault(), getQuery(searchQuery))}>
          <div className="search-container">
            <span className="span1">
              <BiSearch />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="form-control"
              required="required"
              placeholder="Search Query"
            />
            &nbsp;|&nbsp;
            <button className="btn btn-outline-primary" onClick={onPressSearch}>
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="container-sm table_main">
        {loader ? (
          <>
            {data !== undefined ? (
              <>
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Store</th>
                      <th scope="col">Upload Time</th>
                      <th scope="col">Status</th>
                      <th>Input Files</th>
                      <th>Output Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data ?? [0]).length !== 0 &&
                      data
                        .filter((it) =>
                          it[1]
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((data, index) => (
                          <tr key={index}>
                            <td>{data[1]}</td>
                            <td>{data[3]}</td>
                            <td>{data[4]}</td>
                            <td>
                              <Dropdown>
                                <DropdownToggle className="btn btn-danger">
                                  {OutputLoader ? (
                                    <PulseLoader
                                      size={15}
                                      color={"#ffff"}
                                      className="ms-1"
                                    />
                                  ) : (
                                    "Download Input Files"
                                  )}
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    onClick={() => {
                                      DownloadInPutFile(
                                        InputFiles.SHORTAGES,
                                        data[0],
                                        data[1]
                                      );
                                    }}
                                  >
                                    Shortages
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => {
                                      DownloadInPutFile(
                                        InputFiles.REMITTANCE_INVOICE,
                                        data[0],
                                        data[1]
                                      );
                                    }}
                                  >
                                    Remittance Invoices
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => {
                                      DownloadInPutFile(
                                        InputFiles.REMITTANCE_PAYMENT,
                                        data[0],
                                        data[1]
                                      );
                                    }}
                                  >
                                    Remittance Payments
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </td>
                            <td>
                              <Dropdown>
                                <DropdownToggle className="btn btn-danger">
                                  {InputLoader ? (
                                    <PulseLoader
                                      size={15}
                                      color={"#ffff"}
                                      className="ms-1"
                                    />
                                  ) : (
                                    "Download Output"
                                  )}
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    onClick={() => {
                                      DownloadOutPutFile(
                                        OutputFiles.INVOICES,
                                        data[0],
                                        data[1]
                                      );
                                    }}
                                  >
                                    Invoice Dataset
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => {
                                      DownloadOutPutFile(
                                        OutputFiles.PPV,
                                        data[0],
                                        data[1]
                                      );
                                    }}
                                  >
                                    PPV Sheet
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => {
                                      DownloadOutPutFile(
                                        OutputFiles.PQV,
                                        data[0],
                                        data[1]
                                      );
                                    }}
                                  >
                                    PQV Sheet
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
                {(data ?? [0]).length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      onClick={() => {}}
                      className="btn btn-warning disabled"
                      style={{ padding: "6pt" }}
                      colSpan={"7"}
                    >
                      No record Found
                    </div>
                  </div>
                )}
                <PaginationButtons
                  totalRecords={totalRecords}
                  setRecord={setSearchRecord}
                  record={searchRecord}
                  NumberOfRecordsPerPage={NumberOfRecordsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  setGoto={setGoto}
                  goto={goto}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <p className="py-4 text-center">
                <ImFilesEmpty /> No Data Here
              </p>
            )}
          </>
        ) : (
          <table class="table table-loader" style={{ overflow: "hidden" }}>
            <thead class="thead-dark">
              <tr>
                <th scope="col">Loading</th>
                <th scope="col">Loading</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "100%" }}>
                  <span></span>
                </td>
                <td style={{ width: "100%" }}>
                  <span></span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "100%" }}>
                  <span></span>
                </td>
                <td style={{ width: "100%" }}>
                  <span></span>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OSSR;
