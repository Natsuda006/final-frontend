import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">
          📚 Books
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/add" className="btn btn-primary">
          ➕ เพิ่มสินค้าใหม่
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
