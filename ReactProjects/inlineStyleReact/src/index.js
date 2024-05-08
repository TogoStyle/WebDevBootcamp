import React from "react";
import ReactDOM from "react-dom";

const favoriteWhat = "Food";
const sinceWhen = " Ever";

const customStyle = {
  color: "blue",
  fontSize: "50px",
  border: "5px solid purple",
};

ReactDOM.render(
  <div>
    {/* <h1>My Favorite {favoriteWhat +" "+sinceWhen}</h1> */}
    <h1 style={customStyle}>My Favorite {`${favoriteWhat} ${sinceWhen}`}</h1>
  </div>,
  document.getElementById("root")
);
