
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../Context/cartcontext";


const ProductItems = ({ productObj  }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart,addToWishlist } = useCart();
  

  const handleAddtoCart = (productId) => {
    const id = productId;
    const type = 1; 
    const qty = quantity;
    addToCart(id, type, qty);
  };

  const handleWishlist = (product) =>{
    addToWishlist(product)
    
  }
  
  return (
    <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-3">
      {productObj.slice(0, 5).map((product, index) => (
        <div key={index} className="col">
          <div className="card product-card">
            <div className="card-top">
              <NavLink to={`/ProductView/${product?._id}`}>
                <div className="productImg-top">
                  <img
                    src={product.thumbnail}
                    className="card-img-top product-cardImage"
                    alt={product.title || "Product Image"}
                  />
                </div>
              </NavLink>

              <div>
                {product.isWishlist ? (
                   <button onClick={()  => handleWishlist(product)}>
                   <img
                     src="/images/menubar/wishFill.svg"
                     alt=".."
                     className="wishlist-icon"
                   />
                 </button>
                  
                  
                ) : (
                  <button onClick={() => handleWishlist(product)}>
                  <img
                    src="/images/menubar/wishUnFill.svg"
                    alt=".."
                    className="wishlist-icon"
                  />
                </button>
                 

                 
                )}
              </div>
            </div>
            <div className="card-body product-body">
              <p className="card-title item-title">{product.title}</p>
              <div className="item-review">
                <span className="starss">
                  &#9734;&#9734;&#9734;&#9734;&#9734;
                </span>
                <span className="custemer-rivew"> 400</span>
              </div>
              <p className="item-price">
                AED <span>{product.sellingPrice}</span>
              </p>
              <button
                className="btn add-cart"
                onClick={() => handleAddtoCart(product?._id)}
              >
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
  );
};

export default ProductItems;

