import { Swiper, SwiperSlide } from "swiper/react";
import { SetStateAction, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./carousel.module.css";

import Mother from "../assets/images/mother.png";
import PHM from "../assets/images/phm.png";
import MOH from "../assets/images/moh.png";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper: {
    activeIndex: SetStateAction<number>;
  }) => {
    setActiveSlide(swiper.activeIndex);
    // Here you can add code to navigate to a different page based on the active index
  };
  console.log(activeSlide);
  return (
    <>
      <div className="carouselContainer">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={false}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide className="slide ">
            <div className="border-pink-500 border-2 rounded-3xl bg-[#FBD0E0]">
              <img className="my-10" src={Mother} alt="Mother" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <div className="border-pink-500 border-2 rounded-3xl bg-[#FBD0E0]">
              <img className="my-10" src={PHM} alt="Mother" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <div className="border-pink-500 border-2 rounded-3xl bg-[#FBD0E0]">
              <img className="my-10" src={MOH} alt="Mother" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
