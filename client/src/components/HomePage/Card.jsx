import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

function Card({ title, url, view }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  let baseUrl = "http://192.168.100.2:5000";
  const loadBooks = async () => {
    try {
      setLoading(true);
      let response = await Axios.get(
        `/api/v1/book?limit=12&category=${url}&category=${title}`
      );
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(true);
    }
  };
  useEffect(() => {
    loadBooks();
  }, []);
  return (
    <div className="row-card">
      <>
        {loading ? (
          <div className="skeleton">
            <CircularProgress />
          </div>
        ) : (
          <>
            <h3 className="card-header">{title}</h3>
            <div>
              {/* component */}
              <link
                rel="stylesheet"
                href="https://cdn.tailgrids.com/tailgrids-fallback.css"
              />
              {/* ====== Blog Section Start */}
              <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
                <div className="container">
                  <div className="flex flex-wrap -mx-4">
                    {books.map((book, index) => (
                      <Link to={`/view/${book._id}`} className="w-full md:w-1/2 lg:w-1/3 px-4">
                        <div>
                          <div className="max-w-[370px] mx-auto mb-10">
                            <div className="rounded overflow-hidden mb-8">
                              <img
                                src={`${baseUrl}/${book.thumbnail}`}
                                alt="image"
                                className="w-full h-72"
                              />
                            </div>
                            <div>
                              <span className=" bg-primary rounded inline-block  text-center  py-1   px-4   text-xs   leading-loose font-semibold text-white  mb-5">
                                {book.SubCategory}
                              </span>
                              <h3>
                                <a
                                  href="javascript:void(0)"
                                  className="
                  font-semibold
                  text-xl
                  sm:text-2xl
                  lg:text-xl
                  xl:text-2xl
                  mb-4
                  inline-block
                  text-dark
                  hover:text-primary
                  "
                                >
                                  {book.title}
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
              {/* ====== Blog Section End */}
            </div>

            <Link to={`/${view}`}>
              <button className="view-more-btn">view more </button>
            </Link>
          </>
        )}
      </>
    </div>
  );
}

export default Card;
