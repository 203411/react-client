import { NavLink } from "react-router-dom";
import nav from './Navbar.module.css'

function Navbar(){
    return(
        <div className={nav.content}>
            <ul className={nav.navbar}>
                <li className={nav.navbarItem}>
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='/'><h2>Home </h2></NavLink>
                </li>
                <li className={nav.navbarItem}>
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='/login'><h2>Login </h2></NavLink>
                </li>
                <li className={nav.navbarItem}>
                    <NavLink className={({isActive}) => isActive ? 'active' : '' } to='register'><h2>Register </h2></NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;