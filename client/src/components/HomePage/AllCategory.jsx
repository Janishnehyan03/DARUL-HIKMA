import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";

function AllCategory() {
  const [category, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSubSearchCategory] = useState(null);
  console.log("searchSubCategory", searchSubCategory);
  const [subCategory, setSubCategory] = useState([]);
  const [books, setBooks] = useState([]);
  // console.log(books);
  const baseUrl = "http://192.168.100.2:5000";
  const loadCategories = async () => {
    let response = await Axios.get(`/api/v1/book/category`);
    // console.log(response.data.data);
    setCategory(response.data.data);
  };
  const loadSubCategories = async () => {
    let response = await Axios.get(
      `/api/v1/book/sub-category?parentCategory=${searchCategory}`
    );
    // console.log(response.data.data);
    setSubCategory(response.data.data);
  };
  let queryString;

  if (searchSubCategory === null) {
    queryString = `category=${searchCategory}`;
  } else {
    queryString = `SubCategory=${searchSubCategory}`;
  }
  const loadBooks = async () => {
    let res = await Axios.get(`/api/v1/book?${queryString}`);
    setBooks(res.data.data);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    loadSubCategories();
  }, [searchCategory]);
  useEffect(() => {
    loadBooks();
  }, [searchCategory, searchSubCategory]);
  return (
    <div>
      <h3 style={{ marginLeft: "2rem", fontSize: "24px" }}>
        {books.length} documents
      </h3>

      <select
        className="category-select"
        onChange={(e) => setSearchCategory(e.target.value)}
      >
        <option value="select">select any category</option>
        {category.map((categ, index) => (
          <option value={categ.name}>{categ.name}</option>
        ))}
      </select>
      <select
        className="category-select"
        onChange={(e) => setSubSearchCategory(e.target.value)}
      >
        <option value="select">select any category</option>
        {subCategory.map((categ, index) => (
          <option value={categ.name}>{categ.name}</option>
        ))}
      </select>
      <div>
        <h1 className="category-header" onClick={loadSubCategories}>
          {" "}
          ALL CATEGORIES{" "}
        </h1>
      </div>
      {books.map((book, index) => (
        <Link style={{ color: "black" }} to={`/view/` + book._id}>
          <div className="column-card">
            <div className="card-book">
              <img src={`${baseUrl}/${book.thumbnail}`} alt="" />
              <p className="book-title">{book.title}</p>
              <small className="book-category">{book.SubCategory}</small>
              {book.likes ? (
                <p className="mt-5">
                  {book.likes.length}{" "}
                  {book.likes.length === 1 ? "like" : "likes"}{" "}
                </p>
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllCategory;
