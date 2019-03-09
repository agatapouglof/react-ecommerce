import React, {Component} from 'react';
import './pages.css';
import {Link} from 'react-router-dom';

import Product from './product.js'

import {ProductConsumer} from '../context';


class Products extends Component {
  render(){
    // List of All Products component
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="row">
              <ProductConsumer>
                {
                  (value) =>{
                    const products = value.items;
                    console.log(value);
                    if(!products){
                      return <h1>No Data Loaded</h1>
                    }else{
                      return products.map(prod => {
                        return <Product key={prod.id} product={prod}/>;
                      })
                    }
                  }
                }
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default Products;
