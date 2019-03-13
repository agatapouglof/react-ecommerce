import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import tshirt from "./assets/tshirt.svg";

import {CardGroup, Card, Button, Container, Form, FormControl, FormGroup} from 'react-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart, faSyncAlt, faTrash, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

import AppHeader from './components/header.js';
import Product from './components/product.js';
import Products from './components/products.js'; // list of all products
import ProductCart from './components/cart.js';
import Details from './components/details.js';
import Error404 from './components/404.js';
import Pagination from './components/pagination.js';


library.add(faSearch, faShoppingCart, faSyncAlt, faTrash, faPlusCircle, faMinusCircle)
class App extends Component {
  constructor(props){
    super(props);
    let cart = [];
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    this.state = {
      products : [],
      showProducts : [],
      cart : cart,
      totalAmount : 0
    };
    this.addToCart = this.addToCart.bind(this);
    this.incrementProduct = this.incrementProduct.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentWillMount(){
    console.log("Will Mount");
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            products: result,
            showProducts: result.slice(0,10)
          });
          console.log(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  componentDidMount(){
    this.calculTotalCart();
  }

  render() {
    return (
      <React.Fragment>
        <AppHeader/>
        <h3 className="text-left text-primary">{this.state.totalAmount}</h3>
        <FontAwesomeIcon icon="shopping-cart" />
        <Switch>
          {/*
            <Route exact path="/" component={Products}/>

          */}
          <Route exact path="/" render={(routeprops) => (<Products location={this.props.location} {...routeprops} addToCart={this.addToCart } handleSearch={this.handleSearch} showProducts={this.state.showProducts}/>)}/>
          <Route path="/product" render={(routeprops) => (<Product handleSearch={this.handleSearch}/>)} />
          <Route path="/cart" render={(routeprops) =>
              (<ProductCart location={this.props.location}
                 {...routeprops} addToCart={this.addToCart }
                  cart={this.state.cart}
                  totalAmount={this.state.totalAmount}
                   incrementProduct={this.incrementProduct}
                   decrementProduct={this.decrementProduct}
                   removeFromCart={this.removeFromCart}/>)}/>
          <Route path="/details" component={Details}/>
          <Route component={Error404}/>
        </Switch>
      </React.Fragment>
    );
  }
  addToCart(product){
      const cart = this.state.cart;
      let newCart = [];

      if(!this.isInCart(product)){
        cart.push(product);
        this.setState({cart : cart });
        localStorage.setItem('cart', JSON.stringify(cart));
        // this.setState((state,props) => {
        //   return {totalAmount : state.totalAmount + Number(product.price)};
        // })
        this.calculTotalCart();
      }
  }
  isInCart(product){
    let cart = this.state.cart;
    return  cart.some((el) => {
      return el.product_id == product.product_id;
    });
  }
  calculTotalCart(){
    let cart = this.state.cart;
    let total = 0;
    total = cart.reduce((total,val)=>{return total + Number(val.price) * Number(val.qty)},0);
    localStorage.setItem('totalCart', JSON.stringify(total));
    this.setState({totalAmount : total});
    // return total;
  }
  incrementProduct(product_id){
    let cart = this.state.cart;
    console.log('show increment product in app js');
    cart.map((elt)=>{
      if(elt.product_id == product_id){
        elt.qty = elt.qty+1;
        return elt;
      }else{
        return elt;
      }
    });
    console.log(cart);
    this.setState({cart : cart})
    localStorage.setItem('cart', JSON.stringify(cart));
    this.calculTotalCart();

  }
  decrementProduct(product_id){
    let cart = this.state.cart;
    cart.map((elt)=>{
      if(elt.product_id == product_id){
        elt.qty = elt.qty-1;
        return elt;
      }else{
        return elt;
      }
    });
    this.setState({cart : cart})
    localStorage.setItem('cart', JSON.stringify(cart));
    this.calculTotalCart();
  }
  removeFromCart(product_id){
    console.log('remove from cart')
    let cart = this.state.cart;
    let prom = new Promise(function(resolve,reject){
      let newCart = cart.filter((elt) => {
        return elt.product_id != product_id
      })
      console.log('resolve');
      resolve(newCart);
    });
    prom.then((elt) =>  {
      console.log("then");
      console.log(elt);

      this.setState({cart  : elt})
      this.calculTotalCart();
      localStorage.setItem('cart',  JSON.stringify(elt))
    })


      // console.log("newCart", newCart);
      // return {cart :  newCart}
    // })
    // this.setState({cart  : newCart})
    // console.log(this.state);
    this.calculTotalCart();
  }

  handleSearch(e){
    console.log(e.target.value);
    let toSearch = e.target.value
    let result =  this.state.products.filter((elt) =>{
      return elt.name.toLowerCase().includes(toSearch,0);
    })
    this.setState({showProducts : result})
    console.log(result);
    e.preventDefault();
  }

}

class Element extends Component{

  constructor(props){
    super(props);
    this.state  = {
      isLoaded : false,
      items : null
    }
  }
  componentDidMount() {
    fetch("http://locallhost:4000/products")
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
                <Card.Img variant="top" src={"http://localhost:4000/images"+elt.image} />
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



export default App;
