import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spiner";
import Notification from "../layout/Notification";
import PropTypes from "prop-types";

class EditBook extends Component {
  state = {};

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // edit member on db
  handleSubmit = e => {
    e.preventDefault();

    const { firestore, history, book } = this.props;
    firestore.update({
        collection: 'books',
        doc: book.id
    },this.state).then(() => {
        Notification({ title: 'Edited book', message: 'Book  data has edited success', type: 'success' });
        history.push('/');
    });
  };

  render() {
    const { book } = this.props;

    if (!book) {
      return <Spinner />;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h3>
            <i className="fas fa-user-edit"></i> Edit {book.title}
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
                defaultValue={book.title}
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
                defaultValue={book.editor}
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
                defaultValue={book.ISBN}
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
                defaultValue={book.store}
              />
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Edit Book
              </button>
              <Link
                className="btn btn-danger"
                to={`/book/details/${this.props.match.params.id}`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditBook.protoTypes = {
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
  connect(({ firestore: { ordered } }, props) => ({
    book: ordered.book && ordered.book[0]
  }))
)(EditBook);
