const db = require("../../data/db-config");

const getRecipeById = async (recipe_id) => {
  const recipe = await db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as si", "s.step_id", "si.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .select(
      "r.recipe_id",
      "r.recipe_name",
      "s.step_id",
      "s.step_number",
      "s.step_instructions",
      "si.ingredient_id",
      "i.ingredient_name",
      "si.quantity",
      "i.ingredient_unit"
    )
    .where("r.recipe_id", recipe_id)
    .orderBy("s.step_number", "asc");

  console.log(recipe);
};

module.exports = {
  getRecipeById,
};
