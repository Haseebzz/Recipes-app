import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
const Favorites = () => {
  const [favorites, setFavorite] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userID = window.localStorage.userID;
  const [cookies, setCookies] = useCookies(["access_token"]);
  const[comment,setNewComment] = useState("");
  const username = window.localStorage.username;

  useEffect(() => {
    const fetchfavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/favorites/${userID}`);
        setFavorite(response.data.favorites);
        console.log(response.data.favorites);
      } catch (err) {
        console.log(err);
      }
    };

    fetchfavorites();
  }, []);

  const removeRecipe = async (recipeID) => {
    try {
      const response = await axios.put('http://localhost:3001/recipes/remove', {
        recipeID,
        userID,
      });
      setFavorite(response.data.favorites);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFavorites = favorites.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const addComment = async (e,recipeID) => {
    e.preventDefault();
    try{
     const result = await axios.post(`http://localhost:3001/recipes/comments/${recipeID}`, {
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
    const result = await axios.delete(`http://localhost:3001/recipes/comments/${commentId}`);
    console.log(result.data);
    // Update the recipe with the deleted comment
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className="bg-gray-100 px-4 py-8">
      <input className='border border-gray-300 rounded-md px-4 py-2 mb-4 w-full' type='text' placeholder='Search by recipe name' onChange={handleSearch} />
      <h1  className='text-2xl font-bold mb-4 text-center'>favorites</h1>
      <ul  className='flex flex-col text-center justify-center items-center' >
        {filteredFavorites.map((recipe) => (
          <li key={recipe._id}>
            <div className='bg-white shadow rounded-lg px-8 py-6"'>
              <h2 className='text-xl font-bold mb-4'>{recipe.name}</h2>
              <div className="mt-6 text-gray-500 font-serif text-2xl">made by {recipe.userOwner}</div>
              <button className='bg-yellow-500 text-white px-4 py-2 rounded-md' onClick={() => removeRecipe(recipe._id)}>Remove favorite</button>
            
              <div className="w-full h-64 overflow-hidden">
  <img className="mx-auto object-cover h-full mt-5" src={recipe.imageUrl} alt={recipe.name} />
</div>
            
              <div className='mt-6'>
                <p className='text-lg mb-2'>{recipe.instructions}</p>
                <p className='text-gray-500'>Cooking Time: {recipe.cookingTime} minutes</p>
              </div>
              {recipe.comments && recipe.comments.map(comment => (
            <div key={comment._id} className='mt-6 mb-4 border p-4'>
              <p className='text-lg'>{comment.text}</p>
              <p className='text-gray-500 mt-2'>by {comment.user}</p>
              {comment.user === username && (
      <button className='text-red-500 underline mt-2' onClick={() => deleteComment(comment._id)}>Delete</button>
    )}
            </div>
          ))}
               
              </div>

              {cookies.access_token && (
    <form className='comment-form' onSubmit={(e) => addComment(e, recipe._id)}>
      <textarea
        className='border border-gray-300 rounded-md px-4 py-2 w-full'
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      ></textarea>
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4' type="submit">Add Comment</button>
    </form>
  )}
             
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
