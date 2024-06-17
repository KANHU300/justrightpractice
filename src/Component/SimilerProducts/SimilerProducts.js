import React from 'react'
import { useEffect, useState } from "react";
import ApiNames from "../../Constants/ApiUrls";
import Axios from "../../Utils/AxiosConfi";
import ProductItems from '../ProductItems/ProductItems'
import TextTitle from '../Title/TextTitle';
import axios from 'axios';
// import { useCart } from '../../Context/CartContext';

const SimilerProducts = () => {
  // const { cartItems, selectRefresh, addToCart, removeFromCart } = useCart()
    const [getsimilarProd, setSimilarProd] = useState([]);

    useEffect(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
  
      }, []);


      
    useEffect(() => {
      const getSimilarProducts = async () => {
        let info = JSON.parse(await localStorage.getItem('similar'))
        let body ={
          slug:info?.slug,
          categoryId:info?.categoryId,
          _id:info?._id
        }
      
          let url = ApiNames.getSimilarProducts;
          try {
            
              // Introducing a delay of 3 seconds for demonstration purposes
              // await new Promise(resolve => setTimeout(resolve, 0));
  
              const response = await Axios.post(url,body);
              // addToCart(response.data)
              setSimilarProd(response.data);
              console.log(response.data)
          } catch (error) {
              console.log(error);
          } 
      };
      getSimilarProducts()
    }, []);

   
  return (
   <>
     <TextTitle text="Similar Products" className="textSub-title" />
   <ProductItems productObj={getsimilarProd}/>
   </>
  )
}

export default SimilerProducts