module.exports = {
  search: "",
  cardsPerPage: 10,
  // cardsPerPage: `${cardsPerPage}`,
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
    // {
    //   name: "High-Fiber",
    //   apiName: "high-fiber",
    //   description: "More than 5g fiber per serving",
    // },
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
    // {
    //   name: "Low-Sodium",
    //   apiName: "low-sodium",
    //   description: "Less than 140mg Na per serving",
    // },
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
    // {
    //   name: "Celery-free",
    //   apiName: "celery-free",
    //   description: "does not contain celery or derivatives",
    // },
    // {
    //   name: "Crustacean-free",
    //   apiName: "crustacean-free",
    //   description:
    //     "does not contain crustaceans (shrimp, lobster etc.) or derivatives",
    // },
    // {
    //   name: "Dairy",
    //   apiName: "dairy-free",
    //   description: "No dairy; no lactose",
    // },
    // {
    //   name: "Eggs",
    //   apiName: "egg-free",
    //   description: "No eggs or products containing eggs",
    // },
    // {
    //   name: "Fish",
    //   apiName: "fish-free",
    //   description: "No fish or fish derivatives",
    // },
    // {
    //   name: "FODMAP free",
    //   apiName: "fodmap-free",
    //   description: "Does not contain FODMAP foods",
    // },
    // {
    //   name: "Gluten",
    //   apiName: "gluten-free",
    //   description: "No ingredients containing gluten",
    // },
    // {
    //   name: "Keto",
    //   apiName: "keto-friendly",
    //   description: "Maximum 7 grams of net carbs per serving",
    // },
    // {
    //   name: "Kidney friendly",
    //   apiName: "kidney-friendly",
    //   description:
    //     "per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg",
    // },
    // {
    //   name: "Kosher",
    //   apiName: "kosher",
    //   description:
    //     "contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves",
    // },
    // {
    //   name: "Low potassium",
    //   apiName: "low-potassium",
    //   description: "Less than 150mg per serving",
    // },
    // {
    //   name: "Lupine-free",
    //   apiName: "lupine-free",
    //   description: "does not contain lupine or derivatives",
    // },
    // {
    //   name: "Mustard-free",
    //   apiName: "mustard-free",
    //   description: "does not contain mustard or derivatives",
    // },
    // {
    //   name: "n/a",
    //   apiName: "low-fat-abs",
    //   description: "Less than 3g of fat per serving",
    // },
    // {
    //   name: "No oil added",
    //   apiName: "No-oil-added",
    //   description:
    //     "No oil added except to what is contained in the basic ingredients",
    // },
    {
      name: "No-sugar",
      apiName: "low-sugar",
      description:
        "No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose",
    },
    // {
    //   name: "Paleo",
    //   apiName: "paleo",
    //   description:
    //     "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils",
    // },
    {
      name: "Peanuts",
      apiName: "peanut-free",
      description: "No peanuts or products containing peanuts",
    },
    // {
    //   name: "Pescatarian",
    //   apiName: "pecatarian",
    //   description:
    //     "Does not contain meat or meat based products, can contain dairy and fish",
    // },
    // {
    //   name: "Pork-free",
    //   apiName: "pork-free",
    //   description: "does not contain pork or derivatives",
    // },
    // {
    //   name: "Red meat-free",
    //   apiName: "red-meat-free",
    //   description:
    //     "does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.",
    // },
    // {
    //   name: "Sesame-free",
    //   apiName: "sesame-free",
    //   description: "does not contain sesame seed or derivatives",
    // },
    // {
    //   name: "Shellfish",
    //   apiName: "shellfish-free",
    //   description: "No shellfish or shellfish derivatives",
    // },
    // {
    //   name: "Soy",
    //   apiName: "soy-free",
    //   description: "No soy or products containing soy",
    // },
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
    // {
    //   name: "Wheat-free",
    //   apiName: "wheat-free",
    //   description: "No wheat, can have gluten though",
    // },
  ],
};
