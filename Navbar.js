import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">MedBookingBTL</Link>
        <div>
          <Link to="/login" className="btn btn-outline-light mx-2">Đăng nhập</Link>
          <Link to="/register" className="btn btn-outline-light">Đăng ký</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;