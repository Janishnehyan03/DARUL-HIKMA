import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import moment from "moment";
import { toast } from "react-toastify";

function FeedbackTable() {
  const [data, setData] = useState([]);
  const getAllFeedback = async () => {
    let feedback = await Axios.get("/api/v1/book/feedback");
    console.log(feedback.data.data);
    setData(feedback.data.data);
  };
  const deleteFeedback = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this feedback?")) {
        await Axios.delete(`/api/v1/book/feedback/${id}`);
        toast.info("successfully deleted", {
          position: "top-center",
          autoClose: 2000,
        });
        getAllFeedback();
      }
    } catch (error) {
      console.log(error.response);
      toast.error("something went wrong", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  useEffect(() => {
    getAllFeedback();
  }, []);
  return (
    <div>
      <h1>Feedbacks</h1>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      SI NO:
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Feedback
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((person,index) => (
                    <tr key={person._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.details}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(person.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          class="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => deleteFeedback(person._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackTable;
