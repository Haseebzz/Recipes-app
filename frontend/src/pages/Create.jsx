import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"
const Create = () => {
 
  const[cookies, _] = useCookies(['access_token']);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: window.localStorage.username,
  })
  console.log(window.localStorage.username)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}recipes`,
        { ...recipe },
  
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="create-recipe p-6 bg-gray-100 rounded-lg">
  <h2 className="text-xl font-semibold mb-4 text-center">Create Recipe</h2>
  <form onSubmit={handleSubmit}>
    <label htmlFor="name" className="block font-medium mb-2">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={recipe.name}
      onChange={handleChange}
      className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
    />
    <label htmlFor="description" className="block font-medium mb-2">Description</label>
    <textarea
      id="description"
      name="description"
      value={recipe.description}
      onChange={handleChange}
      className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
    ></textarea>
    <label htmlFor="ingredients" className="block font-medium mb-2">Ingredients</label>
    {recipe.ingredients.map((ingredient, index) => (
      <input
        key={index}
        type="text"
        name="ingredients"
        value={ingredient}
        onChange={(event) => handleIngredientChange(event, index)}
        className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
      />
    ))}
    <button type="button" onClick={handleAddIngredient} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4">
      Add Ingredient
    </button>
    <label htmlFor="instructions" className="block font-medium mb-2">Instructions</label>
    <textarea
      id="instructions"
      name="instructions"
      value={recipe.instructions}
      onChange={handleChange}
      className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
    ></textarea>
    <label htmlFor="imageUrl" className="block font-medium mb-2">Image URL</label>
    <input
      type="text"
      id="imageUrl"
      name="imageUrl"
      value={recipe.imageUrl}
      onChange={handleChange}
      className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
    />
    <label htmlFor="cookingTime" className="block font-medium mb-2">Cooking Time (minutes)</label>
    <input
      type="number"
      id="cookingTime"
      name="cookingTime"
      value={recipe.cookingTime}
      onChange={handleChange}
      className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
    />
    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
      Create Recipe
    </button>
  </form>
</div>
  )
}

export default Create