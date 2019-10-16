import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spiner";
import PropTypes from 'prop-types';

const ShowSubcriber = props => {
  const { subscriber } = props;

  if (!subscriber) {
    return <Spinner />;
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6">
        <Link className="btn btn-primary" to="/subcribers">
          <i className="fas fa-arrow-alt-circle-left"></i> Got to Subscribers{" "}
        </Link>
      </div>
      <div className="col-md-6">
        <Link
          className="btn btn-warning float-right"
          to={`/edit/${props.match.params.id}`}
        >
          <i className="fas fa-pencil-alt"></i> Edit
        </Link>
      </div>
      <div className="col-md-12">
        <hr className="m-5" />
        <h3 className="mb-4">
          {subscriber.name} {subscriber.last}
        </h3>
        <p>
          <span className="font-weight-bold">Career: </span>
          {subscriber.career}
        </p>
        <p>
          <span className="font-weight-bold">Code: </span>
          {subscriber.code}
        </p>
      </div>
    </div>
  );
};

ShowSubcriber.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "subscribers",
      storeAs: "subscriber",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    subscriber: ordered.subscriber && ordered.subscriber[0]
  }))
)(ShowSubcriber);
