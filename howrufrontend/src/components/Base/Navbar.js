import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import howru_logo from '../../images/howru_logo.png'

export default function navbar(props) {
  return (
    <Navbar  collapseOnSelect expand="x1" bg="dark" variant="dark">
      <Navbar.Brand href="/">
      <img alt="logo" src={howru_logo} style={{ width: "120px" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">My Trackers</Link>
          <Link to="/create">Create new Tracker</Link>
          <Link onClick={props.logout} href="/">Log Out</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}