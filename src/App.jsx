import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      {/* Navbar component for navigation */}
      <Navbar />

      {/* Routes for different pages */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />

        {/* Coin page route with dynamic coinId parameter */}
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>

      {/* Footer component for additional information */}
      <Footer />
    </div>
  );
};

export default App;
