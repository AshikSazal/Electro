import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Television from "./components/Television";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:tv" element={<Television />} />
      </Routes>
    </div>
  );
};

export default App;
