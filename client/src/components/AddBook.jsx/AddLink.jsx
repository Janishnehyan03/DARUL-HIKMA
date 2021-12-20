import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../Login/Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

function AddLink() {
  const [url, setUrl] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
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
  const deleteLink = async (id, linkName) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${linkName}?`)) {
        await Axios.delete(`/api/v1/book/link/${id}`);
        setName("");
        setUrl("");
        setDetails("");
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
      let data = await Axios.post("/api/v1/book/link", {
        url,
        details,
        name,
      });
      setLoading(false);
      setName("");
      setUrl("");
      setDetails("");
      getLinks();
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
                value={name}
              />
              <input
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="paste your URL here..."
                required
                value={url}
              />
              <textarea
                onChange={(e) => setDetails(e.target.value)}
                type="text"
                placeholder="details"
                class="resize-x rounded-md w-full"
                required
                value={details}
              ></textarea>
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
              <th>Url</th>
              <th>Details</th>
              <th>Added By </th>
              <th>Delete </th>
              <th>Edit </th>
            </tr>
            {tableData.map((table, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={table.url}
                    className="max-w-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button class="bg-blue-500 hover:bg-blue-700 text-white w-48">
                      {table.name}
                    </button>
                  </a>
                </td>
                <td>
                  <p> {table.details ? table.details.substring(0, 45) : ""}</p>
                </td>
                <td>
                  <p>{table.addedBy}</p>
                </td>
                <td>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white w-28"
                    onClick={() => deleteLink(table._id, table.name)}
                  >
                    delete
                  </button>
                </td>
                <td>
                  <Link to={`/edit-link/${table._id}`}>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white w-28">
                      edit
                    </button>
                  </Link>
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
