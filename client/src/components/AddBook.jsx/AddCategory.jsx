import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./AddBook.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../../Axios";

function AddCategory() {
  const [url, setUrl] = useState("");
  const [tableData, setTableData] = useState([]);
  console.log(tableData);
  const getCategories = async () => {
    try {
      let response = await Axios.get("/api/v1/book/category");
      console.log(response.data.data);
      setTableData(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteBook = async (id,bookName) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${bookName}?`)) {
        await Axios.delete(`/api/v1/book/category/${id}`);
        toast.info("successfully deleted", {
          position: "top-center",
          autoClose: 3000,
        });
        getCategories();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const addCategory = async (e) => {
    try {
      e.preventDefault();
      let data = await Axios.post("/api/v1/book/category", { name: url });
      console.log(data.data.doc);
      toast.success(`${data.data.doc.name} created `, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
      setUrl("");
      getCategories();
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title id="demo">Darul Hikma | Add Category </title>
        </Helmet>
      </HelmetProvider>
      <h1 className="title">Add Category </h1>
      <section style={{ height: "100vh" }}>
        <div className="container">
          <form action="#" className="form-inline">
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              value={url}
              placeholder="enter category name..."
            />
            <button onClick={addCategory}>ADD Category </button>
          </form>
        </div>
        <table id="customers">
          <h1 className="table-head">{tableData.length} categories</h1>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Delete</th>
            </tr>
            {tableData.map((table, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{table.name}</td>
                <td>
                  <button
                    className="btn delete"
                    onClick={() => deleteBook(table._id,table.name)}
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

export default AddCategory;
