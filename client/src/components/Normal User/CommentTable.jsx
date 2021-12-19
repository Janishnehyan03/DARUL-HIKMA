import { Button } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";

function CommentTable() {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const bookId = window.location.pathname.split("/")[2];
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("localUser"));
  const getComments = async () => {
    let response = await Axios.get(`/api/v1/review/${bookId}`);
    console.log(response.data);
    setCommentCount(response.data.results);
    setComments(response.data.data);
  };
  const addComment = async (e) => {
    try {
      e.preventDefault();
      let response = await Axios.post(`/api/v1/review/comment/${bookId}`, {
        comment,
        book: bookId,
      });
      console.log(response);
      setComment("");
      getComments();
    } catch (error) {
      console.log(error.response);
    }
  };
  const goToSignIn = () => {
    window.location.href = "/user-login";
  };
  const deleteComment = async (commentId) => {
    try {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        let response = await Axios.delete(`/api/v1/review/${commentId}`);
        console.log(response);
        getComments();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <div className="mx-auto  shadow-lg  mx-2 mb-4 max-w-md  float-right">
        <div class="overflow-y-auto h-80 border-b-4 border-gray-500">
          {commentCount === 0 ? (
            <h1>"No comments"</h1>
          ) : (
            <>
              {comments.map((comment, index) => (
                <div className="px-6 py-4 bg-white border-b-4 border-gray-200">
                  {/* <div className="font-bold text-md mb-2">The Coldest Sunset</div> */}
                  {user._id === comment.user._id ? (
                    <Button
                      className="like-button float-right"
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteComment(comment._id)}
                    >
                      Delete
                    </Button>
                  ) : null}
                  <p className="text-base">{comment.comment}</p>
                  <small className="text-base text-blue-600">
                    @ {comment.user.name}
                  </small>
                  <br />
                  <small>{moment(comment.createdAt).format("LL")}</small>
                </div>
              ))}
            </>
          )}
        </div>
        <hr />
        <div className="mx-auto mt-4  shadow-lg  mx-8 mb-4 max-w-lg inset-x-0 float-right	">
          <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-md">
                Add a new comment
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Type Your Comment"
                  required
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </div>
              <div className="w-full md:w-full flex items-start md:w-full px-3">
                <div className="-mr-1">
                  {user ? (
                    <button
                      type="submit"
                      className="bg-gray-400 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-700 hover:text-white"
                      onClick={addComment}
                    >
                      submit
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-gray-400 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-700 hover:text-white"
                      onClick={goToSignIn}
                    >
                      submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentTable;
