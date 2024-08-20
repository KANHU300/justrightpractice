import React, { useEffect, useState } from 'react'
import Axios from "../../Utils/AxiosConfi"; 
import ApiNames from "../../Constants/ApiUrls";
// import { useCart } from "../../Context/cartcontext";
import { useNavigate } from "react-router-dom";
const Wishlist = () => {
    const navigate = useNavigate();
    // const { addToCart } = useCart()
    const [getItems, setItems] = useState([]);
    useEffect(() => {
        const getWishlist = async () => {
            try {
                let api = ApiNames.getWishList
                const response = await Axios.get(
                    `${api}`
                );

                setItems(response.data.wishList);

            } catch (error) {
                console.log(error);
            }
        };
        getWishlist();
    }, []);
    function addToCarts(id) {
      
        navigate(`/ProductView/${id}`)
    }

    function gotoHome() {
        navigate(`/landing`)
    }
    async function deleteCart(id) {
        try {

            let api = ApiNames.deleteWishList
            const response = await Axios.get(
                `${api}${id}`
            );
            console.log(response)
            console.clear()
            // addToCart("")
            let apsi = ApiNames.getWishList
            const responseNew = await Axios.get(
                `${apsi}`
            );

            setItems(responseNew.data.wishList);

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div>

            {getItems.length > 0 ? (
                <div>

                    <div className='wishlist-page-top'>
                        <div className='container'>
                            <h1 className='wishlist-title' >Home / Wishlist</h1>

                            <div className="row row-cols-2  row-cols-md-4 row-cols-lg-5 g-3">
                                {getItems.map((products, index) => (
                                    <div key={index} className="col">
                                        <div className="card product-card">
                                            <div className="card-top">
                                                <div className="productImg-top">
                                                    <img onClick={() => (addToCarts(products.productDetails[0]._id))}
                                                        src={products.productDetails[0]?.thumbnail}
                                                        className="card-img-top product-cardImage"
                                                        alt="..."
                                                    />
                                                </div>
                                                {/* <div className="DiscoutBox">
                                                    <div>
                                                        <span className="dicsoutnNu"> {products?.productDetails[0]?.discount}% <br />OFF</span>
                                                    </div>
                                                </div> */}
                                                <div>
                                                    {
                                                        products.isWishlist ? (
                                                            // <img onClick={() => (deleteCart(products._id))}
                                                            //     src="/images/LandingPg/cancel.svg"
                                                            //     alt=".."
                                                            //     className="wishlist-icon"
                                                            // />
                                                            <i className="fas fa-trash-alt"></i>
                                                        ) : (
                                                            <img onClick={() => (deleteCart(products._id))}
                                                                src="/images/LandingPg/delete.svg"
                                                                alt=".."
                                                                className="wishlist-icon"
                                                            />
                                                            // <i onClick={() => (deleteCart(products._id))} className="fas fa-trash-alt wishlist-icon"></i>
                                                        )
                                                    }


                                                </div>
                                            </div>
                                            <div className="card-body product-body">
                                                <p onClick={() => (addToCarts(products.productDetails[0]._id))} className="card-title item-title">{products.productDetails[0]?.title}</p>
                                                <div className="item-review">
                                                    <span className="starss">
                                                        &#9734;&#9734;&#9734;&#9734;&#9734;
                                                    </span>
                                                    <span className="custemer-rivew">400 </span>
                                                </div>
                                                <p className="item-price">
                                                    AED <span>{products.productDetails[0]?.sellingPrice}</span>
                                                </p>
                                                <button onClick={() => (addToCarts(products.productDetails[0]._id))} className="btn add-cart">
                                                    <img
                                                        src="/images/LandingPg/bagIcn.png"
                                                        alt=".."
                                                        className="bag-icon"
                                                    />
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='wishlist-page-top'>
                        <div className='container'>
                            <h1 className='wishlist-title' ><span onClick={gotoHome}>Home</span> / Wishlist</h1>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '70vh' }}>
                                <h1 className='emptylist'>Wishlist is Empty</h1>
                            </div>

                        </div>
                    </div>
                </div>
            )}





        </div>



    )
}

export default Wishlist