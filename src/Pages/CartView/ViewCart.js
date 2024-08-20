import React, { useEffect, useState } from "react";
import ApiNames from "../../Constants/ApiUrls";
import Axios from "../../Utils/AxiosConfi";
import { useCart } from "../../Context/cartcontext";

const ViewCart = () => {

  const {addToCart} = useCart()
  const [cartitem, setCartitem] = useState([]);
  const [sellprice, setSellprice] = useState(0);
  const [taxprice, setTaxprice] = useState(0);
  const [shippingcost,setShippingcost] = useState(0);
  const [discountcost,setDiscountcost] = useState(0);
  const [grandtotal,setGrandtotal] = useState(0);
  useEffect(() => {
    fetchcartItem();
  }, []);
  const fetchcartItem = async () => {
    try {
      const url = ApiNames.user_getWishListCount;
      const response = await Axios.get(url);
      setCartitem(response.data.cartItemDetails);
      setSellprice(response.data.totalSellingPrice);
      setTaxprice(response.data.totalTaxPrice);
      setShippingcost(response.data.shippingCharges);
      setDiscountcost(response.data.discount);
      setGrandtotal(response.data.grandTotal)
      console.log("cart products", response.data);
    } catch (error) {}
  };
  const handlequantitychange = async (id, type) => {
    // Modify the cart
    let responce = await addToCart(id, type);
    fetchcartItem()
  };
 

  return (
    <div className="shipping-address">
      <div className="container ">
        <p className="HomeNavigation">
          <span className="navTOnext"> Home</span> /{" "}
          <span className="navTOnext">View cart</span>
        </p>
        <p className="HomeNavigation">There are X products in your cart</p>
        <div className="row">
          <div className="col-md-8">
            <div className="purchase-address">
              {/* Example cart item */}
              <div className="andriod-folding">
                {cartitem.map((value, i) => (
                  <div
                    className="row mb-4"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="col-lg-9">
                      <div className="folding-image-line">
                        <div className="image-leftt">
                          <img
                         
                            src={value.productDetails[0]?.thumbnail}
                            className="andriod-img"
                            alt="..."
                          />
                        </div>
                        <div className="andriod-folding-para">
                          <p className="folding-line">
                            {value.productDetails[0]?.title}
                          </p>
                          <p className="folding-cost">{value.productDetails[0]?.marketPrice}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="folding-cost-button">
                        <div className="folding-grid">
                          <div className="row">
                            <div className="col">
                              <button onClick={() =>handlequantitychange(value.productId,0)}><img
                                style={{ width: "20px", height: "20px" }}
                                src="/images/minus.svg"
                                alt="minus-icon"
                              /></button>
                              
                            </div>
                            <div className="col">{value.quantity}</div>
                            <div className="col">
                             
                              <button onClick={() => handlequantitychange(value.productId,1)}><img
                                style={{ width: "20px", height: "20px" }}
                                src="/images/plus.svg"
                                alt="plus-icon"
                              /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                        value.productDetails[0]?.availableStock === 0 && (<p className="outOfStock">Out of stock</p>)
                    }
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="continue-shopping">
              
              <p className="orderSummury">Order Summary</p>
              <div className="cart-totals">
                <div className="subtotal">
                  <p className="subtotal-line">Subtotal</p>
                  <p className="subtotal-cost">AED {sellprice}</p>
                </div>
                <div className="subtotal">
                  <p className="subtotal-line">Tax</p>
                  <p className="subtotal-cost">AED {taxprice}</p>
                </div>
                <div className="subtotal">
                  <p className="subtotal-line">Shipping</p>
                  <p className="subtotal-cost">AED {shippingcost}</p>
                </div>
                <div className="subtotal subtotalLine">
                  <p className="subtotal-line">Coupon discount</p>
                  <p className="subtotal-cost">AED {discountcost}</p>
                </div>
                <div className="subtotal subtotalLineNew">
                  <p className="subtotal-line">Grand Total</p>
                  <p className="subtotal-cost">AED {grandtotal}</p>
                </div>
                <div className="proceed-button">
                  <button className="proceed-checkout-button">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>SimilerProducts Component</div>
        <div>Pbrands Component</div>
      </div>
    </div>
  );
};

export default ViewCart;
