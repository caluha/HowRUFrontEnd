import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

export default function navbar() {
  return (
    <Navbar  collapseOnSelect expand="x1" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        HowRU
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="create">Create new Tracker</Nav.Link>
          <Nav.Link href="/">Under construction</Nav.Link>
          <Nav.Link href="https://9gag.com/animals">Dank memes</Nav.Link>
          <Nav.Link href="/login">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}