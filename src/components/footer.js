import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Footer extends Component{
  render(){
    return(
    <footer className="footer mt-5 bg-light navbar-fixed-bottom">
      <div className="container">
        <span className="text-muted">
        <p>
        &copy; 2019 <strong>Agatpouglof</strong> T-shirt Store
        </p>
        </span>
        <a
        href="https://github.com/agatapouglof/react-ecommerce"
        target="_blank"
        >
        View Source on Github
        </a>
      </div>
    </footer>


    );
  }
}

export default Footer
