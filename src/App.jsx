import './Reset.scss';
import './App.scss';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
