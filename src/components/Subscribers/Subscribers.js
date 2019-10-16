import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spiner";
import Notification from '../layout/Notification';

const Subscribers = ({ subscribers, firestore }) => {

  // weating for data
  if (!subscribers) return <Spinner />;
  // remove a subcriber
 const  removeSusbcriber = id => {

  firestore.delete({
    collection: 'subscribers',
    doc: id
  }).then(()=>{ 

    Notification({title: 'Remove member', message: 'The Member has been deleted',type: 'warning'});
})

 }

  return (
    <div className="row">
      <div className="col-md-12 m-4">
          <Link className='btn btn-primary' to='/new'><i className='fas fa-plus'></i> Add new user</Link>
      </div>
      <div className="col-md-12 mt-2">
        <h3>
          <i className="fas fa-users"></i> Subscribers
        </h3>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Carrer</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(sub => (
              <tr key={sub.id}>
                <td>
                  {sub.name} {sub.last}
                </td>
                <td>{sub.career}</td>
                <td>
                  <Link className="btn btn-success" to={`/edit/${sub.id}`}>
                    <i className="fas fa-angle-double-right"></i> More
                    information
                  </Link>
                  <button type='button' className='btn btn-danger' onClick={() => removeSusbcriber(sub.id)}> <i className='fas fa-trash-alt'></i> Remove</button>
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
  firestoreConnect([{ collection: "subscribers" }]),
  connect((state, props) => ({
    subscribers: state.firestore.ordered.subscribers
  }))
)(Subscribers);
