import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies} from "react-cookie"
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        await axios.post("http://localhost:3001/auth/register", {
            username,
            password,
        })
        alert("Registeration Completed! Now Login");
        navigate("/login")
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
        Username:
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
        Password:
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="**********"
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Register
      </button>
    </div>
  </form>
</div>
    );
  };

export default Register