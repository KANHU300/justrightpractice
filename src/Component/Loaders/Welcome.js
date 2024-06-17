import React from 'react'
import Lottie from "lottie-react";
import fileData from "./../../../src/welcome.json";
const Welcome = () => {
  return (
    <div className='loaders'>
       <Lottie  className=" loadderFIle" animationData={fileData} loop={true} />
    </div>
  )
}

export default Welcome