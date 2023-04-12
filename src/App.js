import { Route, Routes, Navigate } from "react-router-dom";

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
  const { isLoggedIn } = useAuth();
  const val = false;

  return (
    <>
      {!val ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/electro/*" element={<Navigate replace to="/" />} />
            <Route exact path="/" element={<Home />} />
            {/* <Route path="/product/:tv" element={<Television />} /> */}
            {/* <Route path="/product/:productlist/:id" element={<Television />} /> */}
            <Route path="/service" element={<Service />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/conditions" element={<Conditions />} />
            {!isLoggedIn ? (
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
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default App;
