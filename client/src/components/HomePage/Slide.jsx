import React from "react";

function Slide() {
  return (
    <div>
      <div className="slideshow">
        <div className="updates" style={{ display: "block" }}>
          <img
            className="responsive"
            src="slide1.jpg"
            alt=""
          />
        </div>
        <div className="updates" style={{ display: "none" }}>
          <img
            className="responsive"
            src="slide2.jpg"
            alt=""
          />
        </div>
        <div className="updates" style={{ display: "none" }}>
          <img
            className="responsive"
            src="slide3.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Slide;
