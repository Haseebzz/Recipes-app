import React, {useEffect,useState} from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const[comment,setNewComment] = useState("");
  const username = window.localStorage.username;
  const userID = window.localStorage.userID;
  console.log(cookies);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {                            
        const response = await axios.get(`${process.env.REACT_APP_URL}recipes`);

        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchfavorites = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}recipes/favorites/ids/${userID}`
        );
        setFavorites(response.data.favorites);
        console.log(response.data.favorites);
      } catch (err) {
        console.log(err);
      }
    };

    fetchfavorites();
    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [recipes, searchQuery]);

  const favoriteRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_URL}recipes` ,{
        recipeID,
        userID,
      }
      );
      const updatedfavorites = [...favorites, recipeID];
      setFavorites(updatedfavorites);
    } catch (err) {
      console.log(err);
    }
  };
  const removeRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}recipes/remove`,
        {
          recipeID,
          userID,
        }
      );
      const updatedFavorites = favorites.filter(
        (favorite) => favorite !== recipeID
      );
      setFavorites(updatedFavorites);
      //window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const isFavorite = (recipeID) => {
    return favorites.includes(recipeID);
  };

  const deleteRecipeFromState = (recipeID) => {
    setRecipes(recipes.filter((recipe) => recipe._id !== recipeID));
  };

  const deleteRecipe = async (recipeID) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}recipes`, {
        data: { recipeID, userID },
      });

      deleteRecipeFromState(recipeID);
    } catch (err) {
      console.log(err);
    }
  };
 
  const addComment = async (e,recipeID) => {
     e.preventDefault();
     try{
      const result = await axios.post(`${process.env.REACT_APP_URL}recipes/comments/${recipeID}`, {
          text: comment,
          user: username
      })
      window.location.reload();
    } catch (error) {
      console.error(error);
  }
  }
  const deleteComment = async (commentId) => {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_URL}recipes/comments/${commentId}`);
      console.log(result.data);
      // Update the recipe with the deleted comment
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-gray-100 px-4 py-8">
    <input
      className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
      type="text"
      placeholder="Search by recipe name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <h1 className="text-2xl font-bold mb-4 text-center">Recipes</h1>
    <ul className='flex flex-col text-center justify-center items-center '>
      {recipes
        .filter((recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((recipe) => (
          <li key={recipe._id} className="mb-8">
            <div className="bg-white shadow rounded-lg px-8 py-6">
              <h2 className="text-xl font-bold mb-4">{recipe.name}</h2>
              <div className="mt-6 text-gray-500 font-serif text-2xl italic">made by {recipe.userOwner}</div>
              {recipe.userOwner === username && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                  onClick={() => deleteRecipe(recipe._id)}
                >
                  Delete
                </button>
              )}
              {isFavorite(recipe._id) ? (
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  onClick={() => removeRecipe(recipe._id)}
                >
                  Remove from Favorites
                </button>
              ) : (
                cookies.access_token && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md my-5"
                    onClick={() => favoriteRecipe(recipe._id)}
                  >
                    Add to Favorites
                  </button>
                )
              )}
                <div className="w-full h-64 overflow-hidden">
  <img className="mx-auto object-cover h-full mt-4" src={recipe.imageUrl} alt={recipe.name} />
</div>
<div className="mt-6">
  <div className="mb-2 px-4">
    <h3 className="text-lg font-bold mb-2">Ingredients</h3>
    <p className="text-gray-700">{recipe.ingredients}</p>
  </div>
  <div className="mb-2 px-4">
    <h3 className="text-lg font-bold mb-2">Instructions</h3>
    <p className="text-gray-700">{recipe.instructions}</p>
  </div>
  <div className="px-4">
    <p className="text-gray-500">Cooking Time: {recipe.cookingTime} minutes</p>
  </div>
</div>
              {recipe.comments && (
                <div className="mt-6">
                  {recipe.comments.map((comment) => (
                    <div key={comment._id} className="mb-4 border p-4">
                    <p className="text-lg">{comment.text}</p>
                    <p className="text-gray-500 mt-2">by {comment.user}</p>
                    {comment.user === username && (
                      <button
                        className="text-red-500 underline mt-2"
                        onClick={() => deleteComment(comment._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  ))}
                </div>
              )}
            </div>
  
            {cookies.access_token && (
              <form className="mt-8" onSubmit={(e) => addComment(e, recipe._id)}>
                <textarea
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                ></textarea>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  type="submit"
                >
                  Add Comment
                </button>
              </form>
            )}
          </li>
        ))}
    </ul>
  </div>
  );
};

export default Home;
