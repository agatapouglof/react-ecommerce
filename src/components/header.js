import React, {Component} from 'react';
import './pages.css';

import { Link} from 'react-router-dom';
import {Bootstrap, Grid, Row, Col, Button, Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import tshirt from "../assets/tshirt.svg";


class AppHeader extends Component {
  render(){
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <Link to="/">
              <img src={tshirt} alt="tshirt" height="55" width="55"/>
              Shop
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="#link">My Account</Nav.Link>
            </Nav>
            <Button variant="outline-success">Search</Button>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}


export default AppHeader;
