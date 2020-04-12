import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";
import Nav from "./Nav";

import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const APP_ID = "65eff37b";
  const APP_KEY = "013e642e140af7db99a3663be34125e2";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [isHovered, setIsHovered] = useState(false);

  let inputClass = "search-bar";
  let buttonClass = "search-button";

  useEffect(() => {
    async function getRecipes() {
      // || use await for data that doesn't come back instantly
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data);
    }
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    // || prevent page refresh
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  if (isHovered) {
    inputClass = "search-bar-expand search-bar";
    buttonClass = "search-button search-button-expand";
  } else {
    inputClass = "search-bar";
    buttonClass = "search-button";
  }

  return (
    <div className="App">
      <Nav />
      <div
        className="search-box"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <form onSubmit={getSearch} className="search-form">
          <input
            type="text"
            className={inputClass}
            value={search}
            onChange={updateSearch}
            placeholder="Type to search"
          />
          <button className={buttonClass} type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      <div className="recipes">
        {/* // || .map function used for looping arrays */}
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
