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
    <div className="link_card_section">
      <ul className="cards-link">
        {links.map((link) => (
          <div className="card" style={{ textAlign: "center" }}>
            <div className="card_texts">
              <h2 className="card_title">{link.name}</h2>
              <a href={link.url}>{link.url}</a>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LinkCard;
