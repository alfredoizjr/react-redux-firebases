import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Notification from "../layout/Notification";
import PropTypes from "prop-types";

class AddBook extends Component {
  state = {
    title: "",
    editor: "",
    ISBN: "",
    store: 0,
    shared: []
  };

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { firestore, history } = this.props

    firestore.add({
        collection: 'books'
    },this.state).then(() => {
        Notification({ title: 'Create book', message: 'New book has create success', type: 'success' });
        history.push('/');
    })
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12 m-4">
          <Link className="btn btn-primary" to={"/"}>
            <i className="fas fa-arrow-alt-circle-left"></i> Go to the list{" "}
          </Link>
          <hr />
        </div>
        <div className="col-md-6 offset-md-3">
          <h3>
            <i className="fas fa-book-plus"></i> Create Book
          </h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editor">editor</label>
              <input
                type="text"
                className="form-control"
                id="editor"
                placeholder="Enter editor"
                name="editor"
                onChange={this.handleChange}
                value={this.state.editor}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                placeholder="Enter ISBN"
                name="ISBN"
                onChange={this.handleChange}
                value={this.state.ISBN}
              />
            </div>
            <div className="form-group">
              <label htmlFor="store">In store</label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="store"
                placeholder="In store"
                name="store"
                onChange={this.handleChange}
                value={this.state.career}
              />
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Create Book
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddBook.protoTypes ={
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddBook);
