import "./Table.css";
import React, { useEffect, useState } from "react";
import { Axios } from "../Axios";
import { toast } from "react-toastify";
import moment from "moment";

function Table() {
  const [tableData, setTableData] = useState([]);
  const getBook = async () => {
    let response = await Axios.get("/api/v1/book/", {
      withCredentials: true,
    }).catch((err) => {
      console.log(err.response);
    });
    setTableData(response.data.data);
    console.log(response.data.data);
  };
  const deleteBook = async (id, bookName) => {
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

  useEffect(() => {
    getBook();
  }, []);
  return (
    <div>
      <div>
        <table id="customers">
          <h1 className="table-head">{tableData.length} Books</h1>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author </th>
              <th>ِAdded By </th>
              <th>Date </th>
              <th>Delete </th>
            </tr>
            {tableData.map((table, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{table.title}</td>
                <td>{table.category}</td>
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
    </div>
  );
}

export default Table;
