import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../Login/Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

let token;
if (localStorage.getItem("token")) {
  token = `Bearer ${localStorage.getItem("token").slice(1, -1)}`;
}

let baseUrl = "https://darul-hikma.herokuapp.com";
// let baseUrl = "http://localhost:8000";

function AddLink() {
  const [url, setUrl] = useState("");
  const [linkImage, setImage] = useState("");
  const [name, setName] = useState("");
  let formData = new FormData();
  formData.append("url", url);
  formData.append("name", name);
  formData.append("linkImage", linkImage);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  console.log(tableData);
  const getLinks = async () => {
    let response = await Axios.get("/api/v1/book/link").catch((err) => {
      console.log(err.response);
    });
    setTableData(response.data.data);
    console.log(response.data.data);
  };
  const deleteLink = async (id,linkName) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${linkName}?`)) {
        await Axios.delete(`/api/v1/book/link/${id}`);
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
        url: `${baseUrl}/api/v1/book/link`,
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: token,
        },
      });
      getLinks()
      console.log(data.data);
      setLoading(false);
      toast.success("successfully added", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      toast.error({
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title id="demo">Darul Hikma | Add Links </title>
        </Helmet>
      </HelmetProvider>
      <h1 className="title">Useful Links </h1>
      <section style={{ height: "100vh" }}>
        <div className="login">
          <div className="form">
            <form className="login-form">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Website Name "
                required
                name="name"
              />
              <input
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="paste your URL here..."
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
              />
              {loading ? (
                <>
                  {" "}
                  <div className="loading-btn">
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <button onClick={addLink}>ADD Link </button>
              )}
            </form>
          </div>
        </div>
        <table id="customers">
          <h1 className="table-head">{tableData.length} Links</h1>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Img</th>
              <th>Name</th>
              <th>Url</th>
              <th>Delete </th>
              <th>Added By </th>
            </tr>
            {tableData.map((table, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  {" "}
                  <img
                    src={`/uploads/${table.linkImage}`}
                    style={{ height: "50px" }}
                    alt=""
                  />{" "}
                </td>
                <td>{table.name}</td>
                <td>
                  <a href={table.url} target="_blank" rel="noopener noreferrer">
                    {table.url}
                  </a>
                </td>
                <td>
                  <button
                    className="btn delete"
                    onClick={() => deleteLink(table._id,table.name)}
                  >
                    delete
                  </button>
                </td>
                <td>
                  <p>{table.addedBy}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AddLink;
