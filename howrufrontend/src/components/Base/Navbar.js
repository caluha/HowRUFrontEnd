import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function navbar(props) {
  return (
    <Navbar  collapseOnSelect expand="x1" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <h5 style={{color:'white'}}>HowRU {props.user} </h5>
      </Navbar.Brand>
     
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="create">Create new Tracker</Nav.Link>
          <Nav.Link href="/chart">Graphs</Nav.Link>
          <Nav.Link onClick={props.logout}>Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}