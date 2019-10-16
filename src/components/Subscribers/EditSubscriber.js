import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spiner";
import Notification from "../layout/Notification";
import PropTypes from "prop-types";

class EditSubcriber extends Component {
  state = {};

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // edit member on db
  handleSubmit = e => {
    e.preventDefault();

    // get firestore and history from props
    const { subscriber, firestore, history } = this.props;

    // save in db
    firestore.update({
        collection: 'subscribers',
        doc: subscriber.id
    },this.state).then(() => {
        Notification({ title: 'Edited member', message: 'Member  profile has edited success', type: 'success' });
        history.push('/subcribers');
    })
  };

  render() {
    const { subscriber } = this.props;
    if (!subscriber) {
      return <Spinner />;
    }
    return (
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h3>
            <i className="fas fa-user-edit"></i> Edit {subscriber.name}
          </h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Edit Name"
                name="name"
                onChange={this.handleChange}
                defaultValue={subscriber.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last">Last</label>
              <input
                type="text"
                className="form-control"
                id="last"
                placeholder="Edit Last name"
                name="last"
                onChange={this.handleChange}
                defaultValue={subscriber.last}
              />
            </div>
            <div className="form-group">
              <label htmlFor="career">Career</label>
              <input
                type="text"
                className="form-control"
                id="career"
                placeholder="Edit Your Career"
                name="career"
                onChange={this.handleChange}
                defaultValue={subscriber.career}
              />
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
              <Link className='btn btn-danger' to={`/subcriber/${this.props.match.params.id}`}>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditSubcriber.protoTypes = {
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
)(EditSubcriber);
