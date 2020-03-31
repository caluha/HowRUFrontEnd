import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

export default function navbar() {
  return (
    <Navbar collapseOnSelect expand="x1" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        HowRU
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link href="/">Features</Nav.Link>
          <Nav.Link href="/">Features</Nav.Link>
          <Nav.Link href="/">Features</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}