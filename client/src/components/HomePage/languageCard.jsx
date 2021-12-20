import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

function LanguageCard({ url, title }) {
  const [books, setBooks] = useState([]);
  let baseUrl = "http://192.168.100.2:5000";

  const loadBooks = async () => {
    let response = await Axios.get(
      `/api/v1/book/language/${url}`
    );
    console.log(response.data.data);
    setBooks(response.data.data);
  };
  useEffect(() => {
    loadBooks();
  }, [url]);
  return (
    <div>
      <h1 className="category-header">{title} CATEGORY</h1>
      
      {books.map((book, index) => (
        <div key={index}>
          <Link style={{ color: "black" }} to={`/view/${book._id}`}>
            <div className="column-card">
              <div className="card-book">
                <img src={`${baseUrl}/${book.thumbnail}`} />
                <h3 className="book-title">
                  {book.title.substring(0, 40)}{" "}
                  {book.title.length > 40 ? "..." : ""}
                </h3>
                <small className="book-category">
                  {book.SubCategory ? book.SubCategory : book.author}
                </small>
                {book.likes ? (
                  <p className="mt-5">
                    {book.likes.length} <FavoriteBorderOutlinedIcon />
                  </p>
                ) : null}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default LanguageCard;
