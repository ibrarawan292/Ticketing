import React, { useEffect, useState } from "react";
import { Data3 } from "./PlansData";
import { nanoid } from "nanoid";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import EditableRowReviews from "./EditableRowRevies";
// import ReadOnlyRowReviews from "./ReadOnlyRowsReviews";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ApiURL from "../../../Config/Config";
import ReadOnlyRow from "./ReadOnlyRow";
import SetGetInput from "../../SetGetInput/SetGetInput";
import ScaleLoader from "react-spinners/ScaleLoader";
import PaginationButtons from "../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import Helmet from "react-helmet";

function MarketPlace(props) {
  const [Loader, setLoader] = useState(false);
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);

  const [Active, setActive] = useState(false);
  const [AddReview, setAddReview] = useState(false);
  const [EditReviews, setEditReviews] = useState(false);
  const [EditReviewsID, setEditReviewsID] = useState("");

  //for add reviews

  const [review_name_add, setReviewNameAdd] = useState("");
  const [review_text_add, setReviewTextAdd] = useState("");
  const [rating_add, setRatingAdd] = useState("");

  // for Edit reviews
  const [review_name, setReviewName] = useState("");
  const [review_text, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [Editstatus, setEditStatus] = useState(true);

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

  //for notifications

  const notify = () => toast("Review Added Successfully");
  const notifyDelete = () => toast("Review Deleted Successfully");
  const notifyEdit = () => toast("Review Edited Successfully");

  return (
    <div className="flex flex-col w-full -mt-5">
      <Helmet>
        <title>Ticket System | Admin | Market Place</title>
      </Helmet>
      <ToastContainer />
      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <form className="flex">
          <input
            className="py-2 md:-ml-2 px-2 border border-gray-400 rounded rounded-r-none w-full md:w-6/6"
            type="search"
            placeholder="Search Marketplaces"
          />
          <button
            type="submit"
            style={{ background: "var(--bg-fill1)" }}
            className="btn-hover text-white px-4 rounded-r border-gray-400"
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
                            NAME
                          </th>

                          <th className="px-5 pr-20 md:pr-0 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            STATUS
                          </th>
                          <th className="px-5 pr-20 md:pr-0 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                            DATE
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Ticket.com
                            </p>
                          </td>

                          <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Working
                            </p>
                          </td>

                          <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                            <p className="text-gray-900 whitespace-no-wrap">
                              12 Nov
                            </p>
                          </td>
                        </tr>
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
      </section>
    </div>
  );
}

export default MarketPlace;
