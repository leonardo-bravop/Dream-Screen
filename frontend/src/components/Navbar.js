import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logoDiv">
        <Link to={"/"}>
          <img src={"/tmdbLogo2.png"} style={{ height: "50px" }} />{" "}
        </Link>
        <Link to="/">
          <span className="topTitle">Dream Screen</span>
        </Link>

        <div className="normal-navigation">
          <NavbarLinks />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ alignSelf: "flex-end" }}>
            {!isOpen ? (
              <img
                src="/menu.svg"
                className="hamburger-menu"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            ) : (
              <img
                src="/close.svg"
                className="close-menu"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            )}
          </div>
          {isOpen && (
            <div className="mobile-navigation">
              <NavbarLinks />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
