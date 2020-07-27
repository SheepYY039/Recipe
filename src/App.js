import React, { useEffect, useState } from "react";

import Recipe from "./Recipe/Recipe";
import Nav from "./nav/Nav";
import PaginationFooter from "./Recipe/Pagination";

import "./App.css";

import "typeface-roboto";

import Modal from "react-modal";
import * as yup from "yup";
import { Formik, Form, useField, FieldArray } from "formik";
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
let initialValues = require("./initialValues");
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
  let indexOfLastCard = cardsPerPage;
  let inputClass = "search-bar";
  let buttonClass = "search-button";
  initialValues["cardsPerPage"] = cardsPerPage;

  const [searchRange, setSearchRange] = useState(
    `&from=${indexOfFirstCard}&to=${indexOfLastCard}`
  );
  let choose = "";

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
    }

    if (cardsPerPage !== 10) {
      indexOfLastCard = currentPage * cardsPerPage;
      indexOfFirstCard = indexOfLastCard - cardsPerPage;
      setSearchRange(
        searchRange + `&from=${indexOfFirstCard}&to=${indexOfLastCard}`
      );
    }

    if (choose.MealType !== "") {
      console.log(choose.MealType);
      const mealType = choose.MealType.toLowerCase();
      setSearchRange(searchRange + `&meal?query=${mealType}`);
      console.log(searchRange);
    }
    setModalIsOpen(false);
    console.log(choose);
  };

  //search bar hover function
  if (isHovered) {
    inputClass = "search-bar-expand search-bar";
    buttonClass = "search-button search-button-expand";
  } else {
    inputClass = "search-bar";
    buttonClass = "search-button";
  }

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

  //Slider Value Text sync function
  function valuetext(value) {
    return `${value}`;
  }

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
        {recipes.map((recipe, count) => (
          <Recipe
            key={recipe.recipe.label + count}
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
            initialValues={initialValues}
            // || validation using yup
            // validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              // *make async call
              choose = data;
              console.log(choose.MealType);
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
