import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";

function PopularBooks({ title }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  let baseUrl = "http://192.168.100.2:5000";
  const loadBooks = async () => {
    try {
      setLoading(true);
      let response = await Axios.get(`/api/v1/book?limit=8&latest=true`);
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
                      <p className="book-title">
                        {book.title.substring(0, 30)}{" "}
                        {book.title.length > 40 ? "..." : ""}
                      </p>
                      <small className="book-category">
                        {book.SubCategory ? book.SubCategory : book.author}
                      </small>
                      {book.likes ? (
                        <p className="mt-5">
                          {book.likes.length}
                          <br />
                          <FavoriteBorderOutlined />
                          {/* {book.likes.length === 1 ? "like" : "likes"}{" "} */}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </>
    </div>
  );
}

export default PopularBooks;
