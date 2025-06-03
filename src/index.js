import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';// Importa BrowserRouter, Routes y Route
import './index.css';
//import App from './App';
import Users from './pages/users';
//import login from './pages/login';
import Login from './pages/Login';
import UserFields from './pages/userFileds';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode es una herramienta de desarrollo que ayuda a identificar problemas potenciales en la aplicación
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Users />} />
        <Route path="/userfields" element={<UserFields />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
