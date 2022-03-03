import { NavLink } from "react-router-dom";
import './Navbar.css'

function Navbar(){
    return(
        <div>
            <ul>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='register'>Register</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;