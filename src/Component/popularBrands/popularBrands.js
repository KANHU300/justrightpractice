import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Pbrands = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div>
      <div className="brand-images-below">
        <div className="container">
        

          <div className="bottom-cards">
          <div className="shippingCard-top">
              <div className="star-top">
                <img
                  className="star-icons"
                  src="/images/iconsImages/priceTag.svg"
                  alt=".."
                />
              </div>

              <p className="Free-delivery">Best Prices & Offers</p>
              <p className="For-above">Buy Your Desired Products</p>
            </div>
            <div className="shippingCard-top">
              <div className="star-top">
                <img
                  className="star-icons"
                  src="/images/iconsImages/star.png"
                  alt=".."
                />
              </div>

              <p className="Free-delivery">Free Delivery</p>
              <p className="For-above">For above 100 AED</p>
            </div>
            <div className="shippingCard-top">
              <div className="star-top">
                <img
                  className="star-icons"
                  src="/images/iconsImages/return.png"
                  alt=".."
                />
              </div>

              <p className="Free-delivery">Easy Returns</p>
              <p className="For-above">upto 5 days</p>
            </div>
            <div className="shippingCard-top">
              <div className="star-top">
                <img
                  className="star-icons"
                  src="/images/iconsImages/truck.png"
                  alt=".."
                />
              </div>

              <p className="Free-delivery">Fast Delivery</p>
              <p className="For-above">within 6 Hours</p>
            </div>
            <div className="shippingCard-top">
              <div className="star-top">
                <img
                  className="star-icons"
                  src="/images/iconsImages/tick.png"
                  alt=".."
                />
              </div>

              <p className="Free-delivery">Trusted Products</p>
              <p className="For-above">Original & Safe</p>
            </div>
          </div>
        </div>
        {/* <div className="commited-box-top">
          <div className="container">
            <p className="box-inside-texts">
              At GM Global, we are committed to providing our valued customers
              with a wide range of high-quality yet budget-friendly products.
              Our goal is to supply and deliver the latest exclusive collection
              of products to customers all over the UAE and around the world. We
              take pride in offering affordable products for most categories
              while also providing excellent customer service and friendly
              support. <br></br> We understand the importance of keeping up with
              the latest trends in all types of products we offer on our
              platform. Our focus is on putting our customers’ wishes first,
              which is why we have satisfied customers all over the UAE and
              around the world.
            </p>
            <div className="social-connect-top">
              <div className="wtsp-email-top">
                <div className="email-box">
                  <div className="left-EmailImgeTop">
                    <img
                      className="email-image"
                      src="/images/LandingPg/home.svg"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="right-emilTexts">
                  <p className="send-us">Send Us Email</p>
                  <p className="email-text">support@gmglobalenterprise.com</p>
                </div>
              </div>

              <div className="wtsp-email-top">
                <div className="email-box">
                  <div className="left-EmailImgeTop wtsp-subimg">
                    <img
                      className="email-image"
                      src="/images/LandingPg/em.svg"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="right-emilTexts">
                  <p className="send-us">WhatsApp Chat</p>
                  <p className="email-text">+971 52 894 3890</p>
                </div>
              </div>

              <div className="wtsp-email-top">
                <div className="email-box">
                  <div className="left-EmailImgeTop homeImg">
                    <img
                      className="email-image"
                      src="/images/LandingPg/wtsp.svg"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="right-emilTexts">
                  <p className="send-us">Store Location</p>
                  <p className="email-text">Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Pbrands;