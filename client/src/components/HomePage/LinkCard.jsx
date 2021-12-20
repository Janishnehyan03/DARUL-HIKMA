import React, { useEffect } from "react";
import { Axios } from "../../Axios";

function LinkCard() {
  const [links, setLinks] = React.useState([]);
  console.log(links);

  const getAllLinks = async () => {
    let res = await Axios.get("/api/v1/book/link");
    setLinks(res.data.data);
  };
  useEffect(() => {
    getAllLinks();
  }, []);
  return (
    <>
      {links.map((link) => (
        <a href={link.url} target={"_blank"}>
          <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange">
            <div className="sm:w-2/3 ">
              <img
                src={`https://www.google.com/s2/favicons?sz=64&domain_url=${link.url}`}
                alt=""
                style={{ width: "64px", height: "64px" }}
              />
              <h3 className="text-orange text-xl font-semibold md:text-black">
                {link.name}
              </h3>
              <p className="text-grey-dark font-thin text-sm leading-normal md:text-gray">
                {link.details}
              </p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}

export default LinkCard;
