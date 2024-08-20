
import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Landing from './Pages/Landing/Landing';
import ProductView from './Pages/ProductView/ProductView';
import Filter from './Pages/FilterPge/Filter';
import Wishlist from './Pages/Wishlist/Wishlist';
// import ProductView from './Pages/ProductView/ProductView';
import ViewCart from './Pages/CartView/ViewCart';
function App() {
  return (
    <div >
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/ProductView/:productId" element={<ProductView/>} />
          <Route path="/Filter/:type/:id" element={<Filter/>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/viewcart" element={<ViewCart />} />
          {/* <Route path="/InsideProduct/:id" exact element={<InsideProduct />} />
          <Route path="/ProductView/:productId" element={<ProductView/>} />
          <Route path="/Filter/:type/:id" element={<Filter/>} />
          <Route path="/WishItems" element={<WishItems/>} />
          <Route path="/CartItems" element={<CartItems/>} />
          <Route path="/Checkout" element={<Checkout/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/Orders" element={<Orders/>} />
          <Route path="/Orderview/:orderId" element={<Orderview/>} />
          <Route path="/OrderReturn/:orderId" element={<OrderReturn/>} />
          <Route path="/CancelOrder/:orderId" element={<CancelOrder/>} />
          <Route path="/ExchangeOrder/:orderId" element={<ExchangeOrder/>} />
          <Route path="/allblogs" element={<AllBlogs/>} />
          <Route path="/bloginfo/:id" element={<BlogData/>} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/faq" element={<Faq/>} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
