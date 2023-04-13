import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

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
import ProductItem from "./product/ProductItem";
import { useAuth } from "./shared/hooks/auth-hook";
// Admin section
import Dashboard from "./Admin/Dashboard";

const App = () => {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [role]);
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
