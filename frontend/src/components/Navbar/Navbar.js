import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useMatch } from "react-router";
import NavbarLinks from "./NavbarLinks";

import { useScroll } from "../../hooks/Scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const opened = { value: isOpen, setValue: setIsOpen };
  const [selected, setSelected] = useState("");
  let selectedObj = { value: selected, setValue: setSelected };
  
  const matchState = useMatch("/*");

  const state = matchState.pathname.split("/");

  useEffect(()=>{
    if (state[2]==="tv") setSelected("tv-shows")
    else if (state[2]==="movie") setSelected("movies")
    else if (state[1]==="user") setSelected("users")
    if (state[2]==="my-favorites") setSelected("my-favorites")

  }, [])

console.log(`state es`, state);
  //Navbar hide functionality
  const { y, x, scrollDirection } = useScroll();

  const styles = {
    active: {
      visibility: "visible",
      transition: "all 0.3s",
    },
    hidden: {
      visibility: "hidden",
      transition: "all 0.3s",
      transform: "translateY(-100%)",
    },
  };
  //

 
  return (
    <nav
      className="navbar"
      style={scrollDirection? (scrollDirection === "down" ? styles.active : styles.hidden) : null}
    >
      <div className="logoDiv">
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setSelected("")}
        >
          <img src={"/tmdbLogo2.png"} className="logo-img" />
          <span className="topTitle">Dream Screen</span>
        </Link>

        <div className="normal-navigation">
          <NavbarLinks opened={opened} selected={selectedObj} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifySelf: "flex-end",
          }}
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
        </div>
      </div>
      {isOpen && (
        <div className="mobile-navigation" style={{ height: "100vh" }}>
          <NavbarLinks opened={opened} selected={selectedObj} />
        </div>
      )}
    </nav>
  );
};
export default Navbar;
