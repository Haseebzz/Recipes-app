
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Create from './pages/Create';
import Favorites from './pages/Favorites';
function App() {
  return (
    <div className="App">
       <Router>
          <Navbar />
          <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/register' element={<Register />} />
             <Route path='/login' element={<Login />} />
             <Route path='/create' element={<Create/>} />
             <Route path='/favorites' element={<Favorites />} />
          </Routes>
       </Router>
    </div>
  );
}

export default App;
