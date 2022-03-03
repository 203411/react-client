import './App.css';
import Login2 from './components/login/Login2';
import Register from './components/register/Register';
import Home from './pages/Home';
import Profile from './components/profile/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}>
          </Route>

          <Route path="/register" element={<Register/>}>
          </Route>

          <Route path='/login' element={<Login2/>}>
          </Route>

          <Route path='/profile/:id' element={<Profile/>}>
          </Route>

          <Route path='*' element={<div><h1>Not Found Page</h1></div>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
