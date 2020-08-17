import React from "react";

const Popup = (props) => {
  return (
    <section className="popup">
      <div className="content">
        <h2>
          {props.selected.Title} <span>{props.selected.Year}</span>
        </h2>
        <p className="rating">IMDB Rating: {props.selected.imdbRating}</p>
        <div className="plot">
          <img src={props.selected.Poster} alt={props.selected.Title} />
          <p>{props.selected.Plot}</p>
        </div>
        <button className="close" onClick={props.closePopup}>
          Close
        </button>
      </div>
    </section>
  );
};
export default Popup;
