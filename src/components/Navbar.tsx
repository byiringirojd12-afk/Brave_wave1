import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/lesson1">Lesson 1</Link></li>
        <li><Link to="/lesson2">Lesson 2</Link></li>
        <li><Link to="/lesson3">Lesson 3</Link></li>
        <li><Link to="/lesson4">Lesson 4</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
