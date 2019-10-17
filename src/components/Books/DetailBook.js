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

    let btnRequestBook = (book.store - book.shared.length > 0)
      ? <Link className='btn btn-success' to={`/book/search/${book.id}`} >Rquest this book</Link>
      : null;

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
        <div className='col-md-12'>
          <hr className="m-5" />
        </div>
        <div className="col-md-6">

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
          <p>
            <span className="font-weight-bold">Avaliable: </span>
            <span className='badge badge-primary'>{book.store - book.shared.length}</span>
          </p>
          {btnRequestBook}
        </div>
        <div className='col-md-6'>
          <h3 className="mb-4">This book is ocupate by</h3>
          {book.shared.map(member => (
            <div key={member.code} className='card bg-primary text-white'>
              <div className='card-body'>
                {member.name} {member.last}
                <p>
                  <span className="font-weight-bold">Career: </span>
                  <span className='badge badge-primary'>{member.career}</span>
                </p>
                <p>
                  <span className="font-weight-bold">Code: </span>
                  <span className='badge badge-primary'>{member.code}</span>
                </p>
              </div>
              <div className='card-footer'>
                {member.date_request}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DetailtBook.propTypes = {
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
