// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import Axios from "../../Utils/AxiosConfi";
// // import required modules
// import { Navigation } from "swiper/modules";
// import ApiNames from "../../Constants/ApiUrls";
// // import { useNavigate } from "react-router-dom";
// import decryptData from "../../Utils/crypto";

// const Productslidr = () => {
//   const [getBanner, setBanner] = useState([]);
//   useEffect(() => {
//     const getBannerImages = async () => {
//       try {
//         let url = ApiNames.getBannerImages;
//         const response = await Axios.get(`${url}`);
//         let bannerdata = await decryptData(response.data);
//         setBanner(bannerdata);
//         console.log("response:", bannerdata);
//       } catch (error) {
//         console.log(error)
//       }
//     };
//     getBannerImages();
//   },[]);

//   return (
//     <div className="top-Banner">
//       <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
//         {getBanner.map((banner) => (
//           <SwiperSlide key={banner._id}>
//             <div className="banner-imageTop">
//               <img
//                 //   onClick={()=>{gotoSection(banner)}}
//                 className="banner-images"
//                 src={banner.image}
//                 alt="no-imge"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Productslidr;
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Axios from "../../Utils/AxiosConfi";
// import required modules
import { Navigation } from "swiper/modules";
import ApiNames from "../../Constants/ApiUrls";
// import { useNavigate } from "react-router-dom";
// import decryptData from "../../Utils/crypto";

const Productslidr = () => {
  const [getBanner, setBanner] = useState([]);

  useEffect(() => {
    const getBannerImages = async () => {
      try {
        let url = ApiNames.getBannerImages;
        const response = await Axios.get(`${url}`);

        // console.log("Raw response data:", response);

        let bannerdata = await (response.data);
        
        // console.log("Decrypted data:", bannerdata);

        setBanner(bannerdata);
      } catch (error) {
        console.log("Error fetching banner images:", error);
      }
    };

    getBannerImages();
  }, []);

  return (
    <div className="top-Banner">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {getBanner.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="banner-imageTop">
              <img
                //   onClick={()=>{gotoSection(banner)}}
                className="banner-images"
                src={banner.image}
                alt="no-imge"
              />
            </div>
          
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Productslidr;

