import React, {Component} from 'react';
import './pages.css';
import {Link} from 'react-router-dom';

import Product from './product.js';


import {ProductConsumer} from '../context';
import Pagination from './pagination.js';


class Products extends Component {
  constructor(props){
    super(props);
    this.state  = {
      isLoaded : false,
      products : [],
      showProducts : []
    }
  }
  render(){
    // const products = this.state.products;
    const products = this.state.showProducts;
    if(!this.state.isLoaded){
      return <h1>No Data Loaded</h1>
    }else{
      return(
          <React.Fragment>
            <div className="py-5">
              <div className="container">
                <Pagination totalRecords={110} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                <div className="row">
                  {
                    products.map(prod => {
                      return <Product key={prod.id} product={prod} addToCart={this.props.addToCart}/>;
                    })
                  }
                </div>
            {/*<Pagination totalRecords={totalCountries} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />*/}
            <div className="text-center align-items-center">
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
            products: result,
            showProducts: result.slice(0,10)
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

  onPageChanged = data => {
    console.log("data", data);
   // const { allCountries } = this.state;
   const { currentPage, totalPages, pageLimit } = data;

   const offset = (currentPage - 1) * pageLimit;
   const showProducts = this.state.products.slice(offset, offset + pageLimit);

   this.setState({
     currentPage, showProducts, totalPages });
 }
}


export default Products;
