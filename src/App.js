import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Login from "./components/SignIn.jsx";
import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from "./components/index.js";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./protectedRoute1.jsx";
import "./App.css";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import CryptoVerseLanding from "./components/CRYPTOVERSE.jsx";
import Footer from "./components/Footer.jsx";

// Define roles here
const ROLES = {
  User: "user",
};

const App = () => (
  <Router>
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/about" element={<CryptoVerseLanding />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<ProtectedRoute allowedRoles={[ROLES.User]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer" style={{ backgroundColor: "black" }}>
         <Footer/>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
