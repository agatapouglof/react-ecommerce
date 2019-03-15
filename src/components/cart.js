import React, {Component} from 'react';
import './pages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'



class ProductCart extends Component {
  constructor(props){
    super(props);
    let cart = this.props.cart;
    this.state = {
      products : cart,
      user : null,
      total:null
    }
    this.checkout = this.checkout.bind(this);
  }
  render(){
    const products = this.props.cart  ;
    if(products.length > 0){
      return (
        <React.Fragment>
          <div className="container">
          <table id="cart" className="table table-hover table-condensed">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th> Quantity</th>
                <th  className="text-center">Subtotal</th>
                <th ></th>
              </tr>
            </thead>
            <tbody>
            {products.map((elt) =>{
                return (<CartElement product={elt}  incrementProduct={this.props.incrementProduct} removeFromCart={this.props.removeFromCart} decrementProduct={this.props.decrementProduct}/>);
              })
            }
            </tbody>
            <tfoot>
              <tr>
                <td><Link to="/"><button className="btn btn-outline-warning">Continue Shopping</button></Link> </td>
                <td colSpan="2" className="hidden-xs"></td>
                <td className="hidden-xs text-center"><strong>Total $ {(this.props.totalAmount).toFixed(2)}</strong></td>
                <td><button className="btn btn-success btn-block" onClick={this.checkout}>Checkout <i className="fa fa-angle-right"></i></button></td>
              </tr>
            </tfoot>
          </table>
          </div>
        </React.Fragment>
      );
    }else{
      return (<h3 className="text-center text-danger">No Items in Cart</h3>);
    }
  }

  componentDidMount(){
    const prod = this.props.location.state ? this.props.location.state.newproduct : null;
    let products = this.state.products;
    this.setState({products : products});


    if(prod) {
      prod.qty = 1;
      this.props.addToCart(prod);
      // products.push(prod);
    }
  }

  checkout(e){
    this.props.checkout(e);

  }

}

class CartElement extends Component{
  constructor(props){
    super(props);
    this.state = {product : null, qty : 1};
  }
  render(){
    const product = this.props.product;
    const qty = this.props.product.qty;
    return(
      <React.Fragment>
        <tr>
          <td data-th="Product">
            <div className="row">
              <div className="col-sm-2 hidden-xs "><img src={process.env.REACT_APP_API_URL+'/images/'+product.thumbnail} alt="..." className="img-responsive" /></div>
              <div className="col-sm-1"></div>
              <div className="col-sm-9">
                <h4 className="nomargin mx-2 text-success">{this.props.product.name} </h4>
                <p className="mx-2">{product.description}</p>
              </div>
            </div>
          </td>
          <td data-th="Price">${product.price}</td>
          <td data-th="Quantity">
            <form className="form-inline">
              <div className="input-group row">
                <button className="btn btn-warning btn-sm mr-1" onClick={(e) => this.decrementProduct(e,product.product_id)} ><FontAwesomeIcon icon="minus-circle" /></button>
                <input type="text" className="form-control text-center" placeholder="1" value={this.props.product.qty}/>
                <button className="btn btn-success btn-sm ml-1" onClick={(e) => this.incrementProduct(e,product.product_id)}><FontAwesomeIcon icon="plus-circle" /></button>
              </div>
            </form>
          </td>
          <td data-th="Subtotal" className="text-center">$ {(qty * Number(product.price)).toFixed(2)}</td>
          <td className="actions" data-th="">
            <button className="btn btn-danger btn-sm" onClick={(e) => this.removeFromCart(e,product.product_id)}><FontAwesomeIcon icon="trash" /></button>
          </td>
        </tr>
      </React.Fragment>
    );
  }

  incrementProduct(e, product_id){
    e.preventDefault();
    this.props.incrementProduct(product_id)
  }
  decrementProduct(e, product_id){
    e.preventDefault();
    if(this.props.product.qty > 1){
      this.props.decrementProduct(product_id)
    }
  }
  removeFromCart(e, product_id){
    e.preventDefault();
    this.props.removeFromCart(product_id);
  }
}


export default ProductCart;
