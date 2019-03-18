import React, {Component, Fragment} from 'react'

import {Link} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';


import { FormErrors } from './formerrors';

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : "",
      email : "",
      password : "",
      verifyPassword : "",
      address_1 : "",
      day_phone : "",
      formErrors: {email: '', password: ''},
      emailValid: false,
      verifyPasswordValid: false,
      formValid: false,
      modal : false
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
  }
  render(){
    return(
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-8 col-xl-6">
              <div className="row">
                <div className="col text-center">
                  <h1>Register</h1>
                  <p className="text-h3">Research indicates that employees have three prime needs: Interesting work, recognition for doing a good job, and being let in on things that are going on in the company. </p>
                </div>
              </div>
              <div >
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <div className="row align-items-center">
                <div className="col mt-4">
                  <input type="text" className="form-control" placeholder="Your Name" value={this.state.name} onChange={this.handleChange} name="name"/>
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col">
                  <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="row align-items-center mt-4">
                <div className="col">
                  <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                <div className="col">
                  <input type="password" className="form-control" placeholder="Confirm Password" name="verifyPassword" value={this.state.verifyPassword} onChange={this.handleChange} />
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col">
                  <input type="text" className="form-control" placeholder="credit card" name="credit_card" value={this.state.credit_card} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col">
                  <input type="text" className="form-control" placeholder="Mobile Phone" name="mob_phone" value={this.state.mob_phone} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col">
                  <input type="text" className="form-control" placeholder="Postal Code" name="postal_code" value={this.state.postal_code} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="row justify-content-start mt-4">
                <div className="col">
                  <button className="btn btn-primary mt-4" onClick={this.saveCustomer} disabled={!this.state.formValid}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'alert alert-danger');
  }

  handleChange(e){
    e.preventDefault();
    const fieldName = e.target.name;
    const value = e.target.value;
    this.setState({[fieldName] : e.target.value})
    this.validateField(fieldName, value)
  }

  saveCustomer(e){
    e.preventDefault();
    // {name, email, password} = this.state;
    fetch(process.env.REACT_APP_API_URL+'/customer/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:this.state.name,
        password:this.state.password,
        email:this.state.email,
        credit_card:this.state.credit_card,
        mob_phone:this.state.mob_phone,
        postal_code:this.state.postal_code,
      })
    })
    .then((elt) => res => res.json())
    .then((elt) => {
      console.log(elt)
      this.props.history.push('/login')
    })
    .catch((err) => console.log(err))
  }
  validateField(fieldName, value){
     let fieldValidationErrors = this.state.formErrors;
     let emailValid = this.state.emailValid;
     let passwordValid = this.state.passwordValid;
     let verifyPasswordValid = this.state.verifyPasswordValid;

     switch(fieldName) {
       case 'email':
         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
         fieldValidationErrors.email = emailValid ? '' : ' is invalid';
         break;
       case 'password':
         passwordValid = value.length >= 6;
         fieldValidationErrors.password = passwordValid ? '': ' is too short but We don\'t care';
       case 'verifyPassword':
         verifyPasswordValid = value == this.state.password;
         fieldValidationErrors.verifypassword = verifyPasswordValid ? '': ' don\'t match';
         break;
       default:
         break;
     }
     this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid,
                  verifyPasswordValid: verifyPasswordValid,
                }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.verifyPasswordValid});
  }


}



export default Register ;
