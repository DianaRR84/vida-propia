// src/components/Navbar.jsx

import { NavLink } from "react-router-dom"; // Importamos NavLink

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
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
      </ul>
    </nav>
  );
}

export default Navbar;

