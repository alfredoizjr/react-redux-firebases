import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from 'prop-types';

class Navbar extends Component {
  state = {
    isLogin: false
  };

  // logout
  logOut = () => {
    const { firebase } = this.props;
    firebase.logout();
  }

  // get the porps auto
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isLogin: true };
    } else {
      return { isLogin: false };
    }
  }

  render() {
    const { isLogin } = this.state;
    const { auth } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {isLogin ? (
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/">
                  Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/subcribers"
                >
                  Subcribers
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a href="#!" className="nav-link">{auth.email}</a>
              </li>
              <li className="nav-item active">
                <button type='button' className='btn btn-danger' onClick={this.logOut}>logout</button>
              </li>
              </ul>
          </div>
        ) : null}
      </nav>
    );
  }
}

Navbar.protoTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
