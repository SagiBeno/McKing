import React, { useState } from 'react';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LoginPage from './Pages/LoginPage';
import OrderPage from './Pages/OrderPage';

import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = data => {
    console.log(data)
    setLoggedIn(true)
  }

  return (
    <Container className="my-3">
        <h1 className="text-center mb-4">McKing</h1>
        {/* TODO - solve task */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/order" /> : <LoginPage onLogin={handleLogin} />} />
            <Route path='/order' element='<OrderPage />' />
            {/* <Route path="/(oldal)" element={<Oldal />} */}
          </Routes>
        </BrowserRouter>
      </Container>
  )
}