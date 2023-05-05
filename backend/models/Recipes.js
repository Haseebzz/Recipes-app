import mongoose from "mongoose";


const recipeSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true 
    },
    ingredients: [
        {
            type: String,
            required: true,
        },
    ],
    instructions: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number
    },
    userOwner: {
        type: String,
        required: true,
    },
    comments: [
        {
            text: {
              type: String,
              required: true,
            },
            user: {
              type: String,
              required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
          },
    ],
})

export const RecipeModel = mongoose.model("Recipes", recipeSchema)