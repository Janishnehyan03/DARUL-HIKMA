import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router";
import { Axios } from "../Axios";
import "./SingleView.css";

function SingleView(props) {
  const [book, setBook] = useState("");
  console.log(book);
  let baseUrl = "http://192.168.100.2:5000";
  const getSingleBook = async () => {
    let response = await Axios.get(
      `/api/v1/book/book/` + props.match.params.bookId
    );
    console.log(response);
    setBook(response.data.data);
  };
  useEffect(() => {
    getSingleBook();
  }, []);
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title> {`Darul Hikma | ${book.title}`} </title>
        </Helmet>
      </HelmetProvider>
      <div className="page-wrap">
        <div className="article-sidebar">
          <div className="article-grid">
            <article>
              {!book.thumbnail && (
                <div className="loading-btn">
                  <CircularProgress />
                </div>
              )}
              <img
                src={`${baseUrl}/${book.thumbnail}`}
                style={{ width: "350px",marginRight:"2rem"}}
                alt=""
              />
              <div>
                <div className="top">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <div className="single-category">{book.category}</div>
                  <small>{moment(book.createdAt).format("LL")}</small>
                </div>
                <div className="bottom">
                  <a
                    href={`${baseUrl}/${book.file}`}
                    target={"_blank"}
                    rel="noopener  noreferrer"
                  >
                    <button className="read-btn">READ NOW</button>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleView;
