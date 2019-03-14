import React, {Component} from 'react';
import './pages.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';



class Product extends Component {
  render(){
    console.log(this.props.addToCart);
    const inCart = true;
    return (
      <React.Fragment>
        <div className="productwrapper col-9 mx-auto col-md-6 col-lg-3 my-3">
          <div className="card border-primary">
            <Link to={{
                pathname : "/details",
                state : { product : this.props.product }
              }}>
            <div className="lor img-container p-5" onClick={() => console.log("clicked on Image")}>
                <img src={process.env.REACT_APP_API_URL+"/images/"+this.props.product.image}  className="card-img-top"/>
              {/*<button className="cart-btn" disabled={inCart ? true : false} onClick={() => console.log("added to the cart")}>
              {inCart?(<p className="text-capitalize mb-0" disabled> in cart </p>) : <FontAwesomeIcon icon="shopping-cart" />}
            </button>*/}
            </div>
            <div className="card-body ">
              <h4 className="taille text-center text-dark align-self-center mb-0">
                {this.props.product.name}
              </h4>
              <h5 className="text-center text-success font-italic mb-0">
                <span className="mr-1">$</span>
                {this.props.product.price}
              </h5>
            </div>
            <div className="lor card-footer d-flex justify-content-between">
              <p className="align-self-center mb-0">
                {this.props.product.name}
              </p>
              <h5 className="text-blue font-italic mb-0">
                <span className="mr-1">$</span>
                {this.props.product.price}
              </h5>
            </div>
          </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount(){
    // console.log("product did mount",this.props);
  }
}


export default Product;
