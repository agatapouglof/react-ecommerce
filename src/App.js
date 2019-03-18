import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import tshirt from "./assets/tshirt.svg";

import { Modal} from 'react-bootstrap';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart, faSyncAlt, faTrash, faPlusCircle, faMinusCircle, faUser } from '@fortawesome/free-solid-svg-icons'

import AppHeader from './components/header.js';
import Product from './components/product.js';
import Products from './components/products.js'; // list of all products
import ProductCart from './components/cart.js';
import Details from './components/details.js';
import Error404 from './components/404.js';
import Pagination from './components/pagination.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Footer from './components/footer.js';


library.add(faSearch, faShoppingCart, faSyncAlt, faTrash, faPlusCircle, faMinusCircle, faUser)
class App extends Component {
  constructor(props){
    // console.log(process.env.REACT_APP_API_URL);
    super(props);
    let cart = [];
    let user = null;
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    if(localStorage.getItem('user')){
       user = JSON.parse(localStorage.getItem('user'))
    }
    this.state = {
      products : [],
      showProducts : [],
      cart : cart,
      user : user,
      showModal : false,
      totalAmount : 0
    };
    this.addToCart = this.addToCart.bind(this);
    this.incrementProduct = this.incrementProduct.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.checkout = this.checkout.bind(this);
  }
  componentWillMount(){
    // showProducts: result.slice(0,13)
    fetch(process.env.REACT_APP_API_URL+"/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            products: result,
            showProducts: result
          });
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
        <AppHeader cart={this.state.cart} user={this.state.user}/>
        {/*<h3 className="text-left text-primary">{this.state.totalAmount}</h3>*/}
        <Switch>
          <Route exact path="/" render={(routeprops) => (<Products location={this.props.location} {...routeprops} addToCart={this.addToCart } handleSearch={this.handleSearch} showProducts={this.state.showProducts} products={this.state.products}/>)}/>
          <Route path="/product" render={(routeprops) => (<Product handleSearch={this.handleSearch}/>)} />
          <Route path="/cart" render={(routeprops) =>
              (<ProductCart location={this.props.location}
                 {...routeprops} addToCart={this.addToCart }
                  cart={this.state.cart}
                  totalAmount={this.state.totalAmount}
                  checkout={this.checkout}
                   incrementProduct={this.incrementProduct}
                   decrementProduct={this.decrementProduct}
                   removeFromCart={this.removeFromCart}/>)}/>
          <Route path="/details" component={Details}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route component={Error404}/>
        </Switch>
          {/*<Footer/>*/}

          <Modal show={this.state.showModal} >
            <Modal.Header closeButton>
              <Modal.Title>Card Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>You card Is validated and your T-shirts are  The way !</Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>

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
    cart.map((elt)=>{
      if(elt.product_id == product_id){
        elt.qty = elt.qty+1;
        return elt;
      }else{
        return elt;
      }
    });
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
    let cart = this.state.cart;
    let prom = new Promise(function(resolve,reject){
      let newCart = cart.filter((elt) => {
        return elt.product_id != product_id
      })
      resolve(newCart);
    });
    prom.then((elt) =>  {

      this.setState({cart  : elt})
      this.calculTotalCart();
      localStorage.setItem('cart',  JSON.stringify(elt))
    })


    this.calculTotalCart();
  }

  handleSearch(e){
    let toSearch = e.target.value
    let result =  this.state.products.filter((elt) =>{
      return elt.name.toLowerCase().includes(toSearch,0);
    })
    this.setState({showProducts : result})
    e.preventDefault();
  }

  checkout(e){
    e.preventDefault()
    if(JSON.parse(localStorage.getItem('user'))){
      // window.location.href = "/";
      // save order to database
      fetch(process.env.REACT_APP_API_URL+'/order/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cart : this.state.cart , user : this.state.user, totalAmount:this.state.totalAmount})
      })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then((elt) => {
        this.setState({showModal : true})
        setTimeout(()=>{
          this.setState({showModal : false, cart : [], totalAmount : 0})
          localStorage.removeItem("cart")
        },2000)
        console.log(elt)})
      .catch((err) => console.log(err))
      // this.props.history.push('/');
      // console.log("save item")
    }else{
      window.location.href = "/login";
    }

  }

}


export default App;
