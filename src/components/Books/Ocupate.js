import React from "react";

const Ocupate = ({ member,returnBook }) => {
  return (
    <div className="card bg-primary text-white">
      <div className="card-body">
        <p>
          {member.name} {member.last} <b>Date of request:</b> {member.date_request}
        </p>
        <p>
          <span className="font-weight-bold">Career: </span>
          <span className="badge badge-primary">{member.career}</span>
          <br />
          <span className="font-weight-bold">Code: </span>
          <span className="badge badge-primary">{member.code}</span>
        </p>
      </div>
      <div className="card-footer text-right">
          <button className='btn btn-danger'onClick={() => returnBook(member.code)} >Release the book</button>
      </div>
    </div>
  );
};

export default Ocupate;
