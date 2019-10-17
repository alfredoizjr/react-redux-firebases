import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spiner";
import Notification from "../layout/Notification";
import PropTypes from "prop-types";
import Ocupate from "./Ocupate";

class DetailtBook extends Component {

  returnBook = code => {
    // get firestore from props
    const {firestore, book } = this.props;
    // copy of the book
    const updateBook = {...book};
    console.log(updateBook);

    // remove the member is retunt it
    const requestBook = book.shared.filter(( element )=> element.code !== code);
    updateBook.shared = requestBook;

    firestore.update({
      collection: 'books',
      doc: updateBook.id
    },updateBook).then(() => {
      Notification({ title: 'Return Book', message: 'Book is return success', type: 'success' });
    })

  };

  render() {
    if (!this.props.book) {
      return <Spinner />;
    }

    const { book } = this.props;

    let btnRequestBook =
      book.store - book.shared.length > 0 ? (
        <Link className="btn btn-success" to={`/book/search/${book.id}`}>
          Rquest this book
        </Link>
      ) : null;

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
            <span className="badge badge-primary">{book.store}</span>
          </p>
          <p>
            <span className="font-weight-bold">Avaliable: </span>
            <span className="badge badge-primary">
              {book.store - book.shared.length}
            </span>
          </p>
          {btnRequestBook}
        </div>
        <div className="col-md-6">
          <h3 className="mb-4">This book is ocupate by</h3>
          {book.shared.map(member => (
            <Ocupate
              key={member.code}
              member={member}
              returnBook={this.returnBook}
            />
          ))}
        </div>
      </div>
    );
  }
}

DetailtBook.propTypes = {
  firestore: PropTypes.object.isRequired
};

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
