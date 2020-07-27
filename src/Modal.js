import React, { useEffect, useMemo, useState } from "react";

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
Modal.setAppElement("#root");

const AdvancedSearchModal = ({
  setCardsPerPage,
  setQuery,
  setSearch,
  setModalIsOpen,
  search,
  cardsPerPage,
  indexOfLastCard,
  currentPage,
  indexOfFirstCard,
  setSearchRange,
  modalIsOpen,
  updateSearch,
  searchRange,
}) => {
  const [submitValues, setSubmitValues] = useState( "" );
  const [initialValues, setInitialValues] = useState({
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
  });
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

  const setOnSubmit = (e) => {
    setModalIsOpen(false);

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
  };

  return (
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
            // setInitialValues(data);
            console.log(data);
            // *make async call
            setSubmitValues(data.MealType);
            console.log(search);
            setModalIsOpen(false);
            setOnSubmit();
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

              {/* Items Per page starts here */}
              <div className={classes.root}>{"Items per Page: "}</div>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <Slider
                    name="cardsPerPage"
                    value={typeof cardsPerPage === "number" ? cardsPerPage : 0}
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
              {/* Items Per page ENds here */}

              {/* Meal Type Radio Button starts here */}
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

              {/* Meal Type Radio Buttons ends here */}

              {/* DishType multiple checkboxes starts here */}
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
              {/* DishType multiple checkboxes ends here */}
              {/* Cuisine Type starts Here */}
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
              {/* Cuisine Type Ends here */}
              {/* Diet Radio Button starts here */}
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
              {/* Diet Radio Buttons ends here */}

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

              {/* Submit Button Starts Here */}
              <div>
                <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              </div>
              {/* Submit Button Ends Here */}

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
  );
};

export default AdvancedSearchModal;
