import React, {Component} from 'react';
import './pages.css';
import {Link} from 'react-router-dom';

import Product from './product.js'

import {ProductConsumer} from '../context';


class Products extends Component {
  constructor(props){
    super(props);
    this.state  = {
      isLoaded : false,
      products : null
    }
  }
  render(){
    const products = this.state.products;
    if(!this.state.isLoaded){
      return <h1>No Data Loaded</h1>
    }else{
      return(
          <React.Fragment>
            <div className="py-5">
              <div className="container">
                <div className="row">
                  {
                    products.map(prod => {
                      return <Product key={prod.id} product={prod} addToCart={this.props.addToCart}/>;
                    })
                  }
            </div>
          </div>
        </div>
      </React.Fragment>
      );
    }
  }
  componentDidMount() {
    console.log("productssss did mount", this.props);
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            products: result
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
}


export default Products;
