import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import "../Home.css";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

function Card({ title, url, view }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  let baseUrl = "http://192.168.100.2:5000";
  const loadBooks = async () => {
    try {
      setLoading(true);
      let response = await Axios.get(
        `/api/v1/book?limit=12&category=${url}&category=${title}`
      );
      console.log(response.data.data);
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(true);
    }
  };
  useEffect(() => {
    loadBooks();
  }, []);
  return (
    <div className="row-card">
      <>
        {loading ? (
          <div className="skeleton">
            <CircularProgress />
          </div>
        ) : (
          <>
            <h3 className="card-header">{title}</h3>
            {books.map((book, index) => (
              <div key={index}>
                <Link style={{ color: "black" }} to={`/view/` + book._id}>
                  <div className="column-card">
                    <div className="card-book">
                      <img src={`${baseUrl}/${book.thumbnail}`} alt="" />
                      <p className="book-title">{book.title}</p>
                      <small className="book-category">
                        {book.SubCategory ? book.SubCategory : book.author}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            <Link to={`/${view}`}>
              <button className="view-more-btn">view more </button>
            </Link>
          </>
        )}
      </>
    </div>
  );
}

export default Card;
