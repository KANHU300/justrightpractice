import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";
import decryptData from "../../Utils/crypto";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const [getAllCategorys, setAllCategory] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        let url = ApiNames.getAllCategory;
        const response = await Axios.get(`${url}`);
        let allCatInfo = await decryptData(response.data);
        setAllCategory(allCatInfo);
        console.log(allCatInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <>
      <div className="header">
        <nav className="navbar navbar-light nvbar-edit">
          <div className="container">
            <div className="nav-menu navlist-top">
              <NavLink className="navbar-brand logo-edit" to="/">
                <img className="logo-edit" src="/images/Justright-logo.svg" alt="" />
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
                <li className="nav-item">
                  <NavLink className="nav-link menubar-items" to="/filterPage">
                    <span className="Item-texts">Filter</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link menubar-items" to="/wishlist">
                    <img src="/images/heart.svg" className="icooons" alt="" />
                    <span className="Item-texts">Wishlist</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link menubar-items">
                    <img src="/images/bag-2-svgrepo-com.svg" className="icooons" alt="" />
                    <span className="Item-texts">Cart</span>
                    <span className="item-count">0</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link menubar-items" onClick={handleShowLogin} style={{ cursor: 'pointer' }}>
                    <img src="/images/profile-svgrepo-com.svg" className="icooons" alt="" />
                    <span className="Item-texts">Login</span>
                  </a>
                </li>
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
                {getAllCategorys.slice(0, 6).map((value, index) => (
                  <li key={index} className="nav-deals">{value?.categoryName}</li>
                ))}
                <li className="nav-deals" onClick={handleShowCanvas}>More</li>
              </ul>
              <div className="contactSupport">
                <img style={{ width: '20px', marginRight: '8px' }}
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
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
