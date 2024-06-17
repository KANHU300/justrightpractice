import React, { useEffect, useState } from "react";
import Productslidr from "../../Component/ProductSlide/ProductSlider";
import TextTitle from "../../Component/Title/TextTitle";
import CategoryCard from "../../Component/categoryCard/CategoryCard";
import ShpMoreCard from "../../Component/ShopMore/ShpMoreCard";
import MegaDeals from "../../Component/MegaDeals/MegaDeals";
import Slider from "../../Component/Slider/Slider";
import MdBanerTop from "../../Component/Banners/MDBanerTop";
import ProductItems from "../../Component/ProductItems/ProductItems";
import Axios from "../../Utils/AxiosConfi";
import Pbrands from "../../Component/popularBrands/popularBrands"

// import ApiNames from "../../Constants/ApiUrls";
import decryptData from "../../Utils/crypto";
import axios from "axios";
import RecommendedProducts from "../../Component/RecommendedProducts/RecommendedProducts";
import ApiNames from "../../Constants/ApiUrls";
import Welcome from "../../Component/Loaders/Welcome";

const Landing = () => {
  
  const [newArrival, setNewArrival] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // new arrival product items logic/////
const [getIsLoader, SetIsLoader] = useState(true);
  useEffect(() => {
    const getNewArivals = async () => {
      try {
        // let api = ApiNames.Product_Newarrivels
        const response = await axios.get(
          "https://testshopapi.justrightinc.com/v1/users/getNewArraivals"
        );

        let decryp = await decryptData(response.data.data);
        // setTimeout(()=>{
        //   SetIsLoader(false)
        // },500)

        setNewArrival(decryp);
        console.log(decryp);
      } catch (error) {
        console.log(error);
      }
    };
    getNewArivals();
  }, []);

  // blog data logics below ////
  useEffect(() => {
    const getBlogs = async () => {
      let url = ApiNames.getBlogs;
      const response = await Axios.get(`${url}`);
      let decrptBlog = await decryptData(response.data?.data);
      setBlogsData(decrptBlog);
      SetIsLoader(false)
      console.log(decrptBlog);
    };
    getBlogs();
  }, []);
  return (<>
  {
    getIsLoader ? (<div>
      <Welcome />
    </div>):( <div className="landingPage-data">
      <div className="container">
        <Productslidr />
      </div>
      <div className="categoris-section mt-4">
        <div className="container">
          <CategoryCard />
          <div className="sectionsCard">
            <div className="row g-3">
              <div className="col-md-6">
                <ShpMoreCard />
              </div>
              <div className="col-md-6">
                <MegaDeals />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <Slider />
          </div>
        </div>
      </div>
      <div className="container">
        <TextTitle
          text="New Arrivals"
          className="textSub-title textSub-title1"
        />
        <ProductItems productObj={newArrival} />
      </div>
      <div className="container">
        <MdBanerTop />
        <RecommendedProducts />
      </div>
      <div className="container">
        <div className="reward-box-top">
          <p className="reward-title">Reward</p>
          <p className="reward-text">
            Elevate your business with top-quality signage, advertising, and LED
            solutions from Just Right. As the leading one-stop-shop for all your
            needs, we have over 20 distribution centers and warehouses across
            the GCC region, including the UAE, Saudi Arabia, Oman, Kuwait,
            Qatar, and Bahrain. Whether you’re in construction, fabrication,
            interior design, or exhibitions, we offer the right products and
            services to help you stay ahead of the competition.
          </p>
        </div>
        <div className="blog-top">
          <h3 className="Blog-title">Blog</h3>
          <p className="blog-subtitle">Stay informed with engaging articles</p>

          <div className="row">
            {blogsData.slice(0, 4).map((products, index) => (
              <div key={index} className="col-md-3">
                <div className="card blog-card">
                  <img
                    src={products?.image}
                    className="card-img-top blog-image"
                    alt="..."
                  />
                  <div className="card-body blog-body">
                    <p className="card-text blog-text">
                      {products?.title.slice(0, 60)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pbrands />
    </div>)
  }
   
    </>
  );
};

export default Landing;
