import React from "react";

const SearchBar = (props) => {
  return (
    <section className="searchbox-wrap">
      <input
        type="text"
        placeholder="Search For a Movie..."
        className="searchbox"
        onChange={props.inputHandler}
        onKeyPress={props.search}
      />
    </section>
  );
};

export default SearchBar;
