// CartOffcanvas.js
import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useCart } from "../../Context/cartcontext";
import {  useNavigate } from "react-router-dom";

const CartOffCanvas = ({ show, handleClose, cartProduct, cartCount }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const removeCartItem = (id) => {
    const type = -1;
    console.log("remove from cart:", { id, type });
    addToCart(id, type);
  };
  const handleviewCart = () =>{
    handleClose()
    navigate("/viewcart")
  }

  return (
    <Offcanvas
      className="cart-offcanvas"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CartItems {cartCount}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="cart-Itemlists">
          <div className="cart-lists-body">
            <p className="total-prices">
              Items <span className="ms-auto">Total: AED</span>
            </p>
            <ul className="list-unstyled">
              {cartProduct.map((item, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "10px" }}
                  className="items-below"
                >
                  <ul className="list-unstyled d-flex w-100">
                    <li>
                      <div className="Itemimage-left">
                        <img
                          className="cart-item-imag"
                          src={item?.productDetails[0]?.thumbnail}
                          alt="..."
                        />
                      </div>
                    </li>
                    <li className="w-100">
                      <div className="rightItem-content">
                        <h1 className="cart-ItemTitle">
                          {item.productDetails[0]?.title}
                        </h1>
                        <p className="price">Price</p>
                        <p className="Cartiteem-price">
                          {item.productPrice} AED
                        </p>
                        <div className="remove-increment ">
                          <div className="left-increment">
                            <button
                              className="addSubtract-btn"
                              onClick={() => addToCart(item.productId, 0)}
                            >
                              <span>
                                <img
                                  src="/images/LandingPg/minuss.svg"
                                  className="minusIcons"
                                />
                              </span>
                            </button>
                            <div className="numer-of">{item.quantity}</div>
                            <button
                              className="addSubtract-btn"
                              onClick={() => addToCart(item.productId, 1)}
                            >
                              <span>
                                <img
                                  src="/images/LandingPg/pluss.svg"
                                  className="PlusIcons"
                                />
                              </span>
                            </button>
                          </div>
                          <div className="right-remove">
                            <button
                              onClick={() => removeCartItem(item.productId)}
                              className="rmove-btn"
                            >
                              <img
                                src="/images/LandingPg/deleteIcons.svg"
                                className="IconsImgsDelete"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
            <div className="buttonsCart">
              {cartProduct.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#02adc7",
                    fontFamily: "Sf-M",
                  }}
                >
                  Cart is empty!
                </p>
              ) : (
                
                <button
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  className="viewCrt-btn"
                  onClick={  handleviewCart}
                >
                  View Cart
                </button>
                
              )}
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffCanvas;
