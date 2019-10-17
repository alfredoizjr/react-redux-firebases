import React, { Component } from "react";
import { firebaseConnect } from 'react-redux-firebase';
import Notification from '../layout/Notification';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = e => {
      e.preventDefault();
      // get firebase
      const { firebase } = this.props;

      // get data
      const { email, password } = this.state;

      firebase.login({
          email,
          password
      }).then(res => {
          Notification({ title: 'Welcome', message: 'the login was success', type: 'success' });
      }).catch(err => {
          Notification({ title: 'Invalid credential', message: err.message, type: 'danger' });
          this.setState({
              email:'',
              password:''
          })
      })
  }

  render() {

    

    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className='card-body'>
            <h2 className="text-center py-4">
              <i className="fas fa-lock"></i> 
              Login
            </h2>
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'></label>
                    <input 
                        id='email'
                        type='email'
                        name='email'
                        required
                        className='form-control'
                        value={this.state.email}
                        placeholder='Enter your email'
                        onChange={this.handleChange}
                        
                    />
                </div>
                <div className='form-group'>
                <label htmlFor='password'></label>
                    <input 
                        id='password'
                        type='password'
                        name='password'
                        required
                        className='form-control'
                        value={this.state.password}
                        placeholder='Enter your email'
                        onChange={this.handleChange}
                        
                    />
                </div>
                <button className='btn btn-primary btn-block' >login</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.protoTypes = {
    firebase: PropTypes.object.isRequired,
  }

export default firebaseConnect()(Login);
