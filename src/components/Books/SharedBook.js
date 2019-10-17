import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spiner";
import Notification from "../layout/Notification";
import PropTypes from "prop-types";

import DataSubcriber from "../Subscribers/DataSubcriber";

// redusx action
import { searchForUser } from "../../actions/searchUserAction";

class SharedBook extends Component {
  state = {
    search: "",
    notResults: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // get firestore from props
    const { firestore, searchForUser } = this.props;
    // send the query
    const collection = firestore.collection("subscribers");
    const query = collection.where("code", "==", this.state.search).get();

    //read the results
    query.then(res => {
      if (res.empty) {
        // store empty object on state of reduxer
        // update state
        searchForUser({});
        this.setState({
          notResults: true
        });
      } else {
        // store result on state of redux
        const data = res.docs[0];
        searchForUser(data.data());
        // update state
        this.setState({
          notResults: false
        });
      }
    });
  };

  // store the member request the book
  sendRquestBook = () => {
    const { user } = this.props;
    // date issue
    user.date_request = new Date().toLocaleDateString();
    // copy the props
    let requestToShared = [];
    requestToShared = [...this.props.book.shared, user];
    // get firestore and history
    const { firestore, history } = this.props;
    // get a copy of book object and add the new data
    const bookCopy = { ...this.props.book };
    // delete previus shareds data
    delete bookCopy.shared;

    // set the shareds back
    bookCopy.shared = requestToShared;
    // update the bd
    
    firestore
      .update(
        {
          collection: "books",
          doc: bookCopy.id
        },
        bookCopy
      )
      .then(() => {
        Notification({
          title: "Book shared",
          message: "The book was request has shared success",
          type: "success"
        });
        history.push("/");
      });
  };



  render() {
    const { book, user } = this.props;

    if (!book) {
      return <Spinner />;
    }

    let showData, btnRequets;

    if (user.name) {
      showData = <DataSubcriber subcriber={user} />;
      btnRequets = (
        <button
          className="btn btn-primary btn-block"
          onClick={this.sendRquestBook}
        >
          Request the book
        </button>
      );
    } else {
      showData = null;
      btnRequets = null;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-12 mb-4">
          <Link className="btn btn-primary" to={"/"}>
            <i className="fas fa-arrow-alt-circle-left"></i> Go to list of books
          </Link>
        </div>
        <div className="col-md-6 offset-md-3">
          <hr />
          <h3 className="p-4">
            <i className="fas fa-book"></i> Request of the book {book.title}
          </h3>
          <form onSubmit={this.handleSubmit} className="mb-4">
            <legend className="text-center">Search for the subcriber</legend>
            <div className="form-group">
              <input
                className="form-control"
                name="search"
                type="text"
                placeholder="enter code of subcriber"
                onChange={this.handleChange}
              />
            </div>
            <button type="input" className="btn btn-success btn-block">
              Search
            </button>
          </form>

          {showData}
          {btnRequets}
        </div>
      </div>
    );
  }
}

SharedBook.protoTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "subscribers",
      storeAs: "book",
      doc: props.match.params.id
    }
  ]),
  connect(
    ({ firestore: { ordered }, user }, props) => ({
      book: ordered.book && ordered.book[0],
      user: user
    }),
    { searchForUser }
  )
)(SharedBook);
