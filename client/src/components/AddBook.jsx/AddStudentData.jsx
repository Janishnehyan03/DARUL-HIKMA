import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../Login/Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { InputAdornment } from "@mui/material";

let token;
if (localStorage.getItem("token")) {
  token = `Bearer ${localStorage.getItem("token").slice(1, -1)}`;
}

let baseUrl = "https://darul-hikma.herokuapp.com";
// let baseUrl = "http://localhost:8000";

function AddStudentData() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [author, setAuthor] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(tableData);
  const getLinks = async () => {
    let response = await Axios.get("/api/v1/book/student-corner").catch((err) => {
      console.log(err.response);
    });
    setTableData(response.data.data);
    console.log(response.data.data);
  };
  const deleteLink = async (id, linkName) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${linkName}?`)) {
        await Axios.delete(`/api/v1/book/student-corner/${id}`);
        toast.info("successfully deleted", {
          position: "top-center",
          autoClose: 3000,
        });
        getLinks();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getLinks();
  }, []);
  const addLink = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let data = await axios({
        url: `${baseUrl}/api/v1/book/student-corner`,
        method: "POST",
        data: {
          title,
          details,
          author,
        },
        withCredentials: true,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: token,
        },
      });
      getLinks();
      console.log(data.data);
      setLoading(false);
      toast.success("successfully added", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title id="demo">Darul Hikma | Add Student Corner </title>
        </Helmet>
      </HelmetProvider>
      <h1 className="title">Student Corner </h1>
      <section style={{ height: "100vh" }}>
        <div className="login">
          <div className="form">
            <form className="login-form">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                name="title"
              />
              <textarea
                onChange={(e) => setDetails(e.target.value)}
                type="text"
                placeholder="Details"
                className="text-area"
              />
              <input
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="author"
              />
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <button onClick={addLink}>Add</button>
              )}
            </form>
          </div>
        </div>
        <table id="customers">
          <h1 className="table-head">{tableData.length} Links</h1>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Added By </th>
              <th>Delete </th>
            </tr>
            {tableData.map((table, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{table.title}</td>

                <td>
                  <p>{table.addedBy}</p>
                </td>
                <td>
                  <button
                    className="btn delete"
                    onClick={() => deleteLink(table._id, table.name)}
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

export default AddStudentData;
