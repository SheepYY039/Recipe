import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";
import Nav from "./Nav";
import PaginationFooter from "./Pagination";

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
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);

  let indexOfFirstCard = 0;
  let indexOfLastCard = 10;
  let inputClass = "search-bar";
  let buttonClass = "search-button";

  const [searchRange, setSearchRange] = useState("&from=0&to=10");

  useEffect(() => {
    async function getRecipes() {
      // get current posts
      setLoading(true);
      // || use await for data that doesn't come back instantly
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}${searchRange}`

        // `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      setCards(data);
      console.log(data);
      setLoading(false);
    }
    getRecipes();
  }, [query, searchRange]);

  console.log(cards);

  const totalCards = 100;
  console.log(totalCards);

  //change page
  const paginate = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);

    console.log(currentPage);
    indexOfLastCard = pageNumber * cardsPerPage;
    indexOfFirstCard = indexOfLastCard - cardsPerPage;

    console.log(indexOfLastCard);

    console.log(indexOfFirstCard);
    setSearchRange(`&from=${indexOfFirstCard}&to=${indexOfLastCard}`);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    // || prevent page refresh
    e.preventDefault();
    if (!(search === "" || search === " ")) {
      setQuery(search);
      setSearch("");
    }
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
      <div className="search-box">
        <p>
          Showing Results for:
          <br />
          <h4>{query}</h4>
        </p>
        <form
          onSubmit={getSearch}
          className="search-form"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
            key={recipe.recipe.label + recipe.recipe.calories}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            loading={loading}
          />
        ))}
      </div>
      <footer>
        <PaginationFooter
          cardsPerPage={cardsPerPage}
          totalCards={totalCards}
          paginate={paginate}
        />
      </footer>
    </div>
  );
};

export default App;
