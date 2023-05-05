import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["access_token"]);

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/")
        window.location.reload();
       
    }


    return (
      <div className="bg-blue-700 flex justify-between items-center py-4 px-6">
  <div className="text-white text-lg font-bold">
    <Link to="/">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </Link>
  </div>
  <div className="text-white flex items-center">
    {!cookies.access_token ? (
      <span className="flex">
        <Link to="/login" className="mr-4 hover:text-gray-400">
          Login
        </Link>
        <Link to="/register" className="hover:text-gray-400">
          Register
        </Link>
      </span>
    ) : (
      <span className="flex items-center">
        <span className="mr-4">Hi {window.localStorage.username}</span>
        <Link to="/create" className="mr-4 hover:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
        <Link to="/favorites" className="mr-4 hover:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Logout
        </button>
      </span>
    )}
  </div>
</div> 
      );
}

export default Navbar