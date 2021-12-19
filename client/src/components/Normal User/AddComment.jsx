import React, { useState } from "react";
import { Axios } from "../../Axios";

function AddComment({ bookId }) {
  const [comment, setComment] = useState("");
  const addComment = async (e) => {
    try {
      e.preventDefault();
      let response = await Axios.post(`/api/v1/review/comment/${bookId}`, {
        comment,
        book: bookId,
      });
      console.log(response);
      setComment("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
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
                <button
                  type="submit"
                  className="bg-gray-400 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-700 hover:text-white"
                  onClick={addComment}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddComment;
