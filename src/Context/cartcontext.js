import { createContext,useContext,useState } from "react";
import Axios from "../Utils/AxiosConfi";
import ApiNames from "../Constants/ApiUrls";
import encryptData from "../Utils/encrypt";
import decryptData from "../Utils/crypto";
import Toaster from "../Utils/Toaster";
const CartContext = createContext();
export const CartProvider = ({children}) =>{
    const [cart,setCart] = useState([]);

    const addToCart = async(id,type)=>{
        try {
            let token = await localStorage.getItem('token');
            if(token){
                let url = ApiNames.addToCart;
            let body = {
                productId: id,
                type: type
              };
              let encrypDataReq  = {
                key : await encryptData(body)
              }
              
              const response =await Axios.post(`${url}`,encrypDataReq);

              let decryp = await decryptData(response);

console.log(decryp)
             
                // Assuming the response data contains the updated cart
                setCart(response.data.message);
                
                Toaster(response.data.message)
                setTimeout(() => {
                    document.dispatchEvent(new Event('customSideEvent'));
                  }, 100)

            }
             else {
                console.error('Failed to add item to cart');
              }
            
        } catch (error) {
            
        }

    };

    return(
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>

    );


};
export const useCart = ()=> useContext(CartContext);