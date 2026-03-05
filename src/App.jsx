import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Create a separate component for the routes that uses useLocation
function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
        <Route path="/author/:authorId" element={<Author />} />
      </Routes>
      <Footer />
    </>
  );
}

// Main App component - Router wraps everything
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
