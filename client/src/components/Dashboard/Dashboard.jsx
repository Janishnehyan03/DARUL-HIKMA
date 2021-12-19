import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="main-container">
      <div className="heading">
        <h1 className="heading__title">ADMIN DASHBOARD </h1>
      </div>
      <div className="cards">
        <div className="card card-1">
          <h1 className="card__head">Books </h1>
          <h2 className="card__head"></h2>
          <Link to="/add-book">
            <p className="card__apply">
              <button className="card__link">Add Book</button>
            </p>
          </Link>
        </div>
        <div className="card card-1">
          <h1 className="card__head">Users</h1>
          <h2 className="card__head"></h2>
          <Link to="/users">
            <p className="card__apply">
              <button className="card__link">Activate Accounts </button>
            </p>
          </Link>
        </div>
        {user.role === "admin" ? (
          <div className="card card-1">
            <h1 className="card__head">Users </h1>
            <h2 className="card__head"></h2>
            <Link to="/add-user">
              <p className="card__apply">
                <button className="card__link">Add User</button>
              </p>
            </Link>
          </div>
        ) : null}
        <div className="card card-1">
          <h1 className="card__head">Useful Links </h1>
          <h2 className="card__head"></h2>
          <Link to="/add-link">
            <p className="card__apply">
              <button className="card__link">Add Link</button>
            </p>
          </Link>
        </div>
        <div className="card card-1">
          <h1 className="card__head">Categories </h1>
          <h2 className="card__head"></h2>
          <Link to="/add-category">
            <p className="card__apply">
              <button className="card__link">Create Category</button>
            </p>
          </Link>
        </div>
        <div className="card card-1">
          <h1 className="card__head">Sub Categories </h1>
          <h2 className="card__head"></h2>
          <Link to="/sub-category">
            <p className="card__apply">
              <button className="card__link">Create Sub Category</button>
            </p>
          </Link>
        </div>
        <div className="card card-1">
          <h1 className="card__head">Student Corner</h1>
          <h2 className="card__head"></h2>
          <Link to="/add-studentCorner">
            <p className="card__apply">
              <button className="card__link">Create Student Corner</button>
            </p>
          </Link>
        </div>
        <div className="card card-1">
          <h1 className="card__head">Feedbacks</h1>
          <h2 className="card__head"></h2>
          <Link to="/feedbacks">
            <p className="card__apply">
              <button className="card__link">View Feedbacks</button>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
