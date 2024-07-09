import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import "swiper/css";

import ReactImageMagnify from "react-image-magnify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";
import Pbrands from "../../Component/popularBrands/popularBrands";
import SimilerProducts from "../../Component/SimilerProducts/SimilerProducts";
import Welcome from "../../Component/Loaders/Welcome";
import { useCart } from "../../Context/cartcontext";

const ProductView = () => {
  const { productId } = useParams();
  const [getProduct, setProduct] = useState([]);
  const [getproductImages, setproductImages] = useState([]);
  const [getThumbnail, setThumbnail] = useState("");
  const [getattributes, setattributes] = useState([]);
  const [getOtherProducts, setOtherProducts] = useState([]);
  const [getTwoCategoris, setTwoCategories] = useState([]);
  const [getDec, setDec] = useState([]);
 const [loader,setLoader] = useState(true)
  const [quantity, setQuantity] = useState(1);


  const {addToCart} = useCart();
  
  const handleAddtoCart = () =>{
    const id = 'productId';
    const type = 'product_type';
    addToCart(id,type)

  }

  useEffect(() => {
    // Fetch the product details using the productId
    // This is just an example, replace it with your actual data fetching logic
    const fetchProduct = async () => {
      try {
        let url = ApiNames.getProductById;
        const response = await Axios.get(`${url}${productId}`);

        setProduct(response.data.productDetails);
        setproductImages(response.data.productImages);
        setThumbnail(response?.data?.productDetails.thumbnail);
        setattributes(response.data?.productDetails?.attributes);
        
        setDec(response?.data?.productDetails?.descriptionList)
        setLoader(false)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [productId]);
  async function handleCarouselImageClickFUn(data) {
    console.log(data.image);

    setThumbnail(data.image);
  }

  // if (!product) {
  //   return <div>Loading...</div>;
  // }
  
    async function getTwoCategories() {
      let api = ApiNames.getShowCategory
  
      try {
        const response = await Axios.get(`${api}`);
  
        setTwoCategories(response.data.slice(0, 2))
      } catch (error) {
        console.log(error)
      }
     
    };
    // getTwoCategories();

    const increment = () => {
      if (getProduct && quantity < getProduct.availableStock) {
        setQuantity(prevQuantity => prevQuantity + 1);
      }
    };
  
    const decrement = () => {
      if (quantity > 1) {
        setQuantity(prevQuantity => prevQuantity - 1);
      }
    };

  return (
    <>
      <div>
        {
          loader ?(<div>
            <Welcome />
          </div>):( <div className="container">
            <div className="about-item">
              <label className="Brodcal">
                Home / <span className="productName">{getProduct.title}</span>
              </label>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <div className="about-item-image">
                  <div className="top-image-item">
                    <div style={{ borderRadius: "10px" }}>
                      <div style={{ borderRadius: "10px" }}>
                        <div style={{ borderRadius: "10px" }}>
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Products View",
                                isFluidWidth: true,
                                src: getThumbnail,
                                className: "inside-thumbimage",
                                style: {
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                },
                              },
                              largeImage: {
                                src: getThumbnail,
                                width: 1200,
                                height: 1800,
                                style: { borderRadius: "10px" },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="about-ietm-carosual">
                  <Swiper
                    className="mySwiper swiper-top"
                    navigation={true}
                    modules={[Navigation]}
                    slidesPerView={3}
                    spaceBetween={20}
                  >
                    {getproductImages.map((imageUrl, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className="imageSlide-top"
                          onClick={() => handleCarouselImageClickFUn(imageUrl)}
                        >
                          <img
                            className="imagesBottm"
                            src={imageUrl.image}
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
  
                    {/* Add similar onClick handlers for other carousel images */}
                  </Swiper>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="about-details">
                  <p className="item-para">{getProduct.title}</p>
                  <div className="cost-details">
                    <p className="cost-offer">
                      {/* <del>  {getProduct.marketPrice} AED</del>{" "} */}
                      <p className="marketPrice">
                        <span className="disocunt">-{getProduct.discount}%</span>
                        {getProduct.sellingPrice} AED
                      </p>
                      <p className="sellingPrice">
                        M.R.P :
                        <span className="selingstrikg">
                          {getProduct.marketPrice} AED
                        </span>
                      </p>
                    </p>
                  </div>
                  <p className="inclusiveline">Inclusive of VAT</p>
                  {/* <p className="termsPrice">(As Per Terms Price: {getProduct.sellingPrice})</p> */}
                  {/* <p className="notePrice">Note: Price may vary according to the payment mode.</p> */}
  
                  {getProduct.availableStock > 0 ? (
                    <>
                      <div className="quantity-details">
                        <p className="quantity-para">Quantity</p>
                        <div className="quantity-increase">
                          <div className="row">
                            <div className="col quantity-plus" onClick={decrement}>
                              <img
                                className="subtraction"
                                src="/images/LandingPg/subtractt.png"
                                alt="..."
                              />
                            </div>
                            <div className="col quantity-plus">
                              <input
                                className="quantityENter"
                                type="tel"
                                value={quantity}
                                maxLength={4}
                                
                              />
                            </div>
                            <div className="col quantity-plus" onClick={increment}>
                              <img
                                className="addition"
                                src="/images/LandingPg/addplus.png"
                                alt="..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="add-to-cart-buttons">
                        <button className="addcartbutton" onClick={handleAddtoCart}>Add to Cart</button>
                        <button className="buyitnowbutton">Buy it Now</button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="quantity-details">
                        <p className="quantity-para">Quantity</p>
                        <div className="quantity-increase">
                          <div className="row">
                            <div className="col quantity-plus" onClick={decrement}>
                              <img
                                className="subtraction"
                                src="/images/LandingPg/subtractt.png"
                                alt="..."
                              />
                            </div>
                            <div className="col quantity-plus">
                              <input
                                className="quantityENter"
                                type="tel"
                                maxLength={4}
                                value={quantity}
                              />
                            </div>
                            <div className="col quantity-plus" onClick={increment}>
                              <img
                                className="addition"
                                src="/images/LandingPg/addplus.png"
                                alt="..."
                              />
                            </div>
                          </div>
                        </div>
                        <p className="notAvailale">Products not available</p>
                      </div>
                      <div className="add-to-cart-buttons">
                        <button className="addcartbuttonD">Add to Cart</button>
                        <button className="buyitnowbuttonD">Buy it Now</button>
                      </div>
                    </div>
                  )}
  
                  <div className="rating-stars">
                    <span className="stars-inside">
                      <span>
                        {getProduct?.ReviewRating >= 1 ? (
                          <span>&#9733;</span>
                        ) : (
                          <span>&#9734;</span>
                        )}
                      </span>
                      <span>
                        {getProduct?.ReviewRating >= 2 ? (
                          <span>&#9733;</span>
                        ) : (
                          <span>&#9734;</span>
                        )}
                      </span>
                      <span>
                        {getProduct?.ReviewRating >= 3 ? (
                          <span>&#9733;</span>
                        ) : (
                          <span>&#9734;</span>
                        )}
                      </span>
                      <span>
                        {getProduct?.ReviewRating >= 4 ? (
                          <span>&#9733;</span>
                        ) : (
                          <span>&#9734;</span>
                        )}
                      </span>
                      <span>
                        {getProduct?.ReviewRating >= 5 ? (
                          <span>&#9733;</span>
                        ) : (
                          <span>&#9734;</span>
                        )}
                      </span>
                    </span>
                    <div>
                      <p className="write-review">Write Review</p>
                    </div>
                  </div>
                  <p className="costumer-review">
                    {getProduct?.totalReviews} Customer Review
                  </p>
  
                  <p className="Specifications">Specifications</p>
                  <div className="propertis">
                    {getattributes.slice(0, 6).map(
                      (element, index) =>
                        getattributes.length > 0 && (
                          <ul key={index} className="propertiesList">
                            <li>
                              <p className="propertyKey"> {element.key} :</p>
                            </li>
                            <li>
                              <p className="propertyKey"> {element.attribute}</p>
                            </li>
                          </ul>
                        )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="deliveryInfo">
                  <div className="deliveryTime">
                    <ul className="deliveryStatus">
                      <li>
                        <img
                          src="/images/LandingPg/deliveryTrack.svg"
                          className=" deliveryIcon"
                        />
                      </li>
                      <li className="contentDelivey">
                        <p className="ExpText">Expected Delivery</p>
                        <p className="ExpText2">
                          Order now, get in 3 hours. Log in to see exact delivery
                          time slot.
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="otherProducts">
                    <p className="otherTxt">
                      {getProduct?.categoryName} - Other Products
                    </p>
                    {getOtherProducts.map((value, index) => (
                      <div key={index} className="itemsList">
                        <ul className="itemsSwich">
                          <li>
                            <img
                              src={value?.thumbnail}
                              className=" deliveryImg"
                            />
                          </li>
                          <li>
                            <p className="prodctTxt">{value.title}</p>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div>
                    <ul className="catImgs">
                      {getTwoCategoris.map((value, index) => (
                        <li key={index} className="itemsGroup">
                          <p className="cateTxts">
                            {value?.firstDetail?.categoryName}
                          </p>
                          <img
                            src={value?.firstDetail?.thumbnail}
                            className="caytogryImgs"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
  
            <>
                <ul className="nav nav-pills productdetails-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item productdetails-li" role="presentation">
                    <button
                      className="nav-link productdetails-btn active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Additional Info
                    </button>
                  </li>
                  <li className="nav-item productdetails-li" role="presentation">
                    <button
                      className="nav-link productdetails-btn"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item productdetails-li" role="presentation">
                    <button
                      className="nav-link productdetails-btn"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      How to Use
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
  
                    <div className="row">
                      <div className="col-md-8">
  
                        <div className="technical-details-table">
                          <table className="table table-bordered">
                            <tbody>
                              {getattributes.map((element, index) => (
                                getattributes.length > 0 && (
                                  <tr key={index} className="table-technical-row">
                                    <td className="table-technical-data" scope="row">
                                      <p className="keyPoints"> {element.key}</p>
                                    </td>
                                    <td className="table-technical-mobile">{element.attribute}</td>
                                  </tr>
                                )
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
  
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div className="technical-details">
                     
                      <ul className="itemlist" >
                        {Array.isArray(getDec) && getDec.map((element, index) => (
                          <li key={index} className="listitemsparas">
                            {element?.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    How to Use coming soon !
                  </div>
                </div>
  
  
                <SimilerProducts/>
  
                <div className="bannerInnerPage">
                  <div className="bannerInside">
                    <img className="bannerIn" src="/images/LandingPg/insideBanner.png" />
                  </div>
                  <div className="pBrandings" >
                    <Pbrands />
                  </div>
  
                </div>
  
              </>
          </div>)
        }
       
      </div>
    </>
  );
};

export default ProductView;
