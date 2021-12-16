import React, { useState,  } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./AddBook.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../../Axios";

function AddVideo() {
  const [url, setUrl] = useState("");

  const addVideo = async (e) => {
    try {
      e.preventDefault();
      let data = await Axios.post("/api/v1/video", {url:url});
      console.log(data.data);
    } catch (error) {
      console.log(error.response.data);
      toast.error({
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title id="demo">Darul Hikma | Add Video </title>
        </Helmet>
      </HelmetProvider>
      <h1 className="title">Add Video </h1>
      <section style={{height:'100vh'}} >
        <div className="container">
          <form action="#" className="form-inline">
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              placeholder="paste your URL here..."
            />
            <button onClick={addVideo}>ADD URL </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddVideo;
