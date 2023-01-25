import React from "react";
import { Link } from "react-router-dom";
import Img404 from "../../images/404Img.gif";

const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <img src={Img404} alt="404 Img" />
      <div className="notfound__text">
        <h2>Look like you're lost</h2>
        <p>the page you are looking for not avaible</p>
      </div>
      <Link to="filesharing/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
