import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setShowOverlay(window.innerWidth > 375);
    };

    checkScreenWidth(); 
    window.addEventListener('resize', checkScreenWidth); 

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {showOverlay && <div className="overlay top-0 w-[100vw] h-[100vh] absolute bg-white-400">Ctrl + Shft + C, tapos ilagay ang dimensions sa Iphone SE</div>}
    </Router>
  );
}

export default App;
