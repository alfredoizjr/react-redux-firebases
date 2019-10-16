import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Notification from '../layout/Notification'

import PropTypes from 'prop-types';

class NewSubcriber extends Component {

    state = {
        name: '',
        last: '',
        career: '',
        code: '',
        error: {
            name: null,
            last: null,
            career: null
        }
    }

    hasError = []

    // get the values from the fields
    handleChange = e => {

        this.setState({
            [e.target.name]: e.target.value,
            code: uuid()
        })

    }

    // handle submit
    handleSubmit = e => {

        e.preventDefault();

        // get values from state
        const newSubcriber = this.state

        // get firestore  from props
        const { firestore, history } = this.props

            // save on firestore
            firestore.add({
                collection: 'subscribers'
            }, newSubcriber)
                .then(() => {
                    Notification({ title: 'Create member', message: 'New member has create success', type: 'success' });
                    history.push('/subcribers');
                })




    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12 m-4'>
                    <Link className='btn btn-primary' to={'/subscribers'}><i className='fas fa-arrow-alt-circle-left'></i> Go to the list </Link>
                    <hr />
                </div>
                <div className='col-md-6 offset-md-3'>
                    <h3><i className='fas fa-user-plus'></i> Create Subscripter</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter Name"
                                name="name"
                                onChange={this.handleChange}
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last">Last</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last"
                                placeholder="Enter Last name"
                                name='last'
                                onChange={this.handleChange}
                                value={this.state.last}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="career">Career</label>
                            <input
                                type="text"
                                className="form-control"
                                id="career"
                                placeholder="Enter Your Career"
                                name='career'
                                onChange={this.handleChange}
                                value={this.state.career}
                            />
                        </div>
                        <div className='text-right'>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

NewSubcriber.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewSubcriber);