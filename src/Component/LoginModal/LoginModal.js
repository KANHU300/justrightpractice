import React from 'react'
import { Modal } from 'react-bootstrap'
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";
import decryptData from "../../Utils/crypto";

const LoginModal = ({showLogin,handleCloseLogin, setLogin, setName}) => {
    const [getcountryCode, setCountryCode] = useState("971");
    const [isgetOtp, setIsgetOtp] = useState(false);

    const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
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


  return (
    <>
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
                              {getcountryList.map((value, index) => (
                                <li className="dropdown-flag-list" key={index}>
                                  <a className="dropdown-item" href="#">
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
                              ))}

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
    </>
  )
}

export default LoginModal