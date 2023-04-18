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
import Auth from "./user/Pages/Auth";
import ProductList from "./product/ProductList";
import ProductItem from "./product/ProductItem";
import Cart from "./pages/Cart/Cart";
import { useAuth } from "./shared/hooks/auth-hook";
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
    if (!token || !role) {
      dispatch(replaceCart({ items: [], totalQuantity: 0 }));
    }
    setIsLoading(false);
  }, [dispatch, token, role]);

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
        dispatch(
          replaceCart({
            items: responseData.cart.items || [],
            totalQuantity: Object.values(responseData.cart).length,
          })
        );
      } catch (err) {}
    };
    fetchCart();
  }, [sendRequest, token, role, dispatch]);

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
          {/* <Route path="/product/:tv" element={<Television />} /> */}
          {/* <Route path="/product/:productlist/:id" element={<Television />} /> */}
          <Route path="/service" element={<Service />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/conditions" element={<Conditions />} />
          {role === null ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <Route path="/auth" element={<Navigate replace to="/" />} />
          )}
          <Route
            path="/product/:productcategory/:id"
            element={<ProductItem />}
          />
          <Route path="/product/:category" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
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
