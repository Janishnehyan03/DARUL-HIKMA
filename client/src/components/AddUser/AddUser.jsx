import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Axios } from "../../Axios";
import "../Login/Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser() {
  toast.configure();
  const [inputData, setInputData] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setInputData({ ...inputData, [e.target.name]: value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        "/api/v1/auth/create",
        {
          email: inputData.email,
          name: inputData.name,
          password: inputData.password,
          passwordConfirm: inputData.passwordConfirm,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log(response.data);
        toast.success(`${response.data.email} added`, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: false,
        position: "top-center",
      });
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <HelmetProvider>

      <Helmet>
        <title>Darul Hikma | Add Users </title>
      </Helmet>
      </HelmetProvider>
      <section id="login">
        <div className="login">
          <div className="form">
            <form className="login-form">
              <span className="material-icons">Add User </span>
              <input
                type="text"
                onChange={handleChange}
                placeholder="name"
                required
                name="name"
              />
              <input
                type="email"
                placeholder="email"
                required
                onChange={handleChange}
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="confirm password"
                name="passwordConfirm"
                onChange={handleChange}
                required
              />
              <button type="submit" onClick={(e) => submitData(e)}>
                Add User{" "}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddUser;
