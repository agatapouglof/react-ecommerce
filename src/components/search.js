import React, { Component, Fragment } from 'react';
import {CardGroup, Card, Button, Container, Form, FormControl, FormGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



// Search Bar component for the search of items
class SearchBar extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }
  render(){
    return(
      <div className="container-fluid searchbar">
        <div className="row justify-content-center align-items-center">
          <Form inline>
            <FormGroup>
              <FormControl  size="lg" type="text" placeholder="Search For Product" className="mr-sm-2 text-center" onChange={this.props.handleSearch} />
              <Button size="lg" variant="outline-success"><FontAwesomeIcon icon="search" /></Button>
            </FormGroup>
          </Form>
        </div>
      </div>

    );
  }

  // handleSearch(e){
  //   console.log(e.target.value);
  //   let toSearch = e.target.value
  //   // if(this.search){console.log(this.search);}
  //   e.preventDefault();
  //   // console.log(elt);
  // }
}

export default SearchBar;
