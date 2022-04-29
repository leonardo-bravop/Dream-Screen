import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useMatch } from "react-router";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const opened = { value: isOpen, setValue: setIsOpen };
  const [selected, setSelected] = useState("");
  let selectedObj = { value: selected, setValue: setSelected };
  const matchGeneral = useMatch("/*");

  // useEffect(() => {
  //   console.log(`algo es`, matchGeneral.pathname);
  //   console.log(`selected es`, selected);
  //   if (matchGeneral.pathname === "/media/movie") {
  //     console.log(`dentro`);
  //     selectedObj.setValue("movie");
  //   }
  //   console.log(`selected es`, selected);
  // }, [matchGeneral.pathname]);

  return (
    <nav className="navbar">
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
