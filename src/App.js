import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
// Customer section
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ErrorModal from "./components/Error/ErrorModal";
import Service from "./pages/FooterPages/Service/Service";
import Policy from "./pages/FooterPages/Policy/Policy";
import Conditions from "./pages/FooterPages/Conditions/Conditions";
import Auth from "./user/Authentication/Auth";
import ProductList from "./product/ProductList";
import Cart from "./pages/Cart/Cart";
import CartList from "./product/Cart/CartList";
import Address from "./user/Address/Address";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import { useAuth } from "./shared/hooks/auth-hook";
import ProductDetails from "./product/ProductDetails/ProductDetails";
// Admin section
import Dashboard from "./Admin/Dashboard";
import { useHttpClient } from "./shared/hooks/http-hook";
import { replaceCart } from "./store/cartSlice";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const { token, role } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const responseData = await sendRequest(
          "http://127.0.0.1:8000/api/user/cart/fetch",
          "GET",
          null,
          {
            Authorization: "Bearer " + token + "|@|" + role,
          }
        );

        const totalQuantity = responseData.cartData.reduce(
          (total, item) => total + item.cart.quantity,
          0
        );
        const totalPrice = responseData.cartData.reduce(
          (total, item) => total + item.cart.price,
          0
        );

        dispatch(
          replaceCart({
            items: responseData.cartData,
            totalQuantity: totalQuantity,
            totalPrice: totalPrice,
          })
        );
      } catch (err) {}
    };
    fetchCart();
  }, [sendRequest, token, role, dispatch]);

  useEffect(() => {
    if (!token || !role) {
      dispatch(replaceCart({ items: [], totalQuantity: 0 }));
    }
    setIsLoading(false);
  }, [dispatch, token, role]);

  let routes;
  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  } else if (+role === 3 || role === null) {
    routes = (
      <div>
        {isLoading && <LoadingSpinner asOverlay />}
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/conditions" element={<Conditions />} />
          {role === null ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <Route path="/auth" element={<Navigate replace to="/" />} />
          )}
          <Route path="/product/cart" element={<CartList />} />
          <Route path="/product/:category" element={<ProductList />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/electro/*" element={<Navigate replace to="/auth" />} />
          <Route path="*" element={<ErrorModal />} />
        </Routes>
        <Footer />
      </div>
    );
  } else {
    routes = <Dashboard />;
  }

  return <>{routes}</>;
};

export default App;
