// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom"; // Importamos NavLink
import { useCart } from "../context/CartContext"; // Importa el hook

const Navbar = () => {
  const { cartCount, cartMessage } = useCart(); // Usa el hook del contexto
  
  return (
    <nav className="Navbar navbar navbar-expand-lg navbar-light bg-light position-fixed w-100" style={{ zIndex: 1000 }}>
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <NavLink to="/" className={({ isActive }) => (isActive ? "selected" : "")}>
            Home
          </NavLink>
          <NavLink to="/tips" className={({ isActive }) => (isActive ? "selected" : "")}>
            Tips
          </NavLink>
          <NavLink to="/tutorials" className={({ isActive }) => (isActive ? "selected" : "")}>
            Tutorials
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "selected" : "")}>
            About
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "selected" : "")}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "selected" : "")}>
            Contact
          </NavLink>
        </ul>

        {/* Icono del carrito */}
        <div className="d-flex align-items-center ms-auto position-relative">
          <NavLink to="/store" className="btn position-relative">
            <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>

            {/* Mostrar la burbuja con el número de artículos si es mayor que 0 */}
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Mensaje de artículo añadido */}
          {cartMessage && (
            <div
              className="position-absolute top-0 start-100 translate-middle p-2 bg-success text-white rounded"
              style={{ zIndex: 10, right: "20px", top: "10px" }}
            >
              {cartMessage}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
