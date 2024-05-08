import React from "react";
import ReactDOM from "react-dom";

const favoriteWhat = "Food";

ReactDOM.render(
  <div>
    <h1>My Favorite {favoriteWhat}</h1>
    <ul>
      <li>Sushi</li>
      <li>Pizza</li>
      <li>Fit Food</li>
    </ul>
  </div>,
  document.getElementById("root")
);
