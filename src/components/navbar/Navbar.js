import { NavLink } from "react-router-dom";
import './Navbar.css'

function Navbar(){
    return(
        <div className="content">
            <ul className="navbar">
                <li className="navbar-item">
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='/'><h2>Home </h2></NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='/login'><h2>Login </h2></NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='register'><h2>Register </h2></NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;