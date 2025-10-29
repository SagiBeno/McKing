//npm i react-router-dom react-bootstrap bootstrap react-toastify

import React, { useState } from 'react';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LoginPage from './Pages/LoginPage';
import OrderPage from './Pages/OrderPage';
import OrdersPage from './Pages/OrdersPage';
import RegistrationPage from './Pages/RegistrationPage';
import StatusPage from './Pages/StatusPage';
import NavbarComponent from './Components/NavbarComponent';

import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = data => {
    setLoggedIn(true)
  }

  return (
    <>
      {loggedIn && <NavbarComponent/>}
      <Container className="my-3">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/order" /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={loggedIn ? <Navigate to="/order" /> : <RegistrationPage onRegister={handleLogin} />} /> {/* Login after registration */}
            <Route path='/order' element={<OrderPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/status' element={<StatusPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>  
  )
}