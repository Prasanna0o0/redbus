import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import BookingForm from './Components/BookingForm';
import Checkout from './Components/Checkout';
import Success from './Components/Sucess';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<BookingForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sus" element={<Success />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
