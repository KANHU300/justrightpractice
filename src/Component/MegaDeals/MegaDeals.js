import React, { useState, useEffect } from "react";

import Text2Title from "../Title/Text2Title";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";

const MegaDeals = () => {
  // let navigation = useNavigate();
  const [getItems, setItems] = useState([]);
  const [titleThree, setTitleThree] = useState("");

  useEffect(() => {
    const getAllCartProduct = async () => {
      try {
        let url = ApiNames.getShowProducts;
        const response = await Axios.get(`${url}`);

        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    return () => getAllCartProduct();
  }, []);

  // function addToCarts(id){
  //   navigation(`/ProductView/${id}`)
  // }

  useEffect(() => {
    const getMoreReason = async () => {
      try {
        let api = ApiNames.getTitles;
        const response = await Axios.get(`${api}`);
        response.data.forEach((element) => {
          if (element.index === "3") {
            setTitleThree(element.title);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    return () => getMoreReason();
  }, []);

  return (
    <div className="MegaDeals-cards">
      <Text2Title text={titleThree} />
      <div className="row g-3">
        {getItems.map((products, index) => (
          <div key={index} className="col-lg-6">
            {/* <div onClick={()=>addToCarts(products?.firstDetail?._id)} className="card MegaDeals-top"> */}
            <NavLink to={`ProductView/${products?.productId}`}>
            <div className="card MegaDeals-top">
              <span className="card-topLeft-text">
                {products?.firstDetail?.categoryName}
              </span>
              <div className="row g-0">
                <div className="col-5">
                  <div className="deals-topimage">
                    <img
                      src={products?.firstDetail?.thumbnail}
                      className="img-fluid rounded-start deals-image"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col-7">
                  <div className="card-body card-right">
                    <h5 className="card-title">
                      {products?.firstDetail?.title}
                    </h5>
                    <p className="card-text-priceTwo">
                      AED <span>{products?.firstDetail?.marketPrice}</span>
                    </p>
                    <p className="card-text-price">
                      AED <span>{products?.firstDetail?.sellingPrice}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaDeals;
