import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/User.js";

const router = express.Router();

//fetching all recipes from database
router.get("/", async (req,res) => {
    try{
        const result = await RecipeModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

//creating a new recipe
router.post("/", async (req,res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})


//getting a recipe by its id
router.get('/:recipeId', async (req,res) => {
    try{
        const result = await RecipeModel.findById(req.params.recipeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

//favoriting a recipe

router.put("/",  async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try{
        user.favorites.push(recipe);
        await user.save();
        res.status(201).json({favorites: user.favorites});
    } catch(err) {
        res.status(500).json(err);
    }
});
//user deleting their own recipe
// deleting a recipe
router.delete("/", async (req, res) => {
    try {
      const recipe = await RecipeModel.deleteOne({ _id: req.body.recipeID });
      
      res.status(200).json({ message: "Recipe deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
//deleting a recipe
router.put("/remove",  async (req,res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    
    try {
        user.favorites = user.favorites.filter(fav => !fav.equals(recipe._id));
        await user.save();
        res.status(200).json({favorites: user.favorites});
    } catch(err) {
        res.status(500).json(err);
    }
});

//getting id of favorited recipes
router.get("/favorites/ids/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      res.status(201).json({ favorites: user?.favorites });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get("/favorites/:userId", async (req,res) => {
    try{
        const user = await UserModel.findById(req.params.userId);
        const favorites = await RecipeModel.find({
            _id: { $in: user.favorites },
          });
      
         // console.log(favorites);
          res.status(201).json({ favorites });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    
})



//comment routes

// Add a new comment to a recipe
router.post("/comments/:recipeId",  async (req, res) => {
    try {
      const { text, user } = req.body;
      const { recipeId } = req.params;
  
      const recipe = await RecipeModel.findById(recipeId);
  
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      const newComment = { text, user };
      
      recipe.comments = recipe.comments.concat(newComment)
    await RecipeModel.findByIdAndUpdate(recipe._id, recipe, {new: true})
  
      return res.status(201).json({ message: "Comment added", recipe });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  });
//getting comments from recipe
router.get("/comments/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params;
      const recipe = await RecipeModel.findById(recipeId);
      res.status(201).json({ comments: recipe?.comments });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //deleting a comment
  router.delete("/comments/:commentId", async (req, res) => {
    try {
      const { commentId } = req.params;
      const recipe = await RecipeModel.findOneAndUpdate(
        { "comments._id": commentId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
  
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      return res.status(200).json({ message: "Comment deleted", recipe });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  });
router.put("/remove",  async (req,res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    
    try {
        user.favorites = user.favorites.filter(fav => !fav.equals(recipe._id));
        await user.save();
        res.status(200).json({favorites: user.favorites});
    } catch(err) {
        res.status(500).json(err);
    }
});
export {router as recipeRouter};