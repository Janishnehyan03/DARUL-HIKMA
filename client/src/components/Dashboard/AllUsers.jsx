import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import moment from "moment";
function AllUsers() {
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    let response = await Axios.get(`/api/v1/user/`);
    console.log(response.data);
    setUsers(response.data.users);
  };
  const activateAcount = async (id) => {
    try {
      if (window.confirm("Are you sure you want to activate this account?")) {
        let response = await Axios.post(`/api/v1/user/activate/${id}`);
        console.log(response.data);
        getAllUsers();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const deactivateAcount = async (id) => {
    try {
      if (window.confirm("Are you sure you want to deactivate this account?")) {
        let response = await Axios.post(`/api/v1/user/deactivate/${id}`);
        console.log(response.data);
        getAllUsers();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <h1>Users</h1>
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
                      Email
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
                  {users.map((user, index) => (
                    <tr>
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
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {" "}
                          {moment(user.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!user.activated ? (
                          <button
                            class="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-green-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => activateAcount(user._id)}
                          >
                            Acivate
                          </button>
                        ) : (
                          <button
                            class="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-red-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => deactivateAcount(user._id)}
                          >
                            Deactivate
                          </button>
                        )}
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

export default AllUsers;
