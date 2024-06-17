import React from "react";
import { useNavigate } from "react-router-dom";

const MobileBanner = (props) => {
    
  let navigation = useNavigate();
  function gotoFliter(props){
      
    navigation(`/Filter/1/${props.id}`)
  }


  return (
    // <div className="MobileBanners-top">
    <div onClick={()=>gotoFliter(props)} className="MobileBanners-top">
      <div className="banner-text">
       
        <p className="text-edit">{props.name}</p>
      </div>
      <div className="bannerImgg-top">
      <img
        src={props.image}
        alt="..."
        className="banner-insideImge"
      /></div>
    </div>
    // </div>
  );
};

export default MobileBanner;
