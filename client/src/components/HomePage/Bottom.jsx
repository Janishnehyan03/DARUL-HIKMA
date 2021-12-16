import React from "react";

function Bottom() {
  return (
    <div>
      <div className="vidAudNot">
        {/* audio */}
        <div className="audio">
          <div className="lastSecTitle">
            <h2>Audio</h2>
            <p>Get Latest auido Here</p>
          </div>
          <div className="content"></div>
        </div>
        {/* audio */}
        {/* video */}
        <div className="video">
          <div className="lastSecTitle">
            <h2>video</h2>
            <p>Get Latest Notificatons Here</p>
          </div>
          <div className="content">
            <div className="container">
              <div className="bigVideo">
                <div className="videoTitle">
                  <h1>Name of the video</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Impedit ex doloremque, fuga eos
                  </p>
                </div>
                <img
                  src="https://www.dhiu.in/source/Files/images/Life%20at%20Darulhuda%20(1).jpg"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
              <div className="bigVideo">
                <div className="videoTitle">
                  <h1>Name of the video</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Impedit ex doloremque, fuga eos
                  </p>
                </div>
                <img
                  src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
              <div className="bigVideo">
                <div className="videoTitle">
                  <h1>Name of the video</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Impedit ex doloremque, fuga eos
                  </p>
                </div>
                <img
                  src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
              <div className="bigVideo">
                <div className="videoTitle">
                  <h1>Name of the video</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Impedit ex doloremque, fuga eos
                  </p>
                </div>
                <img
                  src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
              <a href="#/" className="prev" onclick="plusSlides(-1)">
                ❮
              </a>
              <a href="#/" className="next" onclick="plusSlides(1)">
                ❯
              </a>
            </div>
            <div className="caption-container">
              <p id="caption" />
            </div>
            <div className="thumbnailSec">
              <div className="thumbnail">
                <img
                  className="demo cursor-pointer"
                  src="https://www.dhiu.in/source/Files/images/Life%20at%20Darulhuda%20(1).jpg"
                  style={{ width: "100%" }}
                  onclick="currentSlide(1)"
                  alt=""
                />
              </div>
              <div className="thumbnail">
                <img
                  className="demo cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2013/04/04/12/34/mountains-100367__340.jpg"
                  style={{ width: "100%" }}
                  onclick="currentSlide(2)"
                  alt=""
                />
              </div>
              <div className="thumbnail">
                <img
                  className="demo cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2015/01/07/15/51/woman-591576__340.jpg"
                  style={{ width: "100%" }}
                  onclick="currentSlide(3)"
                  alt=""
                />
              </div>
              <div className="thumbnail">
                <img
                  className="demo cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2015/01/07/15/51/woman-591576__340.jpg"
                  style={{ width: "100%" }}
                  onclick="currentSlide(4)"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* video end */}
        {/* notification */}
        <div className="notification">
          <div className="lastSecTitle">
            <h2>Notifications</h2>
            <p>Get Latest Notificatons Here</p>
          </div>
          <div
            className="content"
            title="Scroll Inside This Section for reading all notifications"
          >
            <button className="accordion">Section 1</button>
            <div className="panel">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                veniam blanditiis beatae deserunt explicabo quam ipsa cum
                perferendis accusamus labore placeat animi perspiciatis, omnis
                ipsum iure neque distinctio consequatur. Doloremque.
              </p>
            </div>
            <button className="accordion">Section 2</button>
            <div className="panel">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button className="accordion">Section 2</button>
            <div className="panel">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button className="accordion">Section 2</button>
            <div className="panel">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button className="accordion">Section 2</button>
            <div className="panel">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button className="accordion">Section 3</button>
            <div className="panel">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bottom;
