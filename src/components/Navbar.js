import React from "react";
import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/pokedex.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <BootstrapNavbar
      bg={darkMode ? "white" : "dark"}
      variant={darkMode ? "white" : "dark"}
      expand="lg"
    >
      <Container className="d-flex justify-content-between align-items-center">
        <BootstrapNavbar.Brand as={Link} to="/">Pokémon Pokedex</BootstrapNavbar.Brand>
        <ul className="list-inline d-flex align-items-center">
          <li className="list-inline-item">
            <a href="https://github.com/kkdh0130" target="_blank" rel="noopener noreferrer">
              <img
                src={`${process.env.PUBLIC_URL}/icons/github.png`}
                alt="GitHub"
                width="40"
                height="40"
                className="icon-img"
              />
            </a>
          </li>
          <li className="list-inline-item">
            <DarkModeToggle />
          </li>
        </ul>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
