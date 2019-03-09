import React, {Component} from 'react';
import './pages.css';


class ProductCart extends Component {
  constructor(props){
    super(props);
    this.state = {
      products : [],
      user : null,
      total:null
    }
  }
  render(){
    const products = this.state.products;
    // {products.map((elt) =>{
      //
      // });}
    if(products.length > 0){
      return (
        <React.Fragment>
        <CartElement product={products[0]}/>
        </React.Fragment>
      );
    }else{
      return (<h3 className="text-center text-danger">No Items in Cart</h3>);
    }
  }

  componentDidMount(){
    // console.log(this.props.location.state);
    const prod = this.props.location.state ? this.props.location.state.newproduct : null;
    const products = this.state.products;
    if(prod) {
      products.push(prod);
      this.setState({products : products});
    };
    console.log(products);
    // this.setState({pr})
  }
}

class CartElement extends Component{
  render(){
    return(
      <React.Fragment>
      <div className="container">
      <table id="cart" className="table table-hover table-condensed">
        <thead>
          <tr>
            <th style= {{ width:'50%' }}>Product</th>
            <th style={{width:'10%'}}>Price</th>
            <th style={{width:'8%'}}>Quantity</th>
            <th style={{width:'22%'}} className="text-center">Subtotal</th>
            <th style={{width:'10%'}}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-th="Product">
              <div className="row">
                <div className="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." className="img-responsive" /></div>
                <div className="col-sm-10">
                  <h4 className="nomargin">{this.props.product.name} {this.props.product.id}</h4>
                  <p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </td>
            <td data-th="Price">$1.99</td>
            <td data-th="Quantity">
              <input type="number" className="form-control text-center" value="1"/>
            </td>
            <td data-th="Subtotal" className="text-center">1.99</td>
            <td className="actions" data-th="">
              <button className="btn btn-info btn-sm"><i className="fa fa-refresh"></i></button>
              <button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="visible-xs">
            <td className="text-center"><strong>Total 1.99</strong></td>
          </tr>
          <tr>
            <td><a href="#" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
            <td colSpan="2" className="hidden-xs"></td>
            <td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
            <td><a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a></td>
          </tr>
        </tfoot>
      </table>
      </div>
      </React.Fragment>
    );
  }
}


export default ProductCart;
