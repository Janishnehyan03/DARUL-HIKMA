import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3 style={{color:'white'}} >Darul Hikma</h3>
          <p style={{color:'white'}} >
            <a style={{ fontSize: "20px" }} href="https://www.dhiu.in">
              dhiu.in
            </a>
          </p>
          <p className="footer-company-name">
            Darul Hikma © <span id="footer-year">error;</span>
          </p>
          <div className="footer-donate">
            <Link to="/donation">
              <button>Donate Us</button>
            </Link>
          </div>
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker" />
            <p>
              <span>Darul Huda Islamic University</span> Chemmad, Kerala
            </p>
          </div>
          <div>
            <i className="fa fa-phone" />
            <p>0494-2463155</p>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <p>darulhikma@dhiu.in</p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About Darul Hikma</span>
            DARUL HIKMA is Zainul Ulama memorial reading and conference hall
            with digital resource hub, providing internet facilities, which
            supports a culture of reading by showcasing an extensive collection
            of books in distinct languages, including religious and material
            books, or translated works covering all common areas. It also
            features on international newspapers, journals, magazines,
            periodicals, dictionaries and biographies.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
