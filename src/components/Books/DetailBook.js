import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spiner";
import PropTypes from "prop-types";

class DetailtBook extends Component {
  state = {};

  render() {
    if (!this.props.book) {
      return <Spinner />;
    }

    const { book } = this.props

    return (
      <div className="row mt-5">
        <div className="col-md-6">
          <Link className="btn btn-primary" to="/">
            <i className="fas fa-arrow-alt-circle-left"></i> Got to Books
          </Link>
        </div>
        <div className="col-md-6">
          <Link
            className="btn btn-warning float-right"
            to={`/book/edit/${this.props.match.params.id}`}
          >
            <i className="fas fa-pencil-alt"></i> Edit
          </Link>
        </div>
        <div className="col-md-12">
          <hr className="m-5" />
          <h3 className="mb-4">{book.title}</h3>
          <p>
            <span className="font-weight-bold">Editor: </span>
            {book.editor}
          </p>
          <p>
            <span className="font-weight-bold">ISBN: </span>
            {book.ISBN}
          </p>
          <p>
            <span className="font-weight-bold">In store: </span>
            <span className='badge badge-primary'>{book.store}</span>
          </p>
        </div>
      </div>
    );
  }
}

DetailtBook.propTypes ={
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "books",
      storeAs: "book",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    book: ordered.book && ordered.book[0]
  }))
)(DetailtBook);
