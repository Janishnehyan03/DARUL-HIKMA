import axios from "axios";
import { Axios } from "../../Axios";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./AddBook.css";
import { toast } from "react-toastify";
import Table from "../Table";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

let token;
if (localStorage.getItem("token")) {
  token = `Bearer ${localStorage.getItem("token").slice(1, -1)}`;
}

let baseUrl = "https://darul-hikma.herokuapp.com";
// let baseUrl = "http://localhost:5000";
function AddBook() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState("");
  const [tableData, setTableData] = useState([]);
  console.log(tableData);
  const getBook = async () => {
    let response = await Axios.get("/api/v1/book/", {
      withCredentials: true,
    }).catch((err) => {
      console.log(err.response);
    });
    setTableData(response.data.data);
    console.log(tableData);
  };
  const deleteBook = async (id,bookName) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${bookName}?`)) {
        await Axios.delete(`/api/v1/book/book/${id}`);
        toast.info("successfully deleted", {
          position: "top-center",
          autoClose: 3000,
        });
        getBook();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const getCategories = async () => {
    try {
      let response = await Axios.get(`/api/v1/book/category`);
      console.log(response.data.data);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getSubCategories = async () => {
    try {
      let response = await Axios.get(
        `/api/v1/book/sub-category?parentCategory=${inputData.category}`
      );
      console.log(response.data.data);
      setSubCategory(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const imageChange = () => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (thumbnail && allowedTypes.includes(thumbnail.type)) {
      let reader = new FileReader();
      console.log("reader");
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(thumbnail);
    } else {
      setError(true);
      if (error) {
        toast.error("file not supported", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      }
    }
  };

  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputData({ ...inputData, [e.target.name]: value });
  };

  useEffect(() => {
    getCategories();
    imageChange();
    getBook();
  }, [thumbnail]);
  useEffect(() => {
    getSubCategories();
  }, [inputData.category]);
  let formData = new FormData();
  formData.append("title", inputData.title);
  formData.append("category", inputData.category);
  formData.append("author", inputData.author);
  formData.append("file", file);
  formData.append("thumbnail", thumbnail);
  formData.append("SubCategory", inputData.SubCategory);
  console.log(inputData);
  const addBook = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let data = await axios({
        url: `${baseUrl}/api/v1/book/upload/files`,
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: token,
        },
      });

      console.log(data.data);
      setLoading(false);
      toast.success(`${data.data.bookData.title} added`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      getBook();
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      setError(error.response);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Darul Hikma | Add Book</title>
        </Helmet>
      </HelmetProvider>
      <img
        src={preview}
        style={{ height: "200px", marginLeft: "45%", borderRadius: "20%" }}
        alt="thumbnail preview"
      />
      <h1 className="title">Add Book </h1>
      <div className="container">
        <div className="content-form">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Title </span>
                <input
                  type="text"
                  placeholder="Eg: Jungle Book"
                  name="title"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Author</span>
                <input
                  type="text"
                  placeholder="Eg: Rudyard Kipling "
                  name="author"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Thumbnail </span>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  required
                />
              </div>

              <div className="input-box">
                <span className="details">file </span>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="file"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Category </span>
                <select onChange={handleChange} name="category">
                  <option selected value="MAGAZINES">
                    select a category
                  </option>
                  {category.map((categ, index) => (
                    <option value={categ.name}>{categ.name}</option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <select onChange={handleChange} name="SubCategory">
                  <option selected value="MAGAZINES">
                    sub category
                  </option>
                  {subCategory.map((subCat, index) => (
                    <option value={subCat.name}>{subCat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            {loading ? (
              <div className="loading-btn">
                <CircularProgress />
              </div>
            ) : (
              <div className="button">
                <input
                  type="submit"
                  onClick={(e) => addBook(e)}
                  defaultValue="Register"
                />
              </div>
            )}
          </form>
        </div>
      </div>
      <table id="customers">
        <h1 className="table-head">{tableData.length} Books</h1>
        <tbody>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Author </th>
            <th>Added By </th>
            <th>Date </th>
            <th>Delete </th>
          </tr>
          {tableData.map((table, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{table.title}</td>
              <td>{table.category}</td>
              <td>{table.SubCategory}</td>
              <td>{table.author}</td>
              <td>{table.addedBy}</td>
              <td>{moment(table.createdAt).format("LLLL")}</td>
              <td>
                <button
                  className="btn delete"
                  onClick={() => deleteBook(table._id, table.title)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddBook;
