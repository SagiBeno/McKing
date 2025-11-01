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
import NewWorkerPage from './Pages/NewWorkerPage';

import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = data => {
    setLoggedIn(true)
    setUsername(data.username)
    setRole(data.role)
  }

  return (
    <BrowserRouter>
      <Container style={{marginTop: '35px'}}>
        {loggedIn && <NavbarComponent username={username} role={role}/>}
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/order" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={loggedIn ? <Navigate to="/order" /> : <RegistrationPage onRegister={handleLogin} />} /> {/* Login after registration */}
          <Route path='/order' element={<OrderPage username={username} />} />
          <Route path='/all-orders' element={<OrdersPage />} />
          <Route path='/status' element={<StatusPage username={username} />} />
          <Route path='/new-worker' element={<NewWorkerPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}