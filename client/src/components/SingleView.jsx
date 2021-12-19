import { Button } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Axios } from "../Axios";
import CommentTable from "./Normal User/CommentTable";
import "./SingleView.css";

function SingleView(props) {
  const [book, setBook] = useState("");
  const [liked, setLiked] = useState(false);
  console.log(liked);
  let user = localStorage.getItem("localUser");
  if (user) {
    user = JSON.parse(user);
    console.log(user._id);
  }
  let baseUrl = "http://192.168.100.2:5000";
  const getSingleBook = async () => {
    let response = await Axios.get(
      `/api/v1/book/book/` + props.match.params.bookId
    );
    console.log(response.data);
    setBook(response.data.data);
  };
  const checkLiked = () => {
    if (book.likes) {
      console.log(book.likes);
      if (user) {
        if (book.likes.includes(user._id)) {
          setLiked(true);
          console.log("liked");
        } else {
          setLiked(false);
          console.log("not liked");
        }
      }
    }
  };
  const likeBook = async () => {
    try {
      await Axios.post(`/api/v1/review/likeBook/${book._id}`);
      getSingleBook();
    } catch (error) {
      console.log(error.response);
    }
  };
  const unlikeBook = async () => {
    try {
      let response = await Axios.post(`/api/v1/review/unlikeBook/${book._id}`);
      console.log(response.data);
      getSingleBook();
    } catch (error) {
      console.log(error.response);
    }
  };
  const goToSignIn = () => {
    props.history.push("/user-login");
  };
  useEffect(() => {
    getSingleBook();
  }, []);
  useEffect(() => {
    checkLiked();
  }, [book]);
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title> {`Darul Hikma | ${book.title}`} </title>
        </Helmet>
      </HelmetProvider>
      {/* comment  */}

      <CommentTable bookId={book._id} />

      <div className="max-w-sm rounded shadow-lg m-4 content-center">
        <img
          className="w-full"
          src={`${baseUrl}/${book.thumbnail}`}
          alt={book.title}
        />
        {user ? (
          <>
            {book.likes && (
              <h1 style={{ background: "#FEE3EC" }}>
                {book.likes.length} {book.likes.length === 1 ? "like" : "likes"}
              </h1>
            )}
            {liked ? (
              <Button
                className="like-button"
                variant="contained"
                color="secondary"
                style={{ margin: "10px" }}
                onClick={unlikeBook}
              >
                Unlike
              </Button>
            ) : (
              <Button
                className="like-button "
                variant="contained"
                color="primary"
                onClick={likeBook}
                style={{ margin: "10px" }}
              >
                Like
              </Button>
            )}
          </>
        ) : (
          <>
            {book.likes ? (
              <h1 style={{ background: "#FEE3EC" }}>
                {book.likes.length} {book.likes.length === 1 ? "like" : "likes"}
              </h1>
            ) : (
              ""
            )}

            <Button
              className="like-button"
              variant="contained"
              onClick={goToSignIn}
              color="primary"
              style={{ margin: "10px" }}
            >
              Like
            </Button>
          </>
        )}
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm  text-gray mr-2 mb-2">
            {book.category}
          </span>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{book.title}</div>
          <p className="text-gray-700 text-base">
            <small onClick={checkLiked}>added on:</small>{" "}
            {moment(book.createdAt).format("LL")}
          </p>
          <button
            style={{ marginLeft: "30rem", position: "absolute", top: "40rem" }}
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-8 rounded  items-center"
          >
            <span>Read Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleView;
