import React from "react";
import { Nav, Navbar } from "react-bootstrap/";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import howru_logo from '../../images/howru_logo.png'

export default function navbar(props) {
  return (
    <Navbar collapseOnSelect expand="x1" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        <div ><img alt="logo" src={howru_logo} style={{ width: "120px" }} /><span style={{ fontWeight: "650" }}> {props.user}</span></div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" >
        <Nav.Link as={Link} to="/" href="/" >My Trackers</Nav.Link>
        <Nav.Link as={Link}to="/create" href="/create" >Create new Tracker</Nav.Link>
        <Nav.Link as={Link} to="/edit" href="/edit">Edit trackers</Nav.Link>
        <Nav.Link as={Link} to="/" onClick={props.logout} >Log Out</Nav.Link>
        </Nav >
      </Navbar.Collapse >
    </Navbar >
  );
}