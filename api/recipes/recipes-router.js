const router = require("express").Router();
const Recipes = require("./recipes-model");

router.get("/:recipe_id", (req, res, next) => {
  Recipes.getRecipeById(req.params.recipe_id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch(next);
});

module.exports = router;
