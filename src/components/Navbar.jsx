import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Workflow Automation</h1>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-white text-blue-600" : "hover:bg-blue-500"
            }`
          }
        >
          Canvas
        </NavLink>
        <NavLink
          to="/table"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-white text-blue-600" : "hover:bg-blue-500"
            }`
          }
        >
          Table
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
