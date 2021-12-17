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
            <div className="card_text">
              <a href={link.url}>
                <p className="card_title" style={{fontSize:"20px"}} >{link.name}</p>
              </a>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LinkCard;
