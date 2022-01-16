const db = require("../../data/db-config");

const getRecipeById = async (recipe_id) => {
  const recipeWithSteps = await db("recipes as r")
    .select("r.*", "s.step_id", "s.step_number", "s.step_instructions")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .where("r.recipe_id", recipe_id)
    .orderBy("s.step_number", "asc");

  //ingredients for the recipe
  const ingredients = await db("ingredients as i")
    .select("i.*", "si.step_id", "si.quantity")
    .join("step_ingredients as si", "i.ingredient_id", "si.ingredient_id")
    .join("steps as s", "si.step_id", "s.step_id")
    .where("recipe_id", recipe_id);

  let stepsArray = recipeWithSteps.map((rec) => {
    return {
      step_id: rec.step_id,
      step_number: rec.step_number,
      step_instructions: rec.step_instructions,
      ingredients: ingredients
        .filter((ing) => ing.step_id === rec.step_id)
        .map((ing) => {
          return {
            ingredient_id: ing.ingredient_id,
            ingredient_name: ing.ingredient_name,
            quantity: ing.quantity,
            unit: ing.ingredient_unit,
          };
        }),
    };
  });
  let recipeToReturn = {
    recipe_id: recipeWithSteps[0].recipe_id,
    recipe_name: recipeWithSteps[0].recipe_name,
    created_at: recipeWithSteps[0].created_at,
    steps: stepsArray,
  };

  return recipeToReturn;
};

module.exports = {
  getRecipeById,
};
