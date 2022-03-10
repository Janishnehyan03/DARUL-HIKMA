import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
export default function StudentCorner() {
  const [tableData, setTableData] = React.useState([]);
  const getBook = async () => {
    let response = await Axios.get("/api/v1/book/student-corner?latest=true", {
      withCredentials: true,
    }).catch((err) => {
      console.log(err.response);
    });
    console.log(response);
    setTableData(response.data.data);
    console.log(tableData, "DSADFSDF");
  };
  useEffect(() => {
    getBook();
  }, []);

  function EachDetails({ item }) {
    const [readMore, setReadMore] = useState(false);
    console.log(item.details.length);
    return (
      <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md my-8">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">12-2-2020</span>
        </div>
        <div className="mt-2">
          <a
            href="#"
            className="text-2xl font-bold text-gray-700 hover:underline"
          >
            {item.title}
          </a>
          <p className="mt-2 text-gray-600">
            {item.details &&
              item.details.substring(0, readMore ? item.details.length : 600)}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          {item.details.length > 600 && (
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                setReadMore(!readMore);
              }}
              className="text-blue-500 hover:underline"
            >
              {readMore ? "Read Less" : "Read More"}
            </a>
          )}
          <div>
            <h1 className="font-bold text-gray-700">✒️ {item.author}</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-6">
      {tableData ? (
        tableData.map((item, index) => <EachDetails key={index} item={item} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
