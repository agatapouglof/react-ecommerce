import React, {Component, Fragment} from 'react'

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : "",
      email : "",
      password : "",
      verifyPassword : "",
      address_1 : "",
      day_phone : ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
  }
  render(){
    return(
      <section>
      {this.state.name.toUpperCase()}
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-8 col-xl-6">
              <div class="row">
                <div class="col text-center">
                  <h1>Register</h1>
                  <p class="text-h3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col mt-4">
                  <input type="text" class="form-control" placeholder="Your Name" value={this.state.name} onChange={this.handleChange} name="name"/>
                </div>
              </div>
              <div class="row align-items-center mt-4">
                <div class="col">
                  <input type="email" class="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
              </div>
              <div class="row align-items-center mt-4">
                <div class="col">
                  <input type="password" class="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                <div class="col">
                  <input type="password" class="form-control" placeholder="Confirm Password" name="verifyPassword" value={this.state.verifyPassword} onChange={this.handleChange} />
                </div>
              </div>
              <div class="row justify-content-start mt-4">
                <div class="col">
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" class="form-check-input" />
                      I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
                    </label>
                  </div>

                  <button class="btn btn-primary mt-4" onClick={this.saveCustomer}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  handleChange(e){
    e.preventDefault();
    const name = e.target.name;
    console.log(name);
    // this.setState({company : e.target.value})
    this.setState({[name] : e.target.value})
  }

  saveCustomer(e){
    e.preventDefault();
    // {name, email, password} = this.state;
    fetch('http://localhost:4000/customer/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:this.state.name,
        password:this.state.password,
        email:this.state.email,
      })
    })
    .then((elt) => console.log(elt))
    .catch((err) => console.log(err))
  }
}



export default Register ;
