import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";

const Navbar = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand href="/" className="navbar-title">Pokémon Pokedex</BootstrapNavbar.Brand>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
