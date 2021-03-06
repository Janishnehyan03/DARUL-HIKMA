import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Axios } from "../../Axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function Nav({ toggle }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setwordEntered] = useState("");
  function generateGreetings() {
    const hour = moment().hour();
    console.log(hour);
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else if (hour < 20) {
      return "Good Evening";
    } else if (hour < 24) {
      return "Good Night";
    } else {
      return "welcome";
    }
  }
  var time = generateGreetings();

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
  const localUser = JSON.parse(window.localStorage.getItem("localUser"));
  console.log(localUser);
  console.log(user);
  const logout = () => {
    Axios.get("/api/v1/auth/logout").then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    });
  };
  const normalUserLogout = () => {
    Axios.get("/api/v1/user/logout").then(() => {
      localStorage.removeItem("localUser");
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
              <Link to="/urdu" className="nav-link">
                <li>URDU </li>
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
                <li>ALL CATEGORIES</li>
              </Link>
            </div>
            {user || localUser ? (
              <h2
                style={{
                  marginTop: "60px",
                  fontSize: "19px",
                  marginLeft: "5rem",
                }}
              >
                {localUser && (
                  <>
                    <small>Welcome ,</small> <br /> {localUser.username}
                    <button
                      onClick={normalUserLogout}
                      class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-4 rounded-full"
                    >
                      Logout
                    </button>
                  </>
                )}
              </h2>
            ) : (
              <div
                className="nav-item"
                style={{ marginTop: "60px", marginLeft: "5rem" }}
              >
                <Link to="/user-login">
                  <button class="bg-green-500 hover:bg-green-400 text-white py-2 px-4  rounded-full">
                    Sign In
                  </button>
                </Link>
              </div>
            )}

            <div className="search-container">
              <div className="nav-search">
                <input
                  type="text"
                  value={wordEntered}
                  onChange={handleChange}
                  placeholder="search any books here..."
                />
                <br />
                {filteredData.length > 0 ? (
                  <small>{filteredData.length} results</small>
                ) : (
                  ""
                )}
              </div>
              {filteredData.length > 0 && (
                <div className="data-results">
                  <div className="overflow-y-scroll overflow-x-hidden	 h-72">
                    {filteredData.slice(0, 1000).map((item, index) => (
                      <>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/view/${item._id}`}
                        >
                          <div className="data-item">
                            <p onClick={clearInput}>{item.title}</p>
                            <small>{item.category}</small>
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
            <h5 style={{ marginTop: "0", position: "absolute", left: "1rem" }}>
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
