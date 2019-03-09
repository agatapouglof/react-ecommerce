import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import tshirt from "./assets/tshirt.svg";

import {CardGroup, Card, Button, Container, Form, FormControl, FormGroup} from 'react-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import AppHeader from './components/header.js';
import Product from './components/product.js';
import Products from './components/products.js'; // list of all products
import ProductCart from './components/cart.js';
import Details from './components/details.js';
import Error404 from './components/404.js';

library.add(faSearch, faShoppingCart)
class App extends Component {


  render() {
    return (
      <React.Fragment>
        <AppHeader/>
        <FontAwesomeIcon icon="shopping-cart" />
        <SearchBar/>
        <Switch>
          <Route exact path="/" component={Products}/>
          <Route path="/product" component={Product}/>
          <Route path="/cart" component={ProductCart}/>
          <Route path="/details" component={Details}/>
          <Route component={Error404}/>
        </Switch>
      </React.Fragment>
    );
  }

}

// <div className="App">
//   <Element/>
// </div>
class Element extends Component{

  constructor(props){
    super(props);
    this.state  = {
      isLoaded : false,
      items : null
    }
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
          console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render(){
    const elements = this.state.items;
    console.log(elements);
    if(!this.state.isLoaded){
      return(<div>....</div>)
    }else{
      console.log("elements loaded");
      return(
        <div>
          <CardGroup>
          {
              elements.map(elt => (

              <Card style={{ width: '18rem' }} key={elt.id}>
                <Card.Img variant="top" src="https://placeimg.com/640/480/any" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            )
          )
      }
    </CardGroup>
    </div>
  );

    }
  }


}

// Search Bar component for the search of items
class SearchBar extends Component{
  render(){
    return(
      <div className="container-fluid searchbar">
        <div className="row justify-content-center align-items-center">
          <Form inline>
            <FormGroup>
              <FormControl  size="lg" type="text" placeholder="Search For Product" className="mr-sm-2 text-center" />
              <Button size="lg" variant="outline-success"><FontAwesomeIcon icon="search" /></Button>
            </FormGroup>
          </Form>
        </div>
      </div>

    );
  }
}

export default App;
