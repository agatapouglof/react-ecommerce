import React, {Component} from 'react';
import './pages.css';
import {Link} from 'react-router-dom';

import Product from './product.js';


import {ProductConsumer} from '../context';
import Pagination from './pagination.js';
import SearchBar from './search.js';


class Products extends Component {
  constructor(props){
    super(props);
    this.state  = {
      isLoaded : false,
      products : this.props.products,
      showProducts : this.props.showProducts
    }
  }
  render(){
    const products = this.state.showProducts;
    if(!this.state.isLoaded){
      return <h1 className="text-center text-info">No Data Loaded</h1>
    }else{
      return(
          <React.Fragment>
            <SearchBar handleSearch={this.props.handleSearch}/>
            <div className="py-5">
              <div className="container">
                <div className="row">
                  {
                    products.map(prod => {
                      return <Product key={prod.id} product={prod} addToCart={this.props.addToCart}/>;
                    })
                  }
                </div>
                <Pagination totalRecords={110} pageLimit={12} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                {/*<Pagination totalRecords={110} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />*/}
            <div className="text-center align-items-center">
            </div>
          </div>
        </div>
      </React.Fragment>
      );
    }
  }
  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL+"/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            products: result,
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

  componentWillReceiveProps(nextProps) {

      this.setState({
        currentPage : 1,
        showProducts :  nextProps.showProducts,
         totalPages : nextProps.showProducts.length
       });
  }

  onPageChanged = data => {
   const { currentPage, totalPages, pageLimit } = data;
   const products = this.props.products;

   const offset = (currentPage - 1) * pageLimit;
   const showProducts = products.slice(offset, offset + pageLimit);

   this.setState({currentPage, showProducts, totalPages });
 }


}


export default Products;
