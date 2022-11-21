import React from "react";
import {
  FaFacebookSquare,
  FaPinterestSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-100 body-font bg-gradient-to-tl to-black from-blue-900">
        {/* <div className="container px-5 py-20 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-80 md:pl-10 flex flex-col justify-center md:justify-start flex-shrink-0 md:mx-0 mx-auto text-center md:text-start">
            <div className="w-full flex justify-center md:justify-start">
              Co-Crawler
            </div>
            <p className="text-sm font-extralight text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
              similique numquam, reiciendis doloremque sunt voluptatem sit
              temporibus quis delectus nobis, commodi id, quasi earum porro
              veniam laudantium? Tempore, voluptates asperiores?
            </p>
          </div>

          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-2/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-semibold text-gray-200 tracking-widest text-sm mb-3">
                Company
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                    Home
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                    Our Pricing
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                    Latest News
                  </a>
                </li>
              </nav>
            </div>

            <div className="lg:w-4/12 md:w-1/2 w-full px-4">
              <h2 className="title-font font-semibold text-gray-200 tracking-widest text-sm mb-3">
                OTHERS
              </h2>
              <nav className="list-none mb-10">
                <li className="flex justify-center md:justify-start">
                  <p
                    style={{ display: "flex", flexDirection: "row" }}
                    className="items-center "
                  >
                    <a className="text-gray-400 flex hover:text-gray-200 link-underline cursor-pointer">
                      Checkout
                    </a>
                  </p>
                </li>
                <li className="flex justify-center md:justify-start">
                  <p
                    style={{ display: "flex", flexDirection: "row" }}
                    className="items-center"
                  >
                    <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                      Cart
                    </a>
                  </p>
                </li>
                <li className="flex justify-center md:justify-start">
                  <p
                    style={{ display: "flex", flexDirection: "row" }}
                    className="items-center"
                  >
                    <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                      Products
                    </a>
                  </p>
                </li>
                <li className="flex justify-center md:justify-start">
                  <p
                    style={{ display: "flex", flexDirection: "row" }}
                    className="items-center"
                  >
                    <a className="text-gray-400 hover:text-gray-200 link-underline cursor-pointer">
                      FSQs
                    </a>
                  </p>
                </li>
              </nav>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-semibold text-gray-200 tracking-widest text-sm mb-3">
                SOCIAL MEDIA
              </h2>
              <nav className="list-none mb-10">
                <li className="flex justify-center md:justify-start space-x-1">
                  <FaFacebookSquare size="2em" color="#0078D7" />
                  <FaPinterestSquare size="2em" color="#B91C1C" />
                  <FaTwitterSquare size="2em" color="skyblue" />
                  <FaInstagramSquare size="2em" color="deeppink" />
                </li>
                <li className="flex mt-2 justify-center md:justify-start">
                  <p className="items-center text-gray-400 tracking-tighter">
                    Join our social media groups to avail exclusive offers
                  </p>
                </li>
              </nav>
            </div>
          </div>
        </div> */}
        <div className="bg-blue-800">
          <div className="container mx-auto py-5 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-white text-sm text-center sm:text-left">
              © 2022 —
              <a
                href="#"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-100 ml-1"
                target="_blank"
              >
                Co-Crawler
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-white hover:text-gray-100 hover:cursor-pointer">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-white hover:text-gray-100 hover:cursor-pointer">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-white hover:text-gray-100 hover:cursor-pointer">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-white hover:text-gray-100 hover:cursor-pointer">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
