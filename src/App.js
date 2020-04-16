import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";
import Nav from "./Nav";
import PaginationFooter from "./Pagination";
import Modal from "react-modal";
import { Form } from "react-bootstrap";

import "./App.css";
import style from "./Modal.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

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
  const [modalIsOpen, setModalIsOepn] = useState(false);

  let indexOfFirstCard = 0;
  let indexOfLastCard = 10;
  let inputClass = "search-bar";
  let buttonClass = "search-button";

  const dishTypes = [
    "Bread",
    "Cereals",
    "Condiments and sauces",
    "Drinks",
    "Desserts",
    "Main course",
    "Pancake",
    "Preps",
    "Preserve",
    "Salad",
    "Sandwiches",
    "Side dish",
    "Soup",
    "Starter",
    "Sweets",
  ];

  const cuisineTypes = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ];

  const dietLabels = [
    {
      name: "Balanced",
      apiName: "balanced",
      descirption: "Protein/Fat/Carb values in 15/35/50 ratio",
    },
    {
      name: "High-Fiber",
      apiName: "high-fiber",
      descirption: "More than 5g fiber per serving",
    },
    {
      name: "High-Protein",
      apiName: "high-protein",
      descirption: "More than 50% of total calories from proteins",
    },
    {
      name: "Low-Carb",
      apiName: "low-carb",
      descirption: "Less than 20% of total calories from carbs",
    },
    {
      name: "Low-Fat",
      apiName: "low-fat",
      descirption: "Less than 15% of total calories from fat",
    },
    {
      name: "Low-Sodium",
      apiName: "low-sodium",
      descirption: "Less than 140mg Na per serving",
    },
  ];

  const healthLabels = [
    {
      name: "Alcohol-free",
      apiName: "alcohol-free",
      descirption: "No alcohol used or contained",
    },
    {
      name: "Celery-free",
      apiName: "celery-free",
      descirption: "does not contain celery or derivatives",
    },
    {
      name: "Crustcean-free",
      apiName: "crustacean-free",
      descirption:
        "does not contain crustaceans (shrimp, lobster etc.) or derivatives",
    },
    {
      name: "Dairy",
      apiName: "dairy-free",
      descirption: "No dairy; no lactose",
    },
    {
      name: "Eggs",
      apiName: "egg-free",
      descirption: "No eggs or products containing eggs",
    },
    {
      name: "Fish",
      apiName: "fish-free",
      descirption: "No fish or fish derivatives",
    },
    {
      name: "FODMAP free",
      apiName: "fodmap-free",
      descirption: "Does not contain FODMAP foods",
    },
    {
      name: "Gluten",
      apiName: "gluten-free",
      descirption: "No ingredients containing gluten",
    },
    {
      name: "Keto",
      apiName: "keto-friendly",
      descirption: "Maximum 7 grams of net carbs per serving",
    },
    {
      name: "Kidney friendly",
      apiName: "kidney-friendly",
      descirption:
        "per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg",
    },
    {
      name: "Kosher",
      apiName: "kosher",
      descirption:
        "contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves",
    },
    {
      name: "Low potassium",
      apiName: "low-potassium",
      descirption: "Less than 150mg per serving",
    },
    {
      name: "Lupine-free",
      apiName: "lupine-free",
      descirption: "does not contain lupine or derivatives",
    },
    {
      name: "Mustard-free",
      apiName: "mustard-free",
      descirption: "does not contain mustard or derivatives",
    },
    {
      name: "n/a",
      apiName: "low-fat-abs",
      descirption: "Less than 3g of fat per serving",
    },
    {
      name: "No oil added",
      apiName: "No-oil-added",
      descirption:
        "No oil added except to what is contained in the basic ingredients",
    },
    {
      name: "No-sugar",
      apiName: "low-sugar",
      descirption:
        "No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose",
    },
    {
      name: "Paleo",
      apiName: "paleo",
      descirption:
        "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils",
    },
    {
      name: "Peanuts",
      apiName: "peanut-free",
      descirption: "No peanuts or products containing peanuts",
    },
    {
      name: "Pescatarian",
      apiName: "pecatarian",
      descirption:
        "Does not contain meat or meat based products, can contain dairy and fish",
    },
    {
      name: "Pork-free",
      apiName: "pork-free",
      descirption: "does not contain pork or derivatives",
    },
    {
      name: "Red meat-free",
      apiName: "red-meat-free",
      descirption:
        "does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.",
    },
    {
      name: "Sesame-free",
      apiName: "sesame-free",
      descirption: "does not contain sesame seed or derivatives",
    },
    {
      name: "Shellfish",
      apiName: "shellfish-free",
      descirption: "No shellfish or shellfish derivatives",
    },
    {
      name: "Soy",
      apiName: "soy-free",
      descirption: "No soy or products containing soy",
    },
    {
      name: "Sugar-conscious",
      apiName: "sugar-conscious",
      descirption: "Less than 4g of sugar per serving",
    },
    {
      name: "Tree Nuts",
      apiName: "tree-nut-free",
      descirption: "No tree nuts or products containing tree nuts",
    },
    {
      name: "Vegan",
      apiName: "vegan",
      descirption: "No meat, poultry, fish, dairy, eggs or honey",
    },
    {
      name: "Vegetarian",
      apiName: "vegetarian",
      descirption: "No meat, poultry, or fish",
    },
    {
      name: "Wheat-free",
      apiName: "wheat-free",
      descirption: "No wheat, can have gluten though",
    },
  ];
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
        <button onClick={() => setModalIsOepn(true)}>Advanced Search</button>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOepn(false)}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
      >
        <div className="ModalHeader" style={{ dislay: "flex" }}>
          <h2>Advanced Search</h2>
        </div>
        <div className="ModalContent">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Serch: </Form.Label>
              <Form.Control type="text" placeholder="Chicken" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Number of Items Per Page</Form.Label>
              <Form.Control as="select">
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Meal Type: </Form.Label>
              <Form.Control as="select">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Dish Types</Form.Label>
              <Form.Control as="select">
                {dishTypes.map((dishType) => (
                  <option>{dishType}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Cuisine Types</Form.Label>
              <Form.Control as="select">
                {cuisineTypes.map((cuisineType) => (
                  <option>{cuisineType}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Diet</Form.Label>

              <div className="mb-3">
                {dietLabels.map((dietLabel, index) => (
                  <Form.Check
                    inline
                    label={dietLabel.name}
                    type="checkbox"
                    id={`inline-${dietLabel.name}-${index}`}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Health Labels</Form.Label>
              {/* {//TODO work on hover for description } */}
              <div className="mb-3">
                {healthLabels.map((healthLabel, index) => (
                  <Form.Check
                    inline
                    label={`${healthLabel.name} `}
                    type="checkbox"
                    id={`inline-${healthLabel.name}-${index}`}
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
        </div>
        <div>
          <button onClick={() => setModalIsOepn(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
