

// import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

// import { useEffect, useState } from "react";
// import ApiNames from "../../Constants/ApiUrls";
// import Axios from "../../Utils/AxiosConfi";

const ProductItems = (props) => {
  


  return (
    <>
   
       <div className="row row-cols-2  row-cols-md-4 row-cols-lg-5 g-3">
       {props.productObj.slice(0,5).map((products, index) => (
          <div key={index} className="col">
            <div className="card product-card">
              <div className="card-top">
                <NavLink to={`/ProductView/${products?._id}`}>
                <div className="productImg-top"  >
                  <img 
                    src={products.thumbnail}
                    className="card-img-top product-cardImage"
                    alt="..."
                  />
                </div>
                </NavLink>
                
                <div>
                  {
                    products.isWishlist ? (
                      <img 
                        src="/images/menubar/wishFill.svg"
                        alt=".."
                        className="wishlist-icon"
                      />
                    ) : (
                      <img 
                        src="/images/menubar/wishUnFill.svg"
                        alt=".."
                        className="wishlist-icon"
                      />
                    )
                  }
 
 
                </div>
              </div>
              <div className="card-body product-body">
                <p  className="card-title item-title">{products.title}</p>
                <div className="item-review">
                  <span className="starss">
                    &#9734;&#9734;&#9734;&#9734;&#9734;
                  </span>
                  <span className="custemer-rivew"> 400</span>
                </div>
                <p className="item-price">
                  AED <span>{products.sellingPrice}</span>
                </p>
                <button className="btn add-cart">
                  <img
                    src="/images/LandingPg/bagIcn.png"
                    alt=".."
                    className="bag-icon"
                  />
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
 
      </div>
    </>
  );
};

export default ProductItems;
