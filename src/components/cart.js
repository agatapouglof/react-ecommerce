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
              <tr className="visible-xs">
                <td className="text-center"><strong>Total 1.99</strong></td>
              </tr>
              <tr>
                <td><Link to="/"><button className="btn btn-outline-warning">Continue Shopping</button></Link> </td>
                <td colSpan="2" className="hidden-xs"></td>
                <td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
                <td><a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a></td>
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
    console.log("cart props", this.props);
    const prod = this.props.location.state ? this.props.location.state.newproduct : null;
    let products = this.state.products;
    this.setState({products : products});


    if(prod) {
      prod.qty = 1;
      this.props.addToCart(prod);
      // products.push(prod);
    }
    console.log(products);
  }

}

class CartElement extends Component{
  constructor(props){
    super(props);
    console.log(props);
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
              <div className="col-sm-2 hidden-xs"><img src={'http://localhost:4000/images/'+product.thumbnail} alt="..." className="img-responsive" /></div>
              <div className="col-sm-10">
                <h4 className="nomargin">{this.props.product.name} {this.props.product.id}</h4>
                <p>{product.description}</p>
              </div>
            </div>
          </td>
          <td data-th="Price">${product.price}</td>
          <td data-th="Quantity">
            <form className="form-inline">
              <div className="input-group">
                <button className="btn btn-warning btn-sm mr-1" onClick={(e) => this.decrementProduct(e,product.product_id)} ><FontAwesomeIcon icon="minus-circle" /></button>
                <input type="text" className="form-control text-center" placeholder="1" value={this.props.product.qty} onChange={this.editQuantity.bind(this)}/>
                <button className="btn btn-success btn-sm ml-1" onClick={(e) => this.incrementProduct(e,product.product_id)}><FontAwesomeIcon icon="plus-circle" /></button>
              </div>
            </form>
          </td>
          <td data-th="Subtotal" className="text-center">$ {qty * Number(product.price)}</td>
          <td className="actions" data-th="">
            <button className="btn btn-info btn-sm"><FontAwesomeIcon icon="sync-alt" /></button>
            <button className="btn btn-danger btn-sm" onClick={(e) => this.removeFromCart(e,product.product_id)}><FontAwesomeIcon icon="trash" /></button>
          </td>
        </tr>
      </React.Fragment>
    );
  }

  componentDidMount(){
    console.log("cart element mounted");
    console.log("cart props", this.props);
  }
  editQuantity(){
    console.log('edit Quantity');
    // this.setState({qty : })
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
