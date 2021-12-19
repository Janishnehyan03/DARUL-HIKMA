import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios } from "../../Axios";
import { useHistory } from "react-router-dom";
function UserLogin() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("localUser")) {
      history.push("/");
    }
  }, [history]);
  useEffect(() => {
    
  }, []);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await Axios.post("/api/v1/user/login", {
        email,
        password,
      });
      console.log(response.data);
      setLoading(false);
      setEmail("");
      setPassword("");
      if (response.data) {
        toast.success("logged in successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("localUser", JSON.stringify(response.data.data));
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loading ? (
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold  focus:outline-none focus:shadow-outline"
                type="button"
                disabled
              >
                {" "}
              </button>
            ) : (
              <button
                onClick={login}
                className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
              >
                LOGIN
              </button>
            )}
            <span className="text-sm text-gray-700 inline-block mt-4  ">
              Don't Have An Account?{" "}
              <Link to="/signup" className="hover:text-indigo-600">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
