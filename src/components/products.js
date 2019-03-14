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
    console.log(this.props);
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
    console.log("productssss did mount", this.props);
    fetch(process.env.REACT_APP_API_URL+"/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            products: result,
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

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
      // this.setState({ showProducts: nextProps.showProducts });
      this.setState({
        currentPage : 1,
        showProducts :  nextProps.showProducts,
         totalPages : nextProps.showProducts.length
       });
  }

  onPageChanged = data => {
    console.log("data", data);
   // const { allCountries } = this.state;
   const { currentPage, totalPages, pageLimit } = data;
   const products = this.props.products;

   const offset = (currentPage - 1) * pageLimit;
   const showProducts = products.slice(offset, offset + pageLimit);
   console.log(showProducts);

   this.setState({currentPage, showProducts, totalPages });
 }


}


export default Products;
