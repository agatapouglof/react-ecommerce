import React from 'react'
import PropTypes from 'prop-types'

const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  constructor(props){
    super(props);
    this.state  = {
      isLoaded : false,
      items : null,
      product : null
    }
  }
  render () {
    const products = this.state.items;
    return(
      <ProductContext.Provider value={{
        ...this.state,
        handleDetails : this.handleDetails,
        addToCart : this.addToCart
      }}>

        {this.props.children}
      </ProductContext.Provider>
    )
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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

  handleDetails(){
    console.log("TO HANDLE PRODUCT DETAILS")
  }
  addToCart(){
    console.log("ADD A PRODUCT TO CARD")
  }

}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer} ;
