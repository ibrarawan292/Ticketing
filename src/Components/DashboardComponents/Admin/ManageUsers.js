import React, { useEffect, useState } from "react";
import { Data } from "./PlansData";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import ApiURL from "../../../Config/Config";
import ScaleLoader from "react-spinners/ScaleLoader";
import SetGetInput from "../../SetGetInput/SetGetInput";
import PaginationButtons from "../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import Helmet from "react-helmet";

function ManageUsers(props) {
  const [Loader, setLoader] = useState(true);
  const [UserName, setUserName] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [EmailUser, setEmailUser] = useState("");
  const [PasswordUser, setPasswordUser] = useState("");
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);
  const [editID, setEditID] = useState("");
  // for Edit
  const [UsernameEdit, setUsernameEdit] = useState("");
  const [PasswordEdit, setPasswordEdit] = useState("");
  const [Editstatus, setEditStatus] = useState(true);
  const [planList, setPlanList] = useState([]);

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

  const EditUser = (id) => {
    var raw = JSON.stringify({
      username: UsernameEdit,
      password: PasswordEdit,
    });

    var requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/AdminEditUser/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        notifyEdit();
        setRefresh(true);
        setEditPlan(!EditPlan);
      })
      .catch((error) => {
        console.log(error, " error");
      });
  };

  const getPlanList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer ",
      },
    };

    fetch(ApiURL + "/UserListPlans", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPlanList(result["plans"]);
        setLoader(false);
      })
      .then(() => {
        setLoader(false);
        setRefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const getUsers = (str) => {
    setLoader(true);
    getPlanList();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer ");

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
      ApiURL + "/AdminSearchUsers/" + NumberOfRecordsPerPage + "/" + record,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.user, "Main Data here!!!!!!!");
        console.log(result.user[0]["end_date"].slice(0, 17));
        setTableData(result["user"]);
        setTotalRecords(result.total_records);
        setTotalPages(result.pages);
      })
      .then(() => {
        setLoader(false);
        setRefresh(false);
      })
      .catch((error) => console.log("error", error));
  };
  const deletePlan = (id) => {
    console.log("delete triggered!!!", id);
    setLoader(true);
    var requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: "Bearer ",
      },
    };
    fetch(ApiURL + "/AdminDeleteUser/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        notifyDelete();
        setRefresh(true);
        console.log(result);
        console.log("Button Clicked!!");
        setLoader(false);
      })
      .catch((error) => {
        console.log("Button Clicked!!!!!!");
        console.log(error, "error");
        setLoader(false);
      });
  };
  const addUser = () => {
    setLoader(true);
    var raw = JSON.stringify({
      username: UserName,
      name: Name,
      phone: Phone,
      address: Address,
      email: EmailUser,
      password: PasswordUser,
      plan_id: parseInt(document.getElementById("statusPlanID").value),
    });
    notify();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch(ApiURL + "/AdminAddUser", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddPlan(!AddPlan);
        setRefresh(true);
        setUserName("");
        setEmailUser("");
        setPasswordUser("");
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "error");
      });
  };
  useEffect(() => {
    getUsers("");
  }, [refresh]);

  useEffect(() => {
    getUsers("");
  }, [record]);
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((pick) => (
            <>
              <ReadOnlyRow
                pick={pick}
                handlePop={handlePop}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
              />
            </>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(Data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(Data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % Data.length;
      setItemOffset(newOffset);
    };
    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="flex absolute space-x-5 py-5 px-3 text-emerald-500"
          pageLinkClassName="bg-white rounded-md px-4 py-2 border border-emerald-500"
          activeLinkClassName="bg-emerald-500 rounded-md border border-white px-4 py-2 text-white"
          previousClassName="hover:text-emerald-400"
          nextClassName="hover:text-emerald-400"
        />
      </>
    );
  }

  const [Active, setActive] = useState(false);
  const [Pop, setPop] = useState(false);
  const [AddPlan, setAddPlan] = useState(false);
  const [EditPlan, setEditPlan] = useState(false);
  const [EditPlansID, setEditPlansID] = useState(null);
  const [Plans, setPlans] = useState(Data);
  const [addForm, setAddForm] = useState({
    name: "",
    limit: "",
    price: "",
    time: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    limit: "",
    price: "",
    time: "",
  });

  const handleAddFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...addForm };
    newFormData[fieldName] = fieldValue;

    setAddForm(newFormData);

    if (fieldValue !== "") {
      setActive(true);
    }

    console.log(addForm);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newPlan = {
      id: nanoid(),
      name: addForm.name,
      limit: addForm.limit,
      price: addForm.price,
      time: addForm.time,
    };

    const newPlans = [...Plans, newPlan];
    setPlans(newPlans);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedPlan = {
      id: editForm.id,
      name: editForm.name,
      limit: editForm.limit,
      price: editForm.price,
      time: editForm.time,
    };

    const newPlans = [...Plans];
    const index = Plans.findIndex((pick) => pick.id === EditPlansID);
    newPlans[index] = editedPlan;
    setPlans(newPlans);
    setEditPlansID(null);
  };

  const handleEditClick = (e, pick) => {
    e.preventDefault();
    setEditPlansID(pick.id);

    const formValues = {
      name: pick.name,
      limit: pick.limit,
      price: pick.price,
      time: pick.time,
    };

    setEditForm(formValues);
  };

  const handleDeleteClick = (planID) => {
    const newPlans = [...Plans];
    const index = Plans.findIndex((pick) => pick.id === planID);
    newPlans.splice(index, 1);
    setPlans(newPlans);
  };

  const handlePop = () => {
    setPop(!Pop);
  };

  const notify = () => toast("User Added Successfully");
  const notifyDelete = () => toast("User Deleted Successfully");
  const notifyEdit = () => toast("User Edited Successfully");

  return (
    <div className="flex flex-col w-full -mt-5">
      <Helmet>
        <title>SVS | Admin | Manage Users</title>
      </Helmet>
      <ToastContainer />
      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <form
          className="flex"
          onSubmit={(e) => (e.preventDefault(), getUsers(searchUsers))}
        >
          <input
            className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
            type="search"
            value={searchUsers}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search Users"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 rounded-r border-gray-400"
          >
            <GoSearch />
          </button>
        </form>

        <button
          className="py-3 px-10 mt-5 md:mt-0 w-full md:w-fit rounded-md bg-emerald-500 hover:bg-emerald-400 text-white"
          onClick={() => setAddPlan(!AddPlan)}
        >
          Add User
        </button>
      </div>

      {/* <section className="w-full flex justify-center">
        <div className="container w-full mx-auto px-4 sm:px-8">
          <div className="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                {Loader ? (
                  <div className="bg-white p-10 flex justify-center">
                    <ScaleLoader color={"#10B981"} loading={Loader} size={20} />
                  </div>
                ) : (
                  <form>
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr className="bg-gray-100 text-gray-800 py-4">
                          <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            Username
                          </th>

                          <th className="pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            NAME
                          </th>

                          <th className="pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            EMAIL
                          </th>

                          <th className="pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            PHONE
                          </th>

                          <th className="pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            ADDRESS
                          </th>

                          <th className="pl-6 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            PLAN NAME
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                            PRICE
                          </th>

                          <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                            TOTAL QUERIES
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                            AVAILABLE QUERIES
                          </th>

                          <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                            END DATE
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
                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["username"]}
                                  </p>
                                </td>

                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["name"]}
                                  </p>
                                </td>

                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["email"]}
                                  </p>
                                </td>

                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["phone"]}
                                  </p>
                                </td>

                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["address"]}
                                  </p>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    {item["plan_name"]}
                                  </p>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    {item["price"]}
                                  </p>
                                </td>
                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["queries_available"]}
                                  </p>
                                </td>

                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["queries_remaining"]}
                                  </p>
                                </td>

                                <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item["end_date"].slice(0, 17)}
                                  </p>
                                </td>
                                <td className=" py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <button
                                    onClick={(e) => {
                                      setEditStatus(!Editstatus);
                                      setEditPlan(true);
                                      setEditID(item["user_id"]);
                                    }}
                                    type="button"
                                    className="px-2 py-2 mx-2 rounded-full border text-emerald-500 hover:text-emerald-400 text-lg border-white hover:border-emerald-400"
                                  >
                                    <AiFillEdit />
                                  </button>
                                  <button
                                    type="button"
                                    className="px-2 py-2 mx-2 rounded-full border text-red-600 hover:text-red-400 text-lg border-white hover:border-red-400"
                                    onClick={() => deletePlan(item["user_id"])}
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
      </section> */}

      {/* ADD PLAN SECTION  */}
      <section
        className={
          AddPlan === true
            ? "fixed top-0 left-0 w-full h-screen flex justify-center items-center edit-table-modal overflow-auto pt-28"
            : "hidden"
        }
      >
        <div className="w-full mx-5 relative md:w-3/5 flex flex-col sm:flex-row bg-white shadow-lg rounded-lg">
          <AiOutlineCloseCircle
            onClick={() => setAddPlan(!AddPlan)}
            className="absolute top-3 right-5 cursor-pointer text-2xl hover:text-gray-400"
          />
          <div className="w-full sm:w-60 p-5 text-center sm:text-left bg-gray-100 rounded-l-lg">
            <h2 className="text-lg">Add User Details</h2>
            <p className="py-2 text-xs text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, cum.
            </p>
          </div>
          <div className="w-full md:w-5/6 p-5">
            <form
              className="flex flex-col p-5"
              onSubmit={(e) => (e.preventDefault(), addUser())}
            >
              <label htmlFor="plan-name ">
                Username
                <input
                  type="text"
                  name="Username"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                  placeholder="Username"
                  required
                />
              </label>

              <label htmlFor="plan-name ">
                Name
                <input
                  type="text"
                  name="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                  placeholder="Name"
                  required
                />
              </label>

              <label htmlFor="plan-phone ">
                Phone
                <input
                  type="number"
                  name="Phone"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                  placeholder="Phone"
                  required
                />
              </label>

              <label htmlFor="plan-name ">
                Address
                <input
                  type="text"
                  name="Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                  placeholder="Address"
                  required
                />
              </label>

              <label htmlFor="query-availability ">
                Email
                <input
                  type="email"
                  value={EmailUser}
                  onChange={(e) => setEmailUser(e.target.value)}
                  className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                  placeholder="Enter an Email"
                  required
                />
              </label>
              <label htmlFor="subscription-days ">
                Password
                <input
                  type="password"
                  value={PasswordUser}
                  onChange={(e) => setPasswordUser(e.target.value)}
                  className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                  placeholder="Enter Password"
                  required
                />
              </label>
              <label htmlFor="price">
                Plan ID
                <select
                  className="my-accent flex flex-col p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                  name="status"
                  id="statusPlanID"
                >
                  {planList.map((item) => {
                    return (
                      <option value={item["plan_id"]}>
                        {item["plan_name"]}
                      </option>
                    );
                  })}
                  {/* <option value="1">Active</option>
                  <option value="0">Inactive</option> */}
                </select>
              </label>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 text-sm bg-black text-white mt-5"
                >
                  ADD User
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* EDIT PLAN SECTION  */}
      <section
        className={
          EditPlan === true
            ? "fixed top-0 left-0 w-full h-screen flex justify-center items-center edit-table-modal overflow-auto pt-28"
            : "hidden"
        }
      >
        <div className="w-full mx-5 relative md:w-3/5 flex flex-col sm:flex-row bg-white shadow-lg rounded-lg">
          <AiOutlineCloseCircle
            onClick={() => (setEditPlan(!EditPlan), setEditStatus(!Editstatus))}
            className="absolute top-3 right-5 cursor-pointer text-2xl hover:text-gray-400"
          />
          <div className="w-full sm:w-60 p-5 text-center sm:text-left bg-gray-100 rounded-l-lg">
            <h2 className="text-lg">Edit User Details</h2>
            <p className="py-2 text-xs text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, cum.
            </p>
          </div>
          <div className="w-full md:w-5/6 p-5">
            {tableData &&
              tableData
                .filter((fl) => fl["user_id"] === editID)
                .map((items) => {
                  console.log(items);
                  return (
                    <form
                      className="flex flex-col p-5 pb-0"
                      onSubmit={(e) => (
                        e.preventDefault(), EditUser(items["user_id"])
                      )}
                    >
                      <label htmlFor="user-name ">
                        Username
                        <SetGetInput
                          data={UsernameEdit}
                          setData={setUsernameEdit}
                          name={items["username"]}
                          placeholder={"Enter Your Username"}
                          type={"text"}
                          id={"username"}
                          name1={"name"}
                          status={Editstatus}
                        />
                      </label>
                      <label htmlFor="user-password ">
                        Password
                        <SetGetInput
                          data={PasswordEdit}
                          setData={setPasswordEdit}
                          name={items["password"]}
                          placeholder={"Enter Password"}
                          type={"password"}
                          id={"password"}
                          name1={"pass"}
                          status={Editstatus}
                        />
                      </label>
                      <div className="w-full flex justify-end">
                        <button
                          type="submit"
                          className="py-3 px-6 text-sm bg-black text-white mt-5"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageUsers;
