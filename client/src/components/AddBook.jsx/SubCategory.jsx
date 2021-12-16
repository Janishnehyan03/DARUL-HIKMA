import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./AddBook.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../../Axios";

function SubCategory() {
  const [url, setUrl] = useState("");
  const [parent, setParent] = useState("");
  const [tableData, setTableData] = useState([]);
  const [category, setCategory] = useState([]);
  console.log(tableData);
  const getCategories = async () => {
    try {
      let response = await Axios.get("/api/v1/book/category");
      console.log(response.data.data);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getSubCategories = async () => {
    try {
      let response = await Axios.get("/api/v1/book/sub-category");
      console.log(response.data.data);
      setTableData(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteBook = async (id, categoryName) => {
    try {
      if (window.confirm(`are you sure to delete ${categoryName}`)) {
        await Axios.delete(`/api/v1/book/sub-category/${id}`);
        toast.info("successfully deleted", {
          position: "top-center",
          autoClose: 3000,
        });
        getSubCategories();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const addCategory = async (e) => {
    try {
      e.preventDefault();
      let data = await Axios.post("/api/v1/book/sub-category", {
        name: url,
        parentCategory: parent,
      });
      console.log(data.data.doc);
      toast.success(`${data.data.doc.name} created `, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
      setUrl("");
      getSubCategories();
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };

  useEffect(() => {
    getSubCategories();
    getCategories();
  }, []);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title id="demo">Darul Hikma | Sub Category </title>
        </Helmet>
      </HelmetProvider>
      <h1 className="title">Add Sub Category </h1>
      <section style={{ height: "100vh" }}>
        <div className="container">
          <form action="#" className="form-inline">
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              value={url}
              placeholder="enter category name..."
            />
            {/* <input
              onChange={(e) => setParent(e.target.value)}
              type="text"
              value={parent}
              placeholder="enter parent name..."
            /> */}
            <div className="input-box">
              <span className="details">parent category </span>
              <select
                onChange={(e) => setParent(e.target.value)}
                name="category"
              >
                <option selected>select a category</option>
                {category.map((categ, index) => (
                  <option value={categ.name}>{categ.name}</option>
                ))}
              </select>
            </div>
            <button onClick={addCategory}>ADD Category </button>
          </form>
        </div>
        <table id="customers">
          <h1 className="table-head">{tableData.length} categories</h1>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Sub Category</th>
              <th>Parent</th>
              <th>Delete</th>
            </tr>
            {tableData.map((table, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{table.name}</td>
                <td>{table.parentCategory}</td>
                <td>
                  <button
                    className="btn delete"
                    onClick={() => deleteBook(table._id, table.name)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SubCategory;
