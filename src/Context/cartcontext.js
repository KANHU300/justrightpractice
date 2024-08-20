import { createContext, useContext, useState } from "react";
import Axios from "../Utils/AxiosConfi";
import ApiNames from "../Constants/ApiUrls";
import encryptData from "../Utils/encrypt";
import decryptData from "../Utils/crypto";
import Toaster from "../Utils/Toaster";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = async (id, type, qty) => {
    try {
      const token = await localStorage.getItem("token");
      if (token) {
        const url = ApiNames.addToCart;
        const body = { productId: id, type: type, quantity: qty };
        const encrypDataReq = { key: await encryptData(body) };

        console.log("Request payload:", encrypDataReq);
        const response = await Axios.post(`${url}`, encrypDataReq);
        const decryp = await decryptData(response.data);

       
        updateCart(response.data.message);
        console.log("Decrypted response data:", decryp);

        setTimeout(() => {
          document.dispatchEvent(new Event("customSideEvent"));
        }, 100);
      } else {
        console.error("Failed to add item to cart");
        Toaster("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Toaster("Error adding item to cart");
    }
  };
  const addToWishlist = async (product) => {
    try {
      const token = await localStorage.getItem("token");
      if (token) {
        const url = ApiNames.user_WishList;
        const body = { productId: product._id };

        const response = await Axios.post(url, body);
        const decryptedResponse = await decryptData(response.data);
        updateCart(decryptedResponse.message);

        console.log("Wishlist response:", response.data);
        // updateWishlist(response.data.message);
        
      } else {
        console.error("User token not found. Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  
 
// const updateWishlist = (item)  => {
//   setWishlist([...wishlist, item]);

// }
  
  const updateCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCart,
        addToWishlist,
        // updateWishlist
       
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
