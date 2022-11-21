import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper";
import { RiHqFill } from "react-icons/ri";
import ApiURL from "../../Config/Config";
import { PulseLoader } from "react-spinners";

function TestimonialCard1({ data }) {
  const [ratings, setRatings] = useState([]);
  const [Data, setData] = useState([]);

  const [Loading, setLoading] = useState(false);

  const { DarkMode } = useContext(ThemeContext);

  // Testimonial card api starts
  const getTestimonials = () => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(ApiURL + "/get/all/testimonials", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setLoading(false);
          setData(result.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  // Testimonial card api ends

  useEffect(() => {
    getTestimonials();
    setRatings(data);
  }, [ratings, setRatings]);

  return (
    <>
      {Loading === true ? (
        <div className="w-full flex justify-center items-center absolute right-0">
          <PulseLoader
            color={DarkMode === true ? "var(--bg-fill3)" : "var(--bg-fill5)"}
            size={30}
            style={{ zIndex: "10" }}
          />
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={80}
          loop={true}
          navigation={false}
          effect={"cards"}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          modules={[Autoplay, EffectCards]}
          className="mySwiper flex items-center justify-center w-full h-full "
        >
          {Data?.map((item) => (
            <SwiperSlide
              key={item.id}
              style={
                DarkMode === true
                  ? { backgroundColor: "var( --bg-fill5)" }
                  : { backgroundColor: "var( --btn-bgColor1)" }
              }
              className="flex w-full items-center rounded-md pb-10 justify-center"
            >
              <div
                style={
                  DarkMode === true
                    ? { backgroundColor: "var(--bg-fill4)" }
                    : { backgroundColor: "var(--bg-fill3)" }
                }
                className="w-full h-fit mt-20 px-10 flex rounded-lg"
              >
                <div className="flex flex-col justify-end lg:justify-center px-5 lg:px-0 text-center lg:text-left py-5">
                  <p className="text-gray-500">{item.description}</p>
                  <div className="flex py-4 justify-center lg:justify-start">
                    {item.rating === 1 ? (
                      <AiFillStar className="flex" color="orange" />
                    ) : (
                      ""
                    )}

                    {item.rating === 2 ? (
                      <span className="flex">
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                      </span>
                    ) : (
                      ""
                    )}

                    {item.rating === 3 ? (
                      <span className="flex">
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                      </span>
                    ) : (
                      ""
                    )}

                    {item.rating === 4 ? (
                      <span className="flex">
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                      </span>
                    ) : (
                      ""
                    )}

                    {item.rating === 5 ? (
                      <span className="flex">
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                        <AiFillStar color="orange" />
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <h2 className=" text-lg font-semibold">{item.author_name}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default TestimonialCard1;
