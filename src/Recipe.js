import React from "react";
import style from "./Recipe.module.css";
import Card from "./Card";
import CustomScrollBars from "./CustomScrollBars";
import { Textfit } from "react-textfit";

import Flippy, { FrontSide, BackSide } from "react-flippy";

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    // TODO Write a function or style to resize h1 to fit div
    <div className={style.recipe}>
      <Flippy
        className={style.card}
        flipOnHover={false}
        flipOnClick={true}
        flipDirection="horizontal"
        // *style={{ zIndex: 0 }}
      >
        <FrontSide
          className={style.front}
          elementType={Card}
          animationDuration={300}
        >
          <div className={style.frontContent}>
            <div className={style.h1Container}>
              <Textfit
                mode="single"
                forceSingleModeWidth={false}
                style={{
                  height: "69px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                {title}
              </Textfit>
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
                      <li
                        style={{ textTransform: "lowercase" }}
                        key={[i, "-", ingredient]}
                      >
                        {ingredient.text}
                      </li>
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
