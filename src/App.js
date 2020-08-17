import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import Popup from "./components/Popup";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    searchQuery: "",
    results: [],
    selected: {},
    page_num: 1,
    next_call: false,
    prev_call: false,
  });
  const api = "http://www.omdbapi.com/?apikey=7e808ec3";
  useEffect(() => {
    search();
  }, [state.page_num]);
  const search = (e) => {
    if (
      (e !== undefined && e.key === "Enter") ||
      state.prev_call ||
      state.next_call
    ) {
      axios(api + "&s=" + state.searchQuery + "&page=" + state.page_num).then(
        (res) => {
          console.log(res);
          const results = res.data.Search;
          setState((prevState) => {
            return {
              ...prevState,
              results: results,
              prev_call: false,
              next_call: false,
            };
          });
        }
      );
    }
  };
  const inputHandler = (event) => {
    const value = event.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        searchQuery: value,
        next_call: false,
        prev_call: false,
      };
    });
  };
  const openPopup = (id) => {
    console.log(id);
    axios(api + "&i=" + id).then((res) => {
      const result = res.data;
      console.log(res);
      setState((prevState) => {
        return {
          ...prevState,
          selected: result,
          prev_call: false,
          next_call: false,
        };
      });
    });
  };
  const closePopup = () => {
    setState((prevState) => {
      return {
        ...prevState,
        selected: {},
        prev_call: false,
        next_call: false,
      };
    });
  };
  const prevPageHandler = () => {
    const p = state.page_num;
    setState((prevState) => {
      return {
        ...prevState,
        page_num: p - 1,
        prev_call: true,
      };
    });
  };
  const nextPageHandler = () => {
    const p = state.page_num;
    setState((prevState) => {
      return {
        ...prevState,
        page_num: p + 1,
        next_call: true,
      };
    });
  };
  return (
    <div className="App">
      <header>
        <h1>Movie Databse</h1>
      </header>
      <main>
        <SearchBar inputHandler={inputHandler} search={search} />
        <Results results={state.results} openPopup={openPopup} />
        <br />
        {state.results.length === 0 || state.page_num === 1 ? null : (
          <button className="back" type="button" onClick={prevPageHandler}>
            Previous
          </button>
        )}
        {state.results.length < 10 ? null : (
          <button className="next" type="button" onClick={nextPageHandler}>
            Next
          </button>
        )}
        {typeof state.selected.Title !== "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
