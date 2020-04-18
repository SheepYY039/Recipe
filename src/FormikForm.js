import React from "react";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as yup from "yup";

const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    // ! <FormControlLabel
    //   value={field.value}
    //   onChange={field.onChange}
    //   control={<Radio />}
    //   Label={label}
    //! /> OR
    <FormControlLabel {...field} control={<Radio />} label={label} />
  );
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
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

const FormikForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          search: "",
          isTall: false,
          cookies: [],
          yogurt: "",
          pets: [{ type: "cat", name: "Jarvis", id: "" + Math.random() }],
        }}
        // || validation using yup
        validationSchema={validationSchema}
        // || validation without using yup
        // validate={(values) => {
        //   const errors = {};

        //   if (values.search.includes("bob")) {
        //     errors.search = "no bob";
        //   }
        //   return errors;
        // }}

        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // *make async call
          console.log("Submit: ", data);
          setSubmitting(false);
          resetForm(true);
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form>
            <h3>Search: </h3>
            {/* // || <MyTextField
              placeholder="Chicken"
              name="search"
              type="input"
              as={TextField}
            /> */}
            {/* // ||  A simpler way of using text field */}
            <Field
              placeholder="Chicken"
              name="search"
              type="input"
              as={TextField}
            />
            {/* // || with the same name, the text will sync */}
            {/* // * <TextField
              name="search"
              value={values.search}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
            {/* Checkbox */}
            {/* // * <Field name="isTall" type="checkbox" as={Checkbox}></Field> */}
            {/* multiple checkboxes starts here */}
            <div>Cookies: </div>
            <Field
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              as={Checkbox}
            ></Field>
            <Field
              name="cookies"
              type="checkbox"
              value="snicker doodle"
              as={Checkbox}
            ></Field>
            <Field
              name="cookies"
              type="checkbox"
              value="sugar"
              as={Checkbox}
            ></Field>
            {/* multiple checkboxes ends here */}
            {/* Radio Button starts here */}
            <div>Yogurts: </div>
            {/* // ! <Field name="yogurt" type="radio" value="peach" as={Radio}></Field> OR */}
            <Field name="yogurt" type="radio" value="peach" as={MyRadio} />
            <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
            <Field name="yogurt" type="radio" value="mango" as={Radio}></Field>
            <Field
              name="yogurt"
              type="radio"
              value="blueberry"
              as={Radio}
            ></Field>

            {/* Radio Buttons ends here */}
            {/* // || lines up with pets.name */}
            <FieldArray name="pets">
              {(arrayHelpers) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        type: "frog",
                        name: "",
                        // ! empty string to cast Math.random() into a string
                        id: "" + Math.random(),
                      })
                    }
                  >
                    add Pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    const name = `pets.${index}.name`;
                    {
                      /* if the ket is pet.name, then the text field will loose focus whenever someone types a letter so instead, use an auto generated id from Math.random */
                    }
                    return (
                      <div key={pet.id}>
                        <MyTextField placeholder="pet name" name={name} />
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">Cat</MenuItem>
                          <MenuItem value="dog">dog</MenuItem>
                          <MenuItem value="frog">frog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>

            <FieldArray name="pets">
              {(arrayHelpers) => (
                <div>
                  {values.pets.map((pet, index) => {
                    const name = `pets.${index}.name`;
                    {
                      /* if the ket is pet.name, then the text field will loose focus whenever someone types a letter so instead, use an auto generated id from Math.random */
                    }
                    return (
                      <div key={pet.id}>
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">{pet.name}</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>

            {/* Button */}
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
