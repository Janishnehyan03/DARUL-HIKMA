import { Button, CircularProgress } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Axios } from "../Axios";
import AddComment from "./Normal User/AddComment";
import "./SingleView.css";

function SingleView(props) {
  const [book, setBook] = useState("");
  const [liked, setLiked] = useState(false);
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
  const checkLiked = async () => {
    await Axios.get(`/api/v1/book/checkLiked/` + props.match.params.bookId);
  };
  const likeBook = async () => {
    try {
      let response = await Axios.post(`/api/v1/review/likeBook/${book._id}`);
      console.log(response);
      getSingleBook();
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getSingleBook();
    checkLiked();
  }, []);
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title> {`Darul Hikma | ${book.title}`} </title>
        </Helmet>
      </HelmetProvider>
      {/* comment  */}
      <AddComment />
      <div className="max-w-sm rounded shadow-lg m-4 content-center">
        <img
          className="w-full"
          src={`${baseUrl}/${book.thumbnail}`}
          alt="Sunset in the mountains"
        />
        <Button
          style={{ float: "right", margin: "10px", borderRadius: "10px" }}
          onClick={likeBook}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-11"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ backgroundColor: "#f7f7f7", borderRadius: "10px" }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="like"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </Button>
        {book.likes ? (
          <h1 style={{ marginLeft: "4rem" }}>
            {book.likes.length} {book.likes.length === 1 ? "like" : "likes"}
          </h1>
        ) : (
          ""
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
        </div>
        <div className="px-6 py-4 ">
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-8 rounded inline-flex items-center">
            <span>Read Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleView;
