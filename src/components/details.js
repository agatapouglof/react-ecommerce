import React, {Component} from 'react';
import {ProductConsumer} from '../context';
import { Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'

import './pages.css';


class Details extends Component {
  constructor(props){
    super(props);
    // console.log(this.props.location.state);
    this.state = {product : null};
  }
  render(){
    // const product = this.props.location.state.product;

    // this.setState({product : product});
    // {this.state.product}
    const product = this.state.product;
    if(product){
      return(
        <div className="container py-5">
          <div className="row">
            <div className="col-10 mx-auto text-center my-5 text-success">
              <h1>{product.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3 text-center text-capitalize">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuVpiC7KWb48BX-LKcPKvaB1kd2iOAisZ_hMX46B_f7vvjLCDe" className="img-fluid" alt="product"/>
            </div>
            <div className="col-10 mx-auto col-md-6 my-3 text-center text-capitalize">
              <h2>text</h2>
              <h2 className="text-muted">text</h2>
              <h2>text</h2>
              <div>
                <Link to="/">
                  <Button variant="outline-warning">
                    Back to Products !
                  </Button>
                </Link>
                <Button variant="outline-primary" className="ml-3"> Add to Cart </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <React.Fragment>
          NO DATA ON THE PRODUCT
        </React.Fragment>
      );
    }
  }

  componentDidMount(){
    console.log("component did mount", this.props.location.state.product)
    if(this.props.location){
      this.setState({product  : this.props.location.state.product});
    }
  }
}


export default Details;
