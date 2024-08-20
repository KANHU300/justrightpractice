

// // import React, { useState, useEffect } from "react";

// import { useEffect, useState } from "react";
// import ApiNames from "../../Constants/ApiUrls";
// import Axios from "../../Utils/AxiosConfi";
// // import { useCart } from "../../Context/CartContext";
// import { Navigate, useNavigate } from "react-router-dom";
// const ProductItemsNew = (props) => {
//   const [onDataReturn, setonDataReturn] = useState('');
//   const [isLoginUser, setIsLogin] = useState(null);
//   const navigate = useNavigate();
//   const {addToCart, whenLoginRefreshProduct,cartItems} = useCart()

  
//   async function addOrRemoverWishList(product) {
     
//     let token = await localStorage.getItem('token');
//     if (token) {
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//     }
//     if(isLoginUser == true){
//       let sendData = {
//         productId: product._id
//       }
//       let api = ApiNames.user_WishList
//       try {
         
//         const response = await Axios.post(`${api}`, sendData);
//         setonDataReturn(response.data.message)
//         addToCart(response.data.message)
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//     else{
//       // alert('user not logdin')
//       // whenLoginRefreshProduct('data')
//       document.dispatchEvent(new Event('customEvent'));
//     }
   
//   }


//   async function getListByCategory() {
     
//     let token = await localStorage.getItem('token');
//     if (token) {
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//     }
//     if(isLoginUser == true){

//       try {
         
//         const response = await Axios.get(`${process.env.REACT_APP_API_KEY}getCategoryWiseProductsList?id=${props._id}`);
//         // setonDataReturn(response.data.message)
//         // addToCart(response.data.message)
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//     else{
//       // alert('user not logdin')
//       // whenLoginRefreshProduct('data')
//       document.dispatchEvent(new Event('customEvent'));
//     }
   
//   }

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
         
       
//         let token = await localStorage.getItem('token');
//         if (token) {
//           setIsLogin(true);
//         } else {
//           setIsLogin(false);
//         }
//       } catch (error) {
//         console.error("Error checking login status:", error);
//         // Handle the error as needed
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   function addToCarts(id){
//     navigate(`/ProductView/${id}`)
//   }

//   async function addToCartsProduct(id, type) {
//     try {
//       let api = ApiNames.addToCart;
//       let body = {
//         productId: id,
//         type: type
//       };
//       const response = await Axios.post(
//         `${api}`, body
//       );
//       addToCart(response.data.message)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <>
//         <div className="row row-cols-2  row-cols-md-4 g-3">
//         {props.productObj.map((products,index) => (
//              <div key={index} className="col">
//             <div className="card product-card">
//               <div className="card-top">
//                 <div className="productImg-top">
//                   <img onClick={()=>(addToCarts(products._id))}
//                     src={products.thumbnail}
//                     className="card-img-top product-cardImage"
//                     alt="..."
//                   />
//                 </div>
//                 {/* <div className="DiscoutBox">
//                   <div>
//                     <span className="dicsoutnNu"> {products.discount}% <br />OFF</span>
//                   </div>
//                 </div> */}
//                 <div>
//                   {
//                     products.isWishlist ? (
//                       <img onClick={()=>(addOrRemoverWishList(products))}
//                       src="/images/menubar/wishFill.svg"
//                       alt=".."
//                       className="wishlist-icon"
//                     />
//                     ) :(
//                       <img onClick={()=>(addOrRemoverWishList(products))}
//                       src="/images/menubar/wishUnFill.svg"
//                       alt=".."
//                       className="wishlist-icon"
//                     />
//                     )
//                   }
              
                    
//                 </div>
//               </div>
//               <div className="card-body product-body">
//                 <p onClick={()=>(addToCarts(products._id))} className="card-title item-title">{products.title}</p>
//                 {/* <div className="item-review">
//                   <span className="starss">
//                     &#9734;&#9734;&#9734;&#9734;&#9734;
//                   </span>
//                   <span className="custemer-rivew">400 </span>
//                 </div> */}
//                 <p className="item-price">
//                   AED <span>{products.sellingPrice}</span>
//                 </p>
//                 <button  onClick={()=>addToCartsProduct(products._id,1)} className="btn add-cart">
//                   <img
//                     src="/images/LandingPg/bagIcn.png"
//                     alt=".."
//                     className="bag-icon"
//                   />
//                   Add To Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
        
//       </div>
//     </>
//   );
// };

// export default ProductItemsNew;
