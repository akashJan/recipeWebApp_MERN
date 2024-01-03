import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import { Usermodel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await RecipeModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err)
    }
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const result = await recipe.save();
        res.json(result);
    } catch (err) {
        res.json(err)
    }
});

// Save a Recipe
router.put("/", verifyToken, async (req, res) => {

    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await Usermodel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err)
    }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await Usermodel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.json(err)
    }
})

// Get saved recipes
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await Usermodel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (err) {
        res.json(err)
    }
})


export { router as recipesRouter };