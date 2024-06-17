import React from 'react'
import { useNavigate } from 'react-router-dom';

const BiggerBanner = (props) => {
    
  let navigation = useNavigate();
  function gotoFliter(props){
    navigation(`/Filter/1/${props.id}`)
  }
  return (
    <div onClick={()=>gotoFliter(props)} className="big-banner">
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
  )
}

export default BiggerBanner