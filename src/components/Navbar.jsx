import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartModal from "../components/CartModal";

const Navbar = () => {
  const { cartCount, cartMessage } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);

  // ✅ Abre/Cierra el modal
  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  return (
    <nav className="Navbar navbar navbar-expand-lg navbar-light bg-light position-fixed w-100" style={{ zIndex: 1000 }}>
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <NavLink to="/" className={({ isActive }) => (isActive ? "selected" : "")}>
            Home
          </NavLink>

          <NavLink to="/projects" className={({ isActive }) => (isActive ? "selected" : "")}>
            Projects
          </NavLink>
          
          <NavLink to="/about" className={({ isActive }) => (isActive ? "selected" : "")}>
            About
          </NavLink>
          
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "selected" : "")}>
            Contact
          </NavLink>
        </ul>

        {/* 🛒 Icono del carrito (abre el modal) */}
        <div className="d-flex align-items-center ms-auto position-relative">
          <button className="btn position-relative" onClick={toggleCartModal}>
            <i className="bi bi-cart" style={{ fontSize: "1.5rem", color: "#fff" }}></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>

          {/* ✅ Mensaje de artículo añadido */}
          {cartMessage && (
            <div
              className="position-absolute top-1 start-0 translate-middle p-2 bg-success text-white rounded"
              style={{ zIndex: 10, fontSize: "0.7rem", left: "-50px", top: "70px" }}
            >
              {cartMessage}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Modal del carrito */}
      {showCartModal && <CartModal onClose={toggleCartModal} />}
    </nav>
  );
};

export default Navbar;
