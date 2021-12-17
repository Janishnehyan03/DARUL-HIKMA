import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";

function LanguageCard({ url, title }) {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("");
  let baseUrl = "https://darul-hikma.herokuapp.com";

  const loadBooks = async () => {
    let response = await Axios.get(
      `/api/v1/book/language/${url}?category=${category}`
    );
    console.log(response.data.data);
    setBooks(response.data.data);
  };
  const changeCategory = async (e) => {
    setCategory(e);
    console.log(e);
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
                <h3 className="book-title">{book.title}</h3>
                <p>{book.author}</p>
                <small className="book-category">{book.category}</small>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default LanguageCard;
