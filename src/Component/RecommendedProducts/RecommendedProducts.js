import { useEffect, useState } from "react";
import Axios from '../../Utils/AxiosConfi';
import ApiNames from "../../Constants/ApiUrls";

import { Navigate, useNavigate } from "react-router-dom";
import ProductItems from "../ProductItems/ProductItems";
import encryptData from "../../Utils/encrypt";
import decryptData from "../../Utils/crypto";
import axios from "axios";

const RecommendedProducts = (props) => {
    
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    





 
    const getRecommended = async (recomendedId) => {
        // const url = `${ApiNames.getrecommendedProducts}${recomendedId}`;
         // Set isLoading to true to show the skeleton loader
        try {
            // Introducing a delay of 3 seconds for demonstration purposes
            // await new Promise(resolve => setTimeout(resolve, 0));
            const response = await axios.get(`https://testshopapi.justrightinc.com/v1/users/recomendedProducts?id=${recomendedId}`);
            let decrptinfo = await decryptData(response.data?.data)
               
            setRecommendedProducts(decrptinfo);
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Fetch the top selling products by default
        getRecommended(0);
      }, []);
    
    return (
        <>
              <p className="text-title recomentdedForYou">Recommended for You</p>

            <ul className="nav nav-tabs recomendedpills-data" id="myTab" role="tablist">
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
                        onClick={() => getRecommended(0)}
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
                        onClick={() => getRecommended(1)}
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
                        onClick={() => getRecommended(2)}
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
                        onClick={() => getRecommended(3)}
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
    )
}

export default RecommendedProducts