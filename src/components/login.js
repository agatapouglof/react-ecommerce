import React, {Component, Fragment} from 'react'

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : "",
      email : "",
      password : "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.LogCustomer = this.LogCustomer.bind(this);
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
                  <h1>Login</h1>
                  <p class="text-h3">Log in to Enjoy the app more. </p>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col mt-4">
                  <label>Email </label>
                  <input type="email" class="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
              </div>
              <div class="row align-items-center mt-4">
                <div class="col">
                  <label>Password </label>
                  <input type="password" class="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
              </div>
              <div class="row justify-content-start mt-4">
                <div class="col">
                  <button class="btn btn-primary mt-4" onClick={this.LogCustomer}>Submit</button>
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
      }
    })
    .catch((err) => console.log(err))
  }
}



export default Login ;
