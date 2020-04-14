import React from "react";
import style from "./Recipe.module.css";
import Card from "./Card";
import CustomScrollBars from "./CustomScrollBars";

import Flippy, { FrontSide, BackSide } from "react-flippy";

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    // TODO Write a function or style to resize h1 to fit div
    <div className={style.recipe}>
      <Flippy
        className={style.card}
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        // ref={(r) => (this.flippy = r)} // to use toggle method like this.flippy.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
        /// these are optional style, it is not necessary
        // *style={{ zIndex: 0 }}
      >
        <FrontSide
          className={style.front}
          elementType={Card}
          animationDuration={300}
        >
          <div className={style.frontContent}>
            <div className={style.title}>
              <h1>{title}</h1>
            </div>
            <img src={image} alt={title} />
          </div>
        </FrontSide>

        <BackSide
          className={`${style.back} ${style.card}`}
          animationDuration={300}
        >
          <div className={style.recipeContent}>
            <h3>Ingredients</h3>
            <CustomScrollBars>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                }}
              >
                <ol>
                  {ingredients.map((ingredient, i) => {
                    return (
                      <li key={[i, "-", ingredient]}>{ingredient.text}</li>
                    );
                  })}
                </ol>
              </div>
            </CustomScrollBars>
            <p>
              Calories: <strong>{calories}</strong> cal
            </p>
          </div>
        </BackSide>
      </Flippy>
    </div>
  );
};

export default Recipe;
