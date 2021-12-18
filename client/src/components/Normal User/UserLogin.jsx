import React from "react";
import { Link } from "react-router-dom";

function UserLogin() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <div className="py-12 p-10 bg-white rounded-xl">
        <h1 className="text-black-150 font-bold">Login</h1>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                email
              </label>
              <input
                type="email"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className>
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                password
              </label>
              <input
                type="text"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Your password"
                type="password"
                required
              />
            </div>

            <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300">
              LOGIN
            </button>
            <span className="text-sm text-gray-700 inline-block mt-4  ">
              Don't Have An Account? <Link to="/signup" className="hover:text-indigo-600" >Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
