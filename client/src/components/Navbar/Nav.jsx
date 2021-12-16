import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Axios } from "../../Axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nav({ toggle }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setwordEntered] = useState("");

  const handleChange = (e) => {
    let searchWord = e.target.value;
    setwordEntered(searchWord);
    let newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setwordEntered("");
  };
  const getBooks = async () => {
    let books = await Axios.get("/api/v1/book");
    setData(books.data.data);
  };
  useEffect(() => {
    getBooks();
  }, []);
  toast.configure();
  let user = JSON.parse(window.localStorage.getItem("user"));
  const logout = () => {
    Axios.get("/api/v1/auth/logout").then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    });
  };
  return (
    <div>
      <nav id="navbar">
        <Link to="/">
          <img
            src="web.png"
            style={{ width: "45%", marginTop: "40px" }}
            alt=""
            className="nav-logo"
          />
        </Link>
        <div className="nav-container">
          <div onClick={toggle} className="mobile-icon">
            <FaBars />
          </div>
          <ul id="nav-menu">
            <div className="nav-item">
              <Link to="/" className="nav-link">
                <div className="nav-item headerActive">
                  <li>HOME </li>
                </div>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/arabic" className="nav-link">
                <li>ARABIC </li>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/english" className="nav-link">
                <li>ENGLISH </li>
              </Link>
            </div>
    
            <div className="nav-item">
              <Link to="/kulliyyah" className="nav-link">
                <li>KULLIYYAH </li>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/student-corner" className="nav-link">
                <li>STUDENTS CORNER </li>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/links" className="nav-link">
                <div className="nav-item">
                  <li>LINKS</li>
                </div>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/all-collections" className="nav-link">
                <div className="nav-item">
                  <li>ALL CATEGORIES</li>
                </div>
              </Link>
            </div>
            {!user ? (
              <div className="search-container">
                <div className="nav-search">
                  <input
                    type="text"
                    value={wordEntered}
                    onChange={handleChange}
                    placeholder="search any books here..."
                  />
                </div>
                {filteredData.length > 0 && (
                  <div className="data-results">
                    {filteredData.slice(0, 15).map((item, index) => (
                      <>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/view/${item._id}`}
                        >
                          <p className="data-item" onClick={clearInput}>
                            {item.title}
                          </p>
                        </Link>
                      </>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            {user ? (
              <>
                <div className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    <li>DASHBOARD </li>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
          </ul>
          {user && (
            <h5
              style={{ marginTop: "2rem", position: "absolute", right: "1rem" }}
            >
              Hi, {user.name}{" "}
            </h5>
          )}
          <div className="nav-btn">
            {user ? (
              <button to="#" className="logout" onClick={logout}>
                Logout
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
