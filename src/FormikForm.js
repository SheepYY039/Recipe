import React from "react";
import "typeface-roboto";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import { green } from "@material-ui/core/colors";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Grid,
  FormControl,
} from "@material-ui/core";
import * as yup from "yup";

const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return <FormControlLabel {...field} control={<GreenRadio />} label={label} />;
};
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const MyCheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControlLabel {...field} control={<GreenCheckbox />} label={label} />
  );
};

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const MyTextField = ({ id, label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      id="error"
      label={label}
      type="search"
      variant="outlined"
      fullWidth
    />
    // ! error={!!errorText} casting to boolean, if this string is empty--> false
  );
};

const validationSchema = yup.object({
  // || passing validation to search using yup
  search: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

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
}));

function valuetext(value) {
  return `${value}`;
}

const FormikForm = ({
  selectMealTypes,
  setSelectMealTypes,
  selectCuisineTypes,
  setSelectCuisineTypes,
}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(10);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 50) {
      setValue(50);
    }
  };

  const handleChange = (event) => {
    setSelectMealTypes(event.target.value);
  };
  return (
    <div>
      <Formik
        initialValues={{
          search: "",
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
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // *make async call
          console.log("Submit: ", data);
          setSubmitting(false);
          resetForm(true);
        }}
      >
        {({ values, errors, isSubmitting, handleBlur }) => (
          <Form style={{ margin: "10px", marginLeft: "7%", marginRight: "7%" }}>
            <div style={{ width: "70%" }}>
              <div className={classes.root}>{"Search: "}</div>
              <TextField
                variant="outlined"
                id="search"
                label="Search"
                type="search"
                placeholder="Chicken"
                fullWidth
              />
            </div>

            <div className={classes.root}>{"Items per Page: "}</div>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <Slider
                  value={typeof value === "number" ? value : 0}
                  onChange={handleSliderChange}
                  defaultValue={10}
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
                  defaultValue="10"
                  value={value}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  type="number"
                  inputProps={{
                    step: 5,
                    min: 10,
                    max: 50,
                    "aria-labelledby": "item-slider",
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <div className={classes.root}>{"Meal Type: "}</div>
            <FormControl className={classes.formControl}>
              <InputLabel id="MealTypeLabel">Meal Type</InputLabel>
              <Select
                labelId="MealTypeSelectLabel"
                id="MealTypeSelect"
                value={selectMealTypes}
                onChange={handleChange}
              >
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
                <MenuItem value="snack">Snack</MenuItem>
              </Select>
            </FormControl>
            {/* multiple checkboxes starts here */}
            <div className={classes.root}>{"Dish Type: "}</div>
            <FieldArray name="Dish Type">
              {(arrayHelpers) =>
                values.dishTypes.map((dishType) => {
                  return (
                    <MyCheckBox
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
            <FormControl className={classes.formControl}>
              <InputLabel id="CuisineTypeLabel">Cuisine Type</InputLabel>
              <Select
                labelId="CuisineTypeSelectLabel"
                id="CuisineTypeSelect"
                value={selectCuisineTypes}
                onChange={handleChange}
              >
                {(arrayHelpers) =>
                  values.cuisineTypes.map((cuisineType) => {
                    return <MenuItem value={cuisineType} label={cuisineType} />;
                  })
                }
              </Select>
            </FormControl>

            {/* Radio Button starts here */}
            <div className={classes.root}>{"Diet: "}</div>
            <FieldArray name="Diet">
              {(arrayHelpers) =>
                values.dietLabels.map((dietLabel) => {
                  return (
                    <MyRadio
                      name="dietLabel"
                      type="radio"
                      value={dietLabel.name}
                      as={Radio}
                      label={dietLabel.name}
                    />
                  );
                })
              }
            </FieldArray>
            {/* Radio Buttons ends here */}

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
  );
};

export default FormikForm;
