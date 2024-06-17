import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from '../../Utils/AxiosConfi';
import ApiNames from "../../Constants/ApiUrls";
const CategoryCard = () => {
  const [getCategory, setCategory] = useState([]);
  // const [getId, setId] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        let url = ApiNames.getShowCategory
        const response = await Axios.get(
          `${url}`
        );
        setCategory(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
  return()=>  getAllCategory();
  }, []);

  function handleItemClick(productId) {
    navigate(`/Filter/1/${productId}`)
  };
  return (
    <ul className="list-unstyled category-itemTop">

      
      {getCategory.map((product) => (
        <li className="categorycard-list" key={product._id}>
          <div onClick={() => handleItemClick(product?.firstDetail?._id)} className="cards-top">

            <div className="Cimg-top">
              <div className="banner-text">
                <p className="text-edit">{product?.firstDetail?.categoryName}</p>
              </div>
              <img
                src={product?.firstDetail?.thumbnail}
                alt=""
                className="banner-insideImge"
              />
            </div>
          </div>
        </li>
      ))}
        
    </ul>
  );
};

export default CategoryCard;
