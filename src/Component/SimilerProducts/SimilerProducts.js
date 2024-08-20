import React from "react";
import { useEffect, useState } from "react";
import ApiNames from "../../Constants/ApiUrls";
import Axios from "../../Utils/AxiosConfi";
import ProductItems from "../ProductItems/ProductItems";
import TextTitle from "../Title/TextTitle";
import { useParams } from "react-router-dom";
import { useCart } from "../../Context/cartcontext";

// import { useCart } from '../../Context/CartContext';

const SimilerProducts = () => {
  const { addToCart, updateCart, addToWishlist, updateWishlist } = useCart();
  const [productData, setProductData] = useState(null);

  const { productId } = useParams();
 
  const [getsimilarProd, setSimilarProd] = useState([]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let url = ApiNames.getProductById;
        const response = await Axios.get(`${url}${productId}`);

        setProductData(response.data.productDetails);
        console.log("product response", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId,]);
  useEffect(() => {
    if (!productData) return;
   
    const getSimilarProducts = async () => {
      

     
      try {
        debugger
        // Introducing a delay of 3 seconds for demonstration purposes
        // await newdebugger Promise(resolve => setTimeout(resolve, 0));
        let body = {
          slug: productData?.slug,
          categoryId: productData?.categoryId,
          _id: productData?._id,
        };
  
        let url = ApiNames.getSimilarProducts;

        const response = await Axios.post(url, body);
        
        setSimilarProd(response.data);
        console.log("similarprod",response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarProducts();
  }, [productData,updateCart]);

  return (
    <>
      <TextTitle text="Similar Products" className="textSub-title" />
      <ProductItems productObj={getsimilarProd} />
    </>
  );
};

export default SimilerProducts;
