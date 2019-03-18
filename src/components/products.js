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
      showProducts : this.props.showProducts,
      onePageProducts : this.props.showProducts,
      totalPages : 2
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  render(){
    // const products = this.state.showProducts;
    const products = this.state.onePageProducts;
    if(!this.state.isLoaded){
      return <h1 className="text-center text-info">No Data Loaded</h1>
    }else{
      return(
          <React.Fragment>
            <SearchBar handleSearch={this.handleSearch}/>
            {this.props.showProducts.length}
            <div className="py-5">
              <div className="container">
                <div className="row">
                  {
                    products.map(prod => {
                      return <Product key={prod.id} product={prod} addToCart={this.props.addToCart}/>;
                    })
                  }
                </div>
                <Pagination totalRecords={this.props.showProducts.length}  pageLimit={12} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                {/* <Pagination totalRecords={110} pageLimit={12} pageNeighbours={1} onPageChanged={this.onPageChanged} />*/}
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
    console.log('new props');
      this.setState({
        currentPage : 1,
        showProducts :  nextProps.showProducts,
         totalPages : nextProps.showProducts.length
       });
  }

  onPageChanged = data => {
    console.log("on change");
    console.log("on change",data);
   let { currentPage, totalPages, pageLimit } = data;
   // const products = this.props.products;
   const products = this.props.showProducts;
   // totalPages = Math.ceil(this.totalRecords / this.pageLimit);
   totalPages = 4

   const offset = (currentPage - 1) * pageLimit;
   // const showProducts = products.slice(offset, offset + pageLimit);
   let onePageProducts = products.slice(offset, offset + pageLimit);

   // this.setState({currentPage, showProducts, totalPages });
   this.setState({currentPage, onePageProducts, totalPages });
 }

 handleSearch(e){
   console.log("handle search in products")
   this.props.handleSearch(e);
   // const offset = (currentPage - 1) * pageLimit;
   let onePageProducts = this.props.showProducts.slice(0, 12);
   this.setState({onePageProducts : onePageProducts})
    // this.setState({totalPages : 4});
   // this.onPageChanged();
 }


}


export default Products;
