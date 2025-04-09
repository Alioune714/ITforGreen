// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
 // Utilisation du chemin relatif correct
import Footer from "./Footer";  // Utilisation du chemin relatif correct

export default function Layout() {
  return (
    <div className="font-sans">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
