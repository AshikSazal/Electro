import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Error from "./components/Error/Error";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/product/:tv" element={<Television />} /> */}
        {/* <Route path="/product/:productlist/:id" element={<Television />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
