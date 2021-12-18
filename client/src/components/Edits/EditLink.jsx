import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Axios } from "../../Axios";
import { CircularProgress } from "@material-ui/core";

function EditLink() {
  const [links, setLinks] = useState([]);
  const linkId = window.location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(links.name);
  const [url, setUrl] = useState(links.url);
  const [details, setDetails] = useState(links.details);
  console.log(linkId);

  const getLink = async () => {
    let response = await Axios.get(`/api/v1/book/link/${linkId}`);
    setLinks(response.data.data);
    console.log(response.data.data);
  };
  const editLink = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data = await Axios.patch(`/api/v1/book/link/${id}`, {
        url,
        details,
        name,
      });
      console.log(data);
      setLoading(false);
      setName("");
      setUrl("");
      setDetails("");
      toast.success("successfully edited", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };
  useEffect(() => {
    getLink();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="text-lg font-bold">Edit Link</h1>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Website Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              defaultValue={links.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              defaultValue={links.url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Details
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              defaultValue={links.details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            {loading ? (
              <CircularProgress />
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => editLink(e, linkId)}
              >
                Edit
              </button>
            )}
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          ©2021 Darul Hikma. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default EditLink;
