import React, {Component} from 'react';
import './pages.css';

import { Link} from 'react-router-dom';
import {Bootstrap, Grid, Row, Col, Button, Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import tshirt from "../assets/tshirt.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class AppHeader extends Component {
  constructor(props){
    super(props);
    const user = this.props.user
    this.state = {
      cart : [],
      user : user
    }
  }
  render(){
    const userName = this.props.user ? this.props.user.name : "Not Connected"
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
              <Nav.Link href="#link">
                <button className="btn btn-outline-primary">
                  <FontAwesomeIcon icon="user" className="mr-2"/>
                  User {userName}
                </button>
              </Nav.Link>
            </Nav>
            <Link to="/cart">
              <button type="button" className="btn btn-lg btn-outline-success">
                <FontAwesomeIcon icon="shopping-cart" />
                <span className="mx-2 badge badge-light">{this.props.cart.length}</span>
              </button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}


export default AppHeader;
