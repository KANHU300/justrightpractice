import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Axios from '../../Utils/AxiosConfi';
import ApiNames from "../../Constants/ApiUrls";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const swiperRef = useRef(null);
  const [getBanner, setBanner] = useState([]);
  let navigation = useNavigate();

  useEffect(() => {
    // Initialize Swiper
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      // Custom next button functionality
      const handleNextButtonClick = () => {
        swiperInstance.slideNext();
      };

      // Custom prev button functionality
      const handlePrevButtonClick = () => {
        swiperInstance.slidePrev();
      };

      // Attach event listeners to your custom buttons
      const nextButton = document.getElementById('customNextButton');
      const prevButton = document.getElementById('customPrevButton');

      if (nextButton) {
        nextButton.addEventListener('click', handleNextButtonClick);
      }

      if (prevButton) {
        prevButton.addEventListener('click', handlePrevButtonClick);
      }

      // Cleanup event listeners on component unmount
      return () => {
        if (nextButton) {
          nextButton.removeEventListener('click', handleNextButtonClick);
        }

        if (prevButton) {
          prevButton.removeEventListener('click', handlePrevButtonClick);
        }
      };
    }
  }, []);
  const [getItems, setItems] = useState([]);
 
  useEffect(() => {
    const getAllBanner = async () => {
      try {
        let url = ApiNames.getBannerImages
        const response = await Axios.get(
          `${url}`
        );
        let sectionData =[]
        response.data.forEach((value)=>{
          if(value.sectionId === 2){
            sectionData.push(value)
          }
        })
        setBanner(sectionData);
      } catch (error) {
        console.log(error);
      }
    };
   return()=> getAllBanner();
  }, []);

  // function gotoSection(data){
     
  //   if(data.bannerType ==="Product"){
  //     navigation(`/ProductView/${data.categoryId}`)
  //   }else{
  //     navigation(`/Filter/1/${data.categoryId}`)

  //   }
  // }

  return (
    <div className="bottom-Banner">
      <p className="slider-topTitle">In Focus</p>
      <Swiper ref={swiperRef} navigation={false} className="mySwiper">
  {getBanner.map((item, index) => (
    <SwiperSlide key={index}>
      <div className="banner-imageTop">
      {/* <img className="banner-images"  onClick={()=>{gotoSection(item)}} src={item.image} alt="no-imge" /> */}
        <img className="banner-images"   src={item.image} alt="no-imge" />
      </div>
      {/* <button onClick={()=>{gotoSection(item)}} className="shop-btn">Shop Now</button> */}
      <button  className="shop-btn">Shop Now</button>
    </SwiperSlide>
  ))}
</Swiper>

      {/* Custom Navigation Buttons */}
      <button id="customPrevButton">
        <i className="fas fa-angle-left"></i>
      </button>
      <button id="customNextButton">
        <i className="fas fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Slider;
