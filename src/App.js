import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";
import Nav from "./Nav";
import PaginationFooter from "./Pagination";

import "./App.css";

import Modal from "react-modal";
import * as yup from "yup";
import { Formik, Form, useField, FieldArray } from "formik";
import "typeface-roboto";

import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Slider,
  Grid,
  RadioGroup,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

//use Styles
const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "1.5em",
  },
  input: {
    width: 42,
  },
  sliderRoot: {
    width: "50%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

//MyRadio
const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControlLabel
      {...props}
      {...field}
      control={<GreenRadio />}
      label={label}
    />
  );
};

//Green Radio
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//My Checkbox
const MyCheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControlLabel
      {...field}
      {...props}
      control={<GreenCheckbox />}
      label={label}
    />
  );
};

//Green Checkbox
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

//Validation Schema
const validationSchema = yup.object({
  // || passing validation to search using yup
  search: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

//Slider Value Text sync function
function valuetext(value) {
  return `${value}`;
}

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
  const [choose, setChoose] = useState("");

  let indexOfFirstCard = 0;
  let indexOfLastCard = cardsPerPage;
  let inputClass = "search-bar";
  let buttonClass = "search-button";

  const [searchRange, setSearchRange] = useState(
    `&from=${indexOfFirstCard}&to=${indexOfLastCard}`
  );

  //use Effect
  useEffect(() => {
    async function getRecipes() {
      // get current posts
      setLoading(true);
      // || use await for data that doesn't come back instantly
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}${searchRange}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      setCards(data);
      console.log(data);
      setLoading(false);
    }
    getRecipes();
  }, [query, searchRange]);

  const totalCards = 100;

  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    indexOfLastCard = pageNumber * cardsPerPage;
    indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setSearchRange(`&from=${indexOfFirstCard}&to=${indexOfLastCard}`);
  };

  //updates search query string when typing
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    // || prevent page refresh
    e.preventDefault();
    if (search.trim() !== "") {
      setQuery(search);
      setSearch("");
    }
  };

  const getAdvancedSearch = (e) => {
    if (search.trim() !== "") {
      setQuery(search);
      setSearch("");
      setModalIsOpen(false);
    }

    if (cardsPerPage !== 10) {
      indexOfLastCard = currentPage * cardsPerPage;
      indexOfFirstCard = indexOfLastCard - cardsPerPage;
      setSearchRange(`&from=${indexOfFirstCard}&to=${indexOfLastCard}`);
    }

    if (choose !== "") {
      console.log("advanced:" + choose);
    }
  };

  //search bar hover function
  if (isHovered) {
    inputClass = "search-bar-expand search-bar";
    buttonClass = "search-button search-button-expand";
  } else {
    inputClass = "search-bar";
    buttonClass = "search-button";
  }

  const classes = useStyles();

  //slider change
  const handleSliderChange = (event, newValue) => {
    setCardsPerPage(newValue);
  };

  //input change next to slider
  const handleInputChange = (event) => {
    setCardsPerPage(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  return (
    <div className="App">
      <Nav />
      <div className="search-box">
        <p>Showing Results for:</p>
        <h4 style={{ textTransform: "uppercase" }}>{query}</h4>
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
        <Button onClick={() => setModalIsOpen(true)}>Advanced Search</Button>
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
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <div
          className="ModalHeader"
          style={{ display: "flex", marginLeft: "7%" }}
        >
          <h2>Advanced Search</h2>
        </div>

        <div className="ModalContent">
          <Formik
            initialValues={{
              search: "",
              cardsPerPage: `${cardsPerPage}`,
              dishTypes: [
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
              ],
              dietLabels: [
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
              ],
              cuisineTypes: [
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
              ],
              healthLabels: [
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
              ],
            }}
            // || validation using yup
            // validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              // *make async call
              console.log(data.MealType);
              setChoose(data);
              console.log(choose);
              getAdvancedSearch();
              console.log("Submit: ", data);
              setSubmitting(false);
              resetForm(true);
            }}
            className="advanced-search-form"
          >
            {({ values, errors, isSubmitting, handleBlur }) => (
              <Form
                style={{ margin: "10px", marginLeft: "7%", marginRight: "7%" }}
              >
                <div style={{ width: "70%" }}>
                  <div className={classes.root}>{"Search: "}</div>
                  <TextField
                    variant="outlined"
                    id="search"
                    label="Search"
                    type="search"
                    placeholder="Chicken"
                    fullWidth
                    onChange={updateSearch}
                  />
                </div>

                <div className={classes.root}>{"Items per Page: "}</div>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                    <Slider
                      name="cardsPerPage"
                      value={
                        typeof cardsPerPage === "number" ? cardsPerPage : 0
                      }
                      onChange={handleSliderChange}
                      // defaultValue={cardsPerPage}
                      getAriaValueText={valuetext}
                      aria-labelledby="item-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      min={10}
                      max={50}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      // defaultValue={cardsPerPage}
                      name="cardsPerPage"
                      value={cardsPerPage}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      type="number"
                      inputProps={{
                        step: 1,
                        min: 10,
                        max: 50,
                        "aria-labelledby": "item-slider",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Radio Button starts here */}
                <div className={classes.root}>{"Meal Type: "}</div>
                <RadioGroup row>
                  <MyRadio
                    name="MealType"
                    type="radio"
                    value="Breakfast"
                    as={Radio}
                    label="Breakfast"
                  />
                  <MyRadio
                    name="MealType"
                    type="radio"
                    value="Lunch"
                    as={Radio}
                    label="Lunch"
                  />
                  <MyRadio
                    name="MealType"
                    type="radio"
                    value="Dinner"
                    as={Radio}
                    label="Dinner"
                  />
                  <MyRadio
                    name="MealType"
                    type="radio"
                    value="Snack"
                    as={Radio}
                    label="Snack"
                  />
                </RadioGroup>

                {/* Radio Buttons ends here */}
                {/* multiple checkboxes starts here */}
                <div className={classes.root}>{"Dish Type: "}</div>
                <FieldArray name="Dish Type">
                  {(arrayHelpers) =>
                    values.dishTypes.map((dishType) => {
                      return (
                        <MyCheckBox
                          key={dishType}
                          name="dishType"
                          type="checkbox"
                          value={dishType}
                          as={Checkbox}
                          label={dishType}
                        />
                      );
                    })
                  }
                </FieldArray>
                {/* multiple checkboxes ends here */}

                <div className={classes.root}>{"Cuisine Type: "}</div>
                <FieldArray name="CuisineTypes">
                  {(arrayHelpers) =>
                    values.cuisineTypes.map((cuisineType) => {
                      return (
                        <MyRadio
                          key={cuisineType}
                          name="cuisineType"
                          type="radio"
                          value={cuisineType}
                          as={Radio}
                          label={cuisineType}
                        />
                      );
                    })
                  }
                </FieldArray>

                {/* Radio Button starts here */}
                <div className={classes.root}>{"Diet: "}</div>
                <FieldArray name="Diet">
                  {(arrayHelpers) =>
                    values.dietLabels.map((dietLabel) => {
                      return (
                        <MyRadio
                          key={dietLabel.apiName}
                          name="dietLabel"
                          type="radio"
                          value={dietLabel.apiName}
                          as={Radio}
                          label={dietLabel.name}
                        />
                      );
                    })
                  }
                </FieldArray>
                {/* Radio Buttons ends here */}

                <div className={classes.root}>{"Health: "}</div>
                <FieldArray row name="Health">
                  {(arrayHelpers) =>
                    values.healthLabels.map((healthLabel) => {
                      return (
                        <MyCheckBox
                          key={healthLabel.apiName}
                          name="healthLabel"
                          type="checkbox"
                          value={healthLabel.apiName}
                          as={Checkbox}
                          label={healthLabel.name}
                        />
                      );
                    })
                  }
                </FieldArray>

                <div>
                  <Button disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                </div>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <Button onClick={() => setModalIsOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
