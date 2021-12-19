import React, { useState } from "react";
import { toast } from "react-toastify";
import { Axios } from "../../Axios";
function Feedbacks() {
  const [details, setDetails] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/api/v1/book/feedback", {
        details,
      });
      setDetails("");
      console.log(res.data);
      if (res.data.status === "success") {
        toast.success("Feedback submitted successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error submitting feedback", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg mt-6 mx-8 mb-4 max-w-lg">
      <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
        <div className="flex flex-wrap -mx-3 mb-6">
          <h5 className="px-4 pt-3 pb-2 text-gray-800 text-sm">
            send your feedbacks
          </h5>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="help us to improve our service"
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto m-3">
            <svg
              fill="none"
              class="w-5 h-5 text-red-600 mr-1"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-xs md:text-sm pt-px">Available for admins</p>
          </div>
          <div className="w-full md:w-full  flex items-start md:w-full px-3">
            <div className="-mr-1 ">
              <input
                onClick={(e) => submitFeedback(e)}
                type="submit"
                className="cursor-pointer bg-black text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-200 hover:text-gray-700"
                defaultValue="Post Comment"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Feedbacks;
