import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spiner";
import Notification from "../layout/Notification";
import PropTypes from "prop-types";

import DataSubcriber from '../Subscribers/DataSubcriber'

class SharedBook extends Component {
    state = {
        search: '',
        notResults: false,
        result: {}
    }


    handleChange = e => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();



        // get firestore from props
        const { firestore } = this.props
        // send the query
        const collection = firestore.collection('subscribers');
        const query = collection.where('code', '==', this.state.search).get();

        //read the results
        query.then(res => {
            if (res.empty) {
                this.setState({
                    notResults: false,
                    result: {}
                })
            } else {
                const data = res.docs[0];
                this.setState({
                    result: data.data(),
                    notResults: false
                })
            }
        })

    }

    // store the member request the book
    sendRquestBook = () => {
        const member = this.state.result;
        // date issue
        member.date_request = new Date().toLocaleDateString();
        // get book
        const bookWasRequest = this.props.book;
        // add the member to the book shared
        bookWasRequest.shared.push(member);
        // get firestore and history
        const { firestore, history,book } = this.props;
        // uodate the bd
        firestore.update({
            collection: 'books',
            doc: book.id
        },bookWasRequest)
        .then(() => {
            Notification({ title: 'Book shared', message: 'The book was request has shared success', type: 'success' });
            history.push('/');
        })

    }

    render() {

        const { book } = this.props;
        const { notResults, result } = this.state;

        if (!book) {
            return <Spinner />;
        }

        let showData, btnRequets

        if (result.name) {
            showData = <DataSubcriber subcriber={result} />
            btnRequets = <button className='btn btn-primary btn-block' onClick={this.sendRquestBook}>Request the book</button>
        } else {
            showData = null;
            btnRequets = null;
        }

        return (
            <div className='row mt-5'>
                <div className='col-md-12 mb-4'>
                    <Link className='btn btn-primary' to={'/'} ><i className='fas fa-arrow-alt-circle-left'></i> Go to list of books</Link>
                </div>
                <div className="col-md-6 offset-md-3">
                    <hr />
                    <h3 className='p-4'>
                        <i className="fas fa-book"></i> Request of the book {book.title}
                    </h3>
                    <form onSubmit={this.handleSubmit} className='mb-4'>
                        <legend className='text-center'>Search for the subcriber</legend>
                        <div className='form-group'>
                            <input
                                className='form-control'
                                name='search'
                                type='text'
                                placeholder='enter code of subcriber'
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type='input' className='btn btn-success btn-block'>Search</button>
                    </form>

                    {showData}
                    {btnRequets}

                </div>
            </div>
        );
    }
}

SharedBook.protoTypes = {
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
)(SharedBook);
