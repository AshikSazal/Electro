import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Error from "./components/Error/Error";
import Service from "./pages/FooterPages/Service/Service";
import Policy from "./pages/FooterPages/Policy/Policy";
import Conditions from "./pages/FooterPages/Conditions/Conditions";
import Auth from "./user/Pages/Auth";
import ProductItem from "./product/ProductItem";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/product/:tv" element={<Television />} /> */}
        {/* <Route path="/product/:productlist/:id" element={<Television />} /> */}
        <Route path="/service" element={<Service />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/product/:productcategory/:id" element={<ProductItem />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
