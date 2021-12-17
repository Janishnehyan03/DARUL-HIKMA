import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";

function AllCategory() {
  const [category, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [books, setBooks] = useState([]);
  console.log(books);
  const baseUrl = "http://192.168.100.2:5000";
  const loadCategories = async () => {
    let response = await Axios.get(`/api/v1/book/category`);
    // console.log(response.data.data);
    setCategory(response.data.data);
  };
  const loadBooks = async () => {
    let res = await Axios.get(`/api/v1/book?category=${searchCategory}`);
    setBooks(res.data.data);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    loadBooks();
  }, [searchCategory]);
  return (
    <div>
      <h3 style={{marginLeft:'2rem',fontSize:'24px'}} >{books.length} documents</h3>

      <select
        className="category-select"
        onChange={(e) => setSearchCategory(e.target.value)}
      >
        <option value="select">select any category</option>
        {category.map((categ, index) => (
          <option value={categ.name}>{categ.name}</option>
        ))}
      </select>
      <div>
        <h1 className="category-header"> ALL CATEGORIES </h1>
      </div>
      {books.map((book, index) => (
        <Link style={{ color: "black" }} to={`/view/` + book._id}>
          <div className="column-card">
            <div className="card-book">
              <img src={`${baseUrl}/${book.thumbnail}`} alt="" />
              <p className="book-title">{book.title}</p>
              <small className="book-category">{book.SubCategory}</small>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllCategory;
