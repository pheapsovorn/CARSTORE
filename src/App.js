import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DetailProductPage from './pages/DetailProductPage';
import Customers from './components/Customers';
import RatingCustomer from './components/RatingCustomer';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<DetailProductPage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reviews" element={<RatingCustomer />} />
      </Routes>
      <Footer />
    </div>
  );
}