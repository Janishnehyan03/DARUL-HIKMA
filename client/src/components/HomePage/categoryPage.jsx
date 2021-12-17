import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";
import { CircularProgress } from "@material-ui/core";

function CategoryCard({ url, title }) {
  const [books, setBooks] = useState([]);
  console.log(loading);
  const baseUrl = 'http://192.168.100.2:5000'
  const loadBooks = async () => {
    let response = await Axios.get(`/api/v1/book?category=${url}`);
    console.log(response.data.data.languages);
    setBooks(response.data.data.languages);
    // setLoading(true);
  };
  useEffect(() => {
    loadBooks();
  }, [url]);
  return (
    <div>
      {!books ? (
        <>
          <div className="loading-btn">
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          <h1 className="category-header">{title}</h1>
          {books.map((book, index) => (
            <div key={index}>
              <Link style={{ color: "black" }} to={`/view/${book._id}`}>
                <div className="column-card">
                  <div className="card-book">
                    <img src={`${baseUrl}/${book.thumbnail}`} />
                    <h3 className="book-title">{book.title}</h3>
                    <p>{book.author}</p>
                    <small className="book-category">{book.category}</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CategoryCard;
