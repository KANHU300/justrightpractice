import React from "react";
import { useEffect, useState } from "react";

import TextTitle from "../Title/TextTitle";
import { useNavigate } from "react-router-dom";
import Axios from '../../Utils/AxiosConfi';
import ApiNames from "../../Constants/ApiUrls";

const MdBanerTop = () => {
  let navigation = useNavigate();
  const [getItems, setItems] = useState([]);
  const [titleFour, setTitleFOur] = useState([]);

  useEffect(() => {
    const getMoreReason = async () => {
      try {
        let api = ApiNames.getTitles
        const response = await Axios.get(
          `${api}`
        );
        response.data.forEach((element) => {
          if(element.index ==='4'){
            setTitleFOur(element.title)
          }

      });

      } catch (error) {
        console.log(error);
      }
    };
    return() =>   getMoreReason();
  }, []);
  useEffect(() => {
    const getDiscountedProduct = async () => {
      let url = ApiNames.getSelectedCollectionTwo
      try {
        const response = await Axios.get(
          `${url}`
        );
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
   return()=> getDiscountedProduct();
  }, []);

  function gotoFliter(data){
    navigation(`/Filter/4/${data?.firstCollectionDetail?._id}`)
  }
  return (
    <div className="mega-deals-top">
      {/* <TextTitle text=  /> */}
      <p className="text-titleNew">{titleFour}</p>
    <div className="row g-3 ">
      {getItems.slice(0, 6).map((item) => (
        <div onClick={()=>gotoFliter(item)} className="col-md-4" key={item._id}>
          <div className="Mdeal-BnrTop">
            <img
              className="mdeal-image"
              src={item?.firstCollectionDetail?.image}
              alt={item?.firstCollectionDetail?.dealTitle}
            />
            <button className="shopButtons">Shop now</button>
          </div>
        </div>
      ))}
    </div>
    {/* <div className="row g-3">
      {getItems.map((item) => (
        <div onClick={()=>gotoFliter(item)} className="col-md-3 col-6" key={item._id}>
          <div className="Mdeal-BnrBtm">
            <img
              className="mdeal-bottomImage"
              src={item.dealImageSmall}
              alt={item.dealTitle}
            />
          </div>
       
        </div>
      ))}
    </div> */}
  </div>
  
  );
};

export default MdBanerTop;
