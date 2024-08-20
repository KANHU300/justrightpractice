import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";
import decryptData from "../../Utils/crypto";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../../Context/cartcontext";
import CartOffCanvas from "../CartOfCanvas/CartOffCanvas";
import { useLocation } from "react-router-dom";


function Header() {
  const [getAllCategorys, setAllCategory] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isgetOtp, setIsgetOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [getcountryCode, setCountryCode] = useState("971");
  const [getFlag, setFlag] = useState({
    flag: "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMjExNEYxQzE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMjExNEYxRDE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyMTE0RjFBMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyMTE0RjFCMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VISheQAAAGRJREFUeNpiPCeo9p+BCGDUeYuBmoCJYYDAqMWjFtMMsBCr8H/c/98M7AzMQCYjfX38/QsjVD0jNTDRFv/592eEJS5mZuaBSVyM/LygMv0ftRIX8RYzMrKOFiCjFo9ajA8ABBgAlQMOS8Um6UkAAAAASUVORK5CYII=",
  });
  const [getName, setName] = useState("");
  const [getcountryList, setCountryList] = useState([]);
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartCount, setCartCount] = useState("0");
  const {cartItems,addToWishlist} = useCart();
  const [wishlistCount, setWishlistCount] = useState('0');
  

  
  
  const handleClose = () => setShow(false);

  
    const handleShow = () => setShow(true);


  

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        let url = ApiNames.getAllCategory;
        const response = await Axios.get(`${url}`);
        // let allCatInfo = await decryptData(response.data);
        // let allCatInfo = await(response.data);
        
        setAllCategory(response.data);
        // console.log(allCatInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);

  const sendOtplogin = async () => {
    let sendData = {
      mobile: phone,
      countryCode: getcountryCode,
    };
    try {
      let url = ApiNames.login_Url;
      const response = await Axios.post(url, sendData);
      console.log("login response", response);
      setIsgetOtp(true);
      const userId = response.data._id;
      localStorage.setItem("userId", userId);
      console.log("User ID set in local storage:", userId);
    } catch (error) {
      console.log(error);
    }
  };

  const Otpvrifylogin = async () => {
    let userId = localStorage.getItem("userId");
    console.log("Retrieved User ID from local storage:", userId); // Debug log

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    let sendData = {
      _id: userId,
      otp: otp,
    };

    try {
      let url = ApiNames.login_Verify;
      const response = await Axios.post(url, sendData);
      console.log("Server Response:", response);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true"); // Save login state
        console.log("Token set in local storage:", response.data.token); // Debug log
      }

      handleCloseLogin();
      setLogin(true);
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };
  const logOut = () => {
    localStorage.clear();
    setLogin(false);
    setIsgetOtp(false);
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    sendOtplogin();
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    Otpvrifylogin();
  };
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const handleCloseLogin = () => {
    setShowLogin(false);
    setPhone();
    setIsgetOtp();
  };
  const handleShowLogin = () => {
    setShowLogin(true);
    setIsgetOtp(false); // Reset isgetOtp to false when opening the login modal
  };

  useEffect(() => {
    const getCountriesList = async () => {
      try {
        let api = ApiNames.profile;
        const response = await Axios.get(`${api}`);
        // setUserProfile(response.data)
        setFlag(response.data);
        setPhone(response.data.profile.mobile);
        setCountryCode(response.data?.profile?.countryCode);
      } catch (error) {
        console.log("Error checking login status:", error);
      }
    };
    getCountriesList();
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setLogin(true);
    }
  }, []);

  
  
  useEffect(() => {
    const getCartItemslist = async () => {
      try {
        let url = ApiNames.user_getWishListCount;
        const response = await Axios.get(url);
        
        
        // let desryptioncart = await (response.data );

        // console.log("Decrypted Cart Items", desryptioncart);
        // response.data = desryptioncart
        setCartProduct(response.data.cartItemDetails);
        
        
        setCartCount(response.data.cartCount);
        setWishlistCount(response.data.wishListCount)
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    getCartItemslist();
}, [cartItems,addToWishlist]);

const location = useLocation();
useEffect(() => {
  const handleCustomEvent = () => {
    if (location.pathname === "/viewcart") {
      setShow(false);
    }else(setShow(true))
    
  };
  document.addEventListener('customSideEvent', handleCustomEvent);
  return () => {
    document.removeEventListener('customSideEvent', handleCustomEvent);
  };
}, []);



  return (
    <>
      <div className="header">
        <nav className="navbar navbar-light nvbar-edit">
          <div className="container">
            <div className="nav-menu navlist-top">
              <NavLink className="navbar-brand logo-edit" to="/">
                <img
                  className="logo-edit"
                  src="/images/Justright-logo.svg"
                  alt=""
                />
              </NavLink>
              <div className="navbar-nav mr-auto navUl-edit d-none d-md-block">
                <form className="search-boxTop" role="search">
                  <input
                    className="form-control search-inpBox"
                    type="search"
                    placeholder="What are you shopping for?"
                    aria-label="Search"
                  />
                  <button type="submit" className="search-icon">
                    <img src="/images/search.svg" alt="Search" />
                  </button>
                </form>
              </div>
              <ul className="navbar-nav navmenu-items">
                <li className="nav-item d-md-none">
                  <NavLink className="nav-link menubar-items">
                    <img src="/images/search.svg" className="icooons" alt="" />
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link menubar-items" to="/filter">
                    <span className="Item-texts">Filter</span>
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link menubar-items" to="/wishlist">
                    <img src="/images/heart.svg" className="icooons" alt="" />
                    <span className="Item-texts">Wishlist({wishlistCount})</span>
                    {/* <span className="item-count">{wishlistCount}</span> */}
                  </NavLink>
                </li>
                <li className="nav-item" onClick={handleShow}>
                  <NavLink className="nav-link menubar-items">
                    <img
                      src="/images/bag-2-svgrepo-com.svg"
                      className="icooons"
                      alt=""
                    />
                    <span className="Item-texts">Cart</span>
                    <span className="item-count">{cartCount}</span>
                  </NavLink>
                </li>
                {login ? (
                  <li className="nav-item">
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle login-menu"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="/images/menubar/profile-svgrepo-com.svg"
                          className="icooons"
                          alt=""
                        />
                        Profile
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end login-Ddown">
                        <li>
                          <a className="dropdown-item profile-logout" >
                            <img
                              src="/images/menubar/profile-svgrepo-com.svg"
                              className="icooons"
                              alt=""
                            />
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item profile-logout "
                            alt="..."
                          >
                            <img
                              src="/images/menubar/bag-2-svgrepo-com.svg"
                              className="icooons"
                              alt="..."
                            />
                            My Order
                          </a>
                        </li>
                        <li onClick={logOut}>
                          <a
                            className="dropdown-item profile-logout border-botom"
                            
                            alt="..."
                          >
                            <span className="logout-icon">
                              <i className="fas fa-sign-out-alt"></i>
                            </span>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <a
                      className="nav-link menubar-items"
                      onClick={handleShowLogin}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="/images/profile-svgrepo-com.svg"
                        className="icooons"
                        alt=""
                      />
                      <span className="Item-texts">Login</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="bottom-nav">
        <div className="container">
          <div className="nav-content">
            <div className="category-inside">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle category-btn"
                  type="button"
                  onClick={handleShowCanvas}
                >
                  <img
                    src="/images/menu.svg"
                    className="menu-icon"
                    alt="no-data"
                  />
                  All Categories
                </button>
              </div>
            </div>
            <div className="dealsMenu-top">
              <ul className="bottom-navItems">
                {getAllCategorys.slice(0, 4).map((value, index) => (
                  <NavLink
                  key={index}
                    className="bottm-navItm"
                    to={`/filter/1/${value._id}`}
                  >
                    <li key={index} className="nav-deals">
                      {value?.categoryName}
                    </li>
                  </NavLink>
                ))}
                <li className="nav-deals" onClick={handleShowCanvas}>
                  More
                </li>
              </ul>
              <div className="contactSupport">
                <img
                  style={{ width: "20px", marginRight: "8px" }}
                  src="/images/support.svg"
                  className="icooons"
                  alt=""
                />
                <label className="contacts">+971 042655600</label>
              </div>
            </div>
          </div>
        </div>
        <Offcanvas show={showCanvas} onHide={handleCloseCanvas} backdrop={true}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>All Categories</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              {getAllCategorys.map((category, index) => (
                <li key={index}>{category.categoryName}</li>
              ))}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>{isgetOtp ? "Login" : "Enter OTP"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isgetOtp ? (
            <Form onSubmit={handleOtpSubmit}>
              <Form.Group className="mb-3" controlId="formBasicOtp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="btn register-btn">
                Login
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handlePhoneNumberSubmit}>
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <>
                  {/* Hello world */}
                  <div className=" container register-header">
                    <div className="register-number-header">
                      <label htmlFor="" className="form-label">
                        Phone Number
                      </label>
                      <div className="registration-flag">
                        <div className="registration-number">
                          <div className="dropdown dropdown">
                            <button
                              className="dropdown-toggle dropdown-flag-button"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src={`data:image/png;base64,${getFlag.flag}`}
                                alt=""
                                className="registration-img"
                              />
                              <p className="register-number">
                                +{getcountryCode}
                              </p>
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li className="dropdown-flag-list">
                                <div className="dropdowninsideimage">
                                  <img
                                    src="/images/search-icon.webp"
                                    alt=""
                                    className="registration-img"
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Select Country Name"
                                    id=""
                                    aria-describedby="Numberhelp"
                                  />
                                </div>
                              </li>
                              {/* {getcountryList.map((value, index) => (
                                <li className="dropdown-flag-list" key={index}>
                                  <a className="dropdown-item" >
                                    <img
                                      src={`data:image/png;base64,${value.flag}`}
                                      alt=""
                                      className="registration-image"
                                    />
                                    <span className="flag-span">
                                      {value.name}
                                    </span>
                                  </a>
                                </li>
                              ))} */}

                              {/* Add more list items as needed */}
                            </ul>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control-input"
                          placeholder="Please Enter The Mobie Number"
                          id=""
                          aria-describedby="Numberhelp"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="submit-button">
                      <button type="submit" className="btn register-btn">
                        Send Otp
                      </button>
                    </div>
                  </div>
                </>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* cart items   modal */}
      <CartOffCanvas
        show={show}
        handleClose={handleClose}
        cartProduct={cartProduct}
        cartCount={cartCount}
      />
      
    </>
  );
}

export default Header;
