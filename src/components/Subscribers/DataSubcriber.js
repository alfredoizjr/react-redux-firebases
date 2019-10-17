import React from 'react';

const DataSubcriber = ({subcriber}) => {
    return (
        <div className='card my-3'>
            <h3 className='card-header bg-primary text-white'>
            Results request
            </h3>
            <div className='card-body'>
                <p className='font-weight-bold'>
                    Name: <span className='font-weight-normal'>{subcriber.name} {subcriber.last}</span>
                </p>
                <p className='font-weight-bold'>
                    Career: <span className='font-weight-normal'>{subcriber.career}</span>
                </p>
                <p className='font-weight-bold'>
                    Code: <span className='font-weight-normal'>{subcriber.code}</span>
                </p>
            </div>
        </div>
    );
}

export default DataSubcriber;