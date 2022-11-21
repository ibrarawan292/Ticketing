import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Data } from "./PlansData";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function ReadOnlyRow({
  pick,
  handleEditClick,
  handleDeleteClick,
  handlePop,
  currentItems,
}) {
  return (
    <>
      <tr>
        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
          <p className="text-gray-900 whitespace-no-wrap">{pick.name}</p>
        </td>

        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
          <p className="text-gray-900 whitespace-no-wrap">{pick.limit}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-600 whitespace-no-wrap">{pick.price}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-600 whitespace-no-wrap">{pick.time}</p>
        </td>
        <td className=" py-5 border-b border-gray-200 bg-white text-sm">
          <button
            onClick={(e) => {
              handleEditClick(e, pick);
              handlePop();
            }}
            type="button"
            className="px-2 py-2 mx-2 rounded-full border text-emerald-500 hover:text-emerald-400 text-lg border-white hover:border-emerald-400"
          >
            <AiFillEdit />
          </button>
          <button
            onClick={() => handleDeleteClick(pick.id)}
            type="button"
            className="px-2 py-2 mx-2 rounded-full border text-red-600 hover:text-red-400 text-lg border-white hover:border-red-400"
          >
            <AiFillDelete className="self-center" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default ReadOnlyRow;
