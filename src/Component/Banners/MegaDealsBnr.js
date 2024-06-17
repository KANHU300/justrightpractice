import React, { useEffect } from "react";
import TextTitle from "../Title/TextTitle";

const MegaDealsBnr = (props) => {
  useEffect(() => {
  });
  return (
  

<div className="mega-deals-top">
<TextTitle text="Mega Deals " className="" />
<div className="row g-md-3 mb-2 mb-md-3">
{props.productObj.slice(0, 2).map((item) => (
  <div className="col-6" key={item._id}>
    <div className="Mdeal-BnrTop">
      <img
        className="mdeal-image"
        src={item.dealImageBig}
        alt={item.dealTitle}
      />
    </div>
  </div>
))}
</div>
<div className="row g-2 g-md-3">
{props.productObj.map((item) => (
  <div className="col-md-3 col-6" key={item._id}>
    <div className="Mdeal-BnrBtm">
      <img
        className="mdeal-bottomImage"
        src={item.dealImageSmall}
        alt={item.dealTitle}
      />
    </div>
  </div>
))}
</div>
</div>
  );
};

export default MegaDealsBnr;
