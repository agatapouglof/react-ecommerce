import React, {Component, Fragment} from 'react'
import {Button, Modal} from 'react-bootstrap';

import {Link} from 'react-router-dom';

import { FormErrors } from './formerrors';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : "",
      email : "",
      password : "",
      formErrors: {email: '', password: ''},
      emailValid: false,
      formValid: false,
      modal : false
    }
    this.handleChange = this.handleChange.bind(this);
    this.LogCustomer = this.LogCustomer.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  render(){
    return(
      <section>
      {this.state.name.toUpperCase()}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-8 col-xl-6">
              <div className="row">
                <div className="col text-center">
                  <h1>Login</h1>
                  <p className="text-h3">Log in to Enjoy the app more. </p>
                    <Link to="/register">
                      <p className="text-h3">Or Sing In</p>
                    </Link>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col mt-4">
                  <label>Email </label>
                    <div className={`${this.errorClass(this.state.formErrors.email)}`}>
                      <FormErrors formErrors={this.state.formErrors} />
                    </div>
                  <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col">
                  <label>Password </label>
                  <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
              </div>
              <div className=" align-items-center mx-auto row justify-content-start mt-4">
                <div className="col">
                  <button className="btn btn-primary mt-4" onClick={this.LogCustomer} disabled={!this.state.formValid}>Submit</button>
                </div>

              </div>
            </div>
          </div>
        </div>



        <Modal show={this.state.modal} >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're now logged in the App !</Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>

      </section>
    )
  }

  handleChange(e){
    e.preventDefault();
    const fieldName = e.target.name;
    const value = e.target.value;
    // console.log(name);
    this.setState({[fieldName] : e.target.value})
    this.validateField(fieldName, value)
    // this.setState({company : e.target.value})
  }

  LogCustomer(e){
    e.preventDefault();
    // {name, email, password} = this.state;
    fetch(process.env.REACT_APP_API_URL+'/customer/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password:this.state.password,
        email:this.state.email,
      })
    })
    .then(
      response => response.json(), //ADDED >JSON() HERE

      error => console.log('An error occurred.', error)
    )
    .then((elt) => {
      console.log(elt)
      if(elt){
        localStorage.setItem('user', JSON.stringify(elt));
        this.handleModal();
      }
    })
    .catch((err) => console.log(err))
  }



  validateField(fieldName, value){
     let fieldValidationErrors = this.state.formErrors;
     let emailValid = this.state.emailValid;
     let passwordValid = this.state.passwordValid;

     switch(fieldName) {
       case 'email':
         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
         fieldValidationErrors.email = emailValid ? '' : ' is invalid';
         break;
       case 'password':
         passwordValid = value.length >= 6;
         fieldValidationErrors.password = passwordValid ? '': ' is too short but We don\'t care';
         break;
       default:
         break;
     }
     this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid
                }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid});
  }
  errorClass(error) {
  return(error.length === 0 ? '' : 'alert alert-danger');
}
handleModal(){
  console.log("close");
  this.setState({modal : true})
  setTimeout((() =>{
    this.setState({modal : false});
    this.props.history.push('/cart')

  }) , 2000)
}

}

export default Login ;
