import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ThemeContext } from "../../App";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import TestimonialCard1 from "../Cards/TestimonialCard1";
import { AiFillStar } from "react-icons/ai";

function Testimonials() {
  const [data, setData] = useState("");
  const [record, setRecord] = useState(0);
  const [NumberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(5);

  const { DarkMode } = useContext(ThemeContext);

  // const getTestimonials = () => {
  //   var myHeaders = new Headers()

  //   myHeaders.append('Content-Type', 'text/plain')

  //   var requestOptions = {
  //     method: 'GET',
  //   }

  //   fetch(
  //     ApiURL + '/HomePageReviews/' + NumberOfRecordsPerPage + '/' + record,
  //     requestOptions,
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setData(result['reviews'])
  //     })
  //     .catch((error) => console.log('error', error))
  // }

  // useEffect(() => {
  //   getTestimonials()
  // }, [])

  return (
    <section
      style={
        DarkMode === true
          ? { backgroundColor: "var(--bg-fill1)" }
          : { backgroundColor: "var(--bg-fill2)" }
      }
      className="py-20"
    >
      <div className="w-full">
        <div className="w-full text-center pb-10 lg:pb-0 flex flex-col items-center">
          <h2
            style={
              DarkMode === true
                ? { color: "var(--txtColor3)" }
                : { color: "var(--txtColor1)" }
            }
            className="lg:w-1/2 leading-tight w-full text-4xl font-bold px-5 pb-5"
          >
            What Our Clients Said About
            <p style={{ color: "var(--btn-bgColor2)" }} className="font-serif">
              Co-Crawler
            </p>
          </h2>
        </div>

        {/* CAROUSEL  */}
        <div className="w-full flex justify-center md:pt-5">
          <div className="w-2/3 md:block md:w-4/12 h-[430px] flex justify-center relative ">
            <TestimonialCard1 data={data} />
          </div>
        </div>

        {/* CAROUSEL FOR MOBILE  */}
        {/* <div className="w-full bg-black md:hidden md:w-[500px] lg:w-[750px] h-full mx-auto relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper w-full h-full"
          >
            <SwiperSlide className="flex items-center rounded-md pb-10 justify-center">
              <TestimonialCard1 data={data} />
            </SwiperSlide>
          </Swiper>
        </div> */}
      </div>
    </section>
  );
}

export default Testimonials;
