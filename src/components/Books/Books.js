import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spiner";
import Notification from "../layout/Notification";

const Books = ({ books, firestore }) => {
  const removeBook = id => {
    firestore
      .delete({
        collection: "books",
        doc: id
      })
      .then(() => {
        Notification({
          title: "Remove book",
          message: "The book has been deleted",
          type: "warning"
        });
      });
  };

  if (!books) {
    return <Spinner />;
  }

  return (
    <div className="row">
      <div className="col-md-12 m-4">
        <Link className="btn btn-primary" to="/book/add">
          <i className="fas fa-plus"></i> Add new book
        </Link>
      </div>
      <div className="col-md-12 mt-2">
        <h3>
          <i className="fas fa-book"></i> Books
        </h3>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Editor</th>
              <th scope="col">ISBN</th>
              <th scope="col">In Store</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.editor}</td>
                <td>{book.ISBN}</td>
                <td>{book.store}</td>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`book/details/${book.id}`}
                  >
                    <i className="fas fa-angle-double-right"></i> More
                    information
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeBook(book.id)}
                  >
                    <i className="fas fa-trash-alt"></i> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect([{ collection: "books" }]),
  connect((state, props) => ({
    books: state.firestore.ordered.books
  }))
)(Books);
