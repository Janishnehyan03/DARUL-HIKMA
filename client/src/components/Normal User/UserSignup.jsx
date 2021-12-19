import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LinearProgress } from "@material-ui/core";
import { Axios } from "../../Axios";

function UserSignup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await Axios.post("/api/v1/user/signup", {
        username,
        email,
        password,
        passwordConfirm,
        name,
      });
      console.log(response);
      setEmail("");
      setUsername("");
      setName("");
      setPassword("");
      setPasswordConfirm("");
      setLoading(false);
      if (response.data) {
        toast.success("Account Created", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <div className="py-12 p-10 bg-white rounded-xl">
            <h1 className="text-black-150 font-bold">Sign Up</h1>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Username
              </label>
              <input
                required
                type="text"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                required
                type="text"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Email
              </label>
              <input
                required
                type="text"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="@email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Password
              </label>
              <input
                required
                type="text"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Confirm Password
              </label>
              <input
                required
                type="text"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="confrim password"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            {loading ? (
              <LinearProgress />
            ) : (
              <button
                onClick={signup}
                className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
              >
                Sign Up
              </button>
            )}

            <span className="text-sm text-gray-700 inline-block mt-4  ">
              Already Have An Account?
              <Link to="/user-login" className="hover:text-indigo-600">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
