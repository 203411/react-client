import axios from "axios";

import './Login.css';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Login() {

    const [logeo, setLogeo] = useState(false);

    const consumir_login = () => {
        let warnings = "";
        var postData = {
            username: document.getElementById('user-login').value,
            password: document.getElementById('pass-login').value
        }
        axios.post("http://localhost:8000/api/v1/login/", postData, {
            Headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data.token);
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('id_user', response.data['user_id']);
            setLogeo(true);
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.data.non_field_errors != null) {
                warnings = error.response.data.non_field_errors[0];
            } else {
                if (error.response.data.username != null && error.response.data.password == null) {
                    warnings = "Username is empty";
                } else if (error.response.data.username == null && error.response.data.password != null) {
                    warnings = "Password is empty";
                } else {
                    warnings = "Username and password are empty";
                }
            }
            document.getElementById("warning").textContent = warnings;
            setLogeo(false);
        });
    };
    return (
        <div className="body">
            <div className="container">
                
                <div className="formContainer">
                    <div className="form">
                        <h1>Login</h1>
                        <div className="group">
                            <input type="text" id="user-login" required /> <span className="border_bottom"></span>
                            <label>Username</label>
                        </div>
                        <div className="group">
                            <input type="password" id="pass-login" required /> <span className="border_bottom"></span>
                            <label>Password</label>
                        </div>
                        <p id="warning"></p>
                        <p>
                            No tienes una cuenta?
                            <NavLink to="/register" >  Registrate</NavLink>
                        </p>
                        <button type="submit" onClick={consumir_login}> Send </button>
                        {(localStorage.getItem('token')!==null || logeo === true)&& <Navigate to={'/profile/'+localStorage.getItem('id_user')}/>}
                    </div>
                </div>
                <div className="imgForm">
                </div>
            </div>
        </div>
    )
}

export default Login;