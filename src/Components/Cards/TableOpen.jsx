import { useState, useRef } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import Multiselect from "multiselect-react-dropdown";
import { FaShoppingCart } from "react-icons/fa";

const TableOpen = (props) => {
  const membersRef = useRef(null);

  const [show, setShow] = useState(false);
  return (
    <>
      <tr>
        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
          <p className="text-gray-900 whitespace-no-wrap">{props.item.ip}</p>
        </td>
        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
          <p className="text-gray-900 whitespace-no-wrap">{props.item.event}</p>
        </td>

        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
          <p className="text-gray-900 whitespace-no-wrap">
            {props.item.member}
          </p>
        </td>
        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
          <p className="text-gray-900 whitespace-no-wrap">{props.item.no}</p>
        </td>
        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
          <p className="text-gray-900 whitespace-no-wrap">
            {props.item.status}
          </p>
        </td>
        <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
          <button
            className="text-gray-900 whitespace-no-wrap"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <IoIosArrowDropupCircle size={26} color={"#1E40AF"} />
            ) : (
              <IoIosArrowDropdownCircle size={26} color={"#1E40AF"} />
            )}
          </button>
        </td>
      </tr>
      {show ? (
        <tr>
          <td
            colspan="6"
            className="px-5 space-x-2 py-4 border-b border-gray-200 bg-gray-100 w-[100%]"
          >
            <div className="flex justify-items-center items-center">
              <div className="formTicketBuy w-[45%] pr-4">
                <p className="text-gray-700 whitespace-no-wrap text-sm mb-1 ">
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
              </div>
              <div className="formTicketBuy w-[45%] pr-4">
                <p className="text-gray-700 whitespace-no-wrap text-sm mb-1">
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
                    { cat: 1, key: "Card Number 1" },
                    { cat: 2, key: "Card Number 2" },
                    { cat: 3, key: "Card Number 3" },
                  ]}
                  style={{ marginTop: "3px" }}
                />
              </div>
              <div className="w-[10%] flex justify-items-center items-center">
                <div>
                  <button
                    style={{ background: "var(--bg-fill1)" }}
                    className="btn-hover text-white uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
};
export default TableOpen;
