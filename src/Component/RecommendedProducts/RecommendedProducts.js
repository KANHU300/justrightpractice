
import { useEffect, useState } from "react";
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";
import { useCart } from "../../Context/cartcontext";
import ProductItems from "../ProductItems/ProductItems";

import decryptData from "../../Utils/crypto";

const RecommendedProducts = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recomendedId, setRecomendedId] = useState(0);
  const {  updateCart } = useCart();

  const getRecommended = async (recomendedId) => {
    try {
      const url = `${ApiNames.getrecommendedProducts}${recomendedId}`;
      const response = await Axios.get(url);
      let decrptinfo = await decryptData(response.data?.data);
      setRecommendedProducts(decrptinfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecommended(recomendedId);
  }, [recomendedId,  updateCart, ]);

  return (
    <>
      <p className="text-title recomentdedForYou">Recommended for You</p>

      <ul
        className="nav nav-tabs recomendedpills-data"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item recomendedpills-li" role="presentation">
          <button
            className="nav-link recomendedpills-btn active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            onClick={() => setRecomendedId(0)}
          >
            Top Selling Products
          </button>
        </li>
        <li className="nav-item recomendedpills-li" role="presentation">
          <button
            className="nav-link recomendedpills-btn"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            onClick={() => setRecomendedId(1)}
          >
            Trending Products
          </button>
        </li>
        <li className="nav-item recomendedpills-li" role="presentation">
          <button
            className="nav-link recomendedpills-btn"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
            onClick={() => setRecomendedId(2)}
          >
            Featured Products
          </button>
        </li>
        <li className="nav-item recomendedpills-li" role="presentation">
          <button
            className="nav-link recomendedpills-btn"
            id="contact1-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact1"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
            onClick={() => setRecomendedId(3)}
          >
            Top Rated Products
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="row g-3">
            <ProductItems productObj={recommendedProducts} limit={5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedProducts;

