import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";
import Nav from "./Nav";
import PaginationFooter from "./Pagination";
import Modal from "react-modal";
import { Form, Button, Row, Col } from "react-bootstrap";
import PopoverStickOnHover from "./PopOver";

import "./App.css";
import style from "./Modal.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      description: "Protein/Fat/Carb values in 15/35/50 ratio",
    },
    {
      name: "High-Fiber",
      apiName: "high-fiber",
      description: "More than 5g fiber per serving",
    },
    {
      name: "High-Protein",
      apiName: "high-protein",
      description: "More than 50% of total calories from proteins",
    },
    {
      name: "Low-Carb",
      apiName: "low-carb",
      description: "Less than 20% of total calories from carbs",
    },
    {
      name: "Low-Fat",
      apiName: "low-fat",
      description: "Less than 15% of total calories from fat",
    },
    {
      name: "Low-Sodium",
      apiName: "low-sodium",
      description: "Less than 140mg Na per serving",
    },
  ];

  const healthLabels = [
    {
      name: "Alcohol-free",
      apiName: "alcohol-free",
      description: "No alcohol used or contained",
    },
    {
      name: "Celery-free",
      apiName: "celery-free",
      description: "does not contain celery or derivatives",
    },
    {
      name: "Crustacean-free",
      apiName: "crustacean-free",
      description:
        "does not contain crustaceans (shrimp, lobster etc.) or derivatives",
    },
    {
      name: "Dairy",
      apiName: "dairy-free",
      description: "No dairy; no lactose",
    },
    {
      name: "Eggs",
      apiName: "egg-free",
      description: "No eggs or products containing eggs",
    },
    {
      name: "Fish",
      apiName: "fish-free",
      description: "No fish or fish derivatives",
    },
    {
      name: "FODMAP free",
      apiName: "fodmap-free",
      description: "Does not contain FODMAP foods",
    },
    {
      name: "Gluten",
      apiName: "gluten-free",
      description: "No ingredients containing gluten",
    },
    {
      name: "Keto",
      apiName: "keto-friendly",
      description: "Maximum 7 grams of net carbs per serving",
    },
    {
      name: "Kidney friendly",
      apiName: "kidney-friendly",
      description:
        "per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg",
    },
    {
      name: "Kosher",
      apiName: "kosher",
      description:
        "contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves",
    },
    {
      name: "Low potassium",
      apiName: "low-potassium",
      description: "Less than 150mg per serving",
    },
    {
      name: "Lupine-free",
      apiName: "lupine-free",
      description: "does not contain lupine or derivatives",
    },
    {
      name: "Mustard-free",
      apiName: "mustard-free",
      description: "does not contain mustard or derivatives",
    },
    {
      name: "n/a",
      apiName: "low-fat-abs",
      description: "Less than 3g of fat per serving",
    },
    {
      name: "No oil added",
      apiName: "No-oil-added",
      description:
        "No oil added except to what is contained in the basic ingredients",
    },
    {
      name: "No-sugar",
      apiName: "low-sugar",
      description:
        "No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose",
    },
    {
      name: "Paleo",
      apiName: "paleo",
      description:
        "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils",
    },
    {
      name: "Peanuts",
      apiName: "peanut-free",
      description: "No peanuts or products containing peanuts",
    },
    {
      name: "Pescatarian",
      apiName: "pecatarian",
      description:
        "Does not contain meat or meat based products, can contain dairy and fish",
    },
    {
      name: "Pork-free",
      apiName: "pork-free",
      description: "does not contain pork or derivatives",
    },
    {
      name: "Red meat-free",
      apiName: "red-meat-free",
      description:
        "does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.",
    },
    {
      name: "Sesame-free",
      apiName: "sesame-free",
      description: "does not contain sesame seed or derivatives",
    },
    {
      name: "Shellfish",
      apiName: "shellfish-free",
      description: "No shellfish or shellfish derivatives",
    },
    {
      name: "Soy",
      apiName: "soy-free",
      description: "No soy or products containing soy",
    },
    {
      name: "Sugar-conscious",
      apiName: "sugar-conscious",
      description: "Less than 4g of sugar per serving",
    },
    {
      name: "Tree Nuts",
      apiName: "tree-nut-free",
      description: "No tree nuts or products containing tree nuts",
    },
    {
      name: "Vegan",
      apiName: "vegan",
      description: "No meat, poultry, fish, dairy, eggs or honey",
    },
    {
      name: "Vegetarian",
      apiName: "vegetarian",
      description: "No meat, poultry, or fish",
    },
    {
      name: "Wheat-free",
      apiName: "wheat-free",
      description: "No wheat, can have gluten though",
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

  const getAdvancedSearch = (e) => {
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
        <button onClick={() => setModalIsOpen(true)}>Advanced Search</button>
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
        onRequestClose={() => setModalIsOpen(false)}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
      >
        <div className="ModalHeader" style={{ display: "flex" }}>
          <h2>Advanced Search</h2>
        </div>
        <div className="ModalContent">
          <Form onSubmit={getAdvancedSearch} className="advanced-search-form">
            {/* Search Starts Here */}
            <Form.Group controlId="Search">
              <Form.Label>Search: </Form.Label>
              <Form.Control type="text" placeholder="Chicken" />
            </Form.Group>
            {/* Search Ends Here */}
            {/* No. of Items Starts Here */}
            <Form.Group controlId="NoOfItems">
              <Form.Label>Number of Items Per Page</Form.Label>
              <Form.Control as="select">
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
              </Form.Control>
            </Form.Group>
            {/* No. of Items Ends Here */}
            {/* Meal Type Starts Here */}
            <Form.Group controlId="MealType">
              <Form.Label>Meal Type: </Form.Label>
              <Form.Control as="select">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="DishType">
              <Form.Label>Dish Type</Form.Label>
              <div className="mb-3">
                {dishTypes.map((dishType, index) => (
                  <div style={{ display: "inline-flex" }}>
                    <Form.Check
                      inline
                      label={`${dishType} `}
                      type="checkbox"
                      id={`inline-${dishType}-${index}`}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>
            {/* Meal Type Ends Here */}
            {/* Cuisine Type Starts Here */}
            <Form.Group controlId="CuisineType">
              <Form.Label>Cuisine Types</Form.Label>
              <Form.Control as="select">
                {cuisineTypes.map((cuisineType) => (
                  <option>{cuisineType}</option>
                ))}
              </Form.Control>
            </Form.Group>
            {/* CuisineType Ends Here */}
            {/* Diet Starts Here */}
            <fieldset>
              <Form.Group controlId="Diet">
                <Form.Label>Diet</Form.Label>
                <div className="mb-3">
                  {dietLabels.map((dietLabel, index) => (
                    <PopoverStickOnHover
                      component={<div>{`${dietLabel.description}`}</div>}
                      placement="top"
                      onMouseEnter={() => {}}
                      delay={200}
                    >
                      <div style={{ display: "inline-flex" }}>
                        <Form.Check
                          inline
                          label={`${dietLabel.name} `}
                          type="radio"
                          name="formHorizontalRadios"
                          id={`inline-${dietLabel.name}-${index}`}
                        />
                      </div>
                    </PopoverStickOnHover>
                  ))}
                </div>
              </Form.Group>
            </fieldset>
            {/* Diet ENds Here */}
            {/* Health Labels Starts Here */}
            <Form.Group controlId="HealthLabel">
              <Form.Label>Health Labels</Form.Label>
              <div className="mb-3">
                {healthLabels.map((healthLabel, index) => (
                  <PopoverStickOnHover
                    component={<div>{`${healthLabel.description}`}</div>}
                    placement="top"
                    onMouseEnter={() => {}}
                    delay={200}
                  >
                    <div style={{ display: "inline-flex" }}>
                      <Form.Check
                        inline
                        label={`${healthLabel.name} `}
                        type="checkbox"
                        id={`inline-${healthLabel.name}-${index}`}
                      />
                    </div>
                  </PopoverStickOnHover>
                ))}
              </div>
            </Form.Group>
            {/* Health Label Ends here */}
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
