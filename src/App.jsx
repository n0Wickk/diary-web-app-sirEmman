import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import List from "./pages/List";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setShowOverlay(window.innerWidth > 4000);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/list" element={<List />} />
      </Routes>
      {showOverlay && (
        <div className="overlay top-0 w-[100vw] h-[100vh] absolute bg-white-400">
          Ctrl + Shft + C, tapos ilagay ang dimensions sa Iphone SE
        </div>
      )}
    </Router>
  );
}

export default App;
