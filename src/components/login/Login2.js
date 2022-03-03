import axios from "axios";
import { useState } from "react";
import '../../bulma.css';
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Login2() {

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
            localStorage.setItem('username',response.data['username']);
            localStorage.setItem('first_name', response.data['first_name']);
            localStorage.setItem('last_name', response.data['last_name']);
            localStorage.setItem('email', response.data['email']);
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
        <div className="box">
            <div className="field">
                <div className="field">
                    <label className="label">
                        Username
                    </label>
                    <input className="input is-primary" type="text" id="user-login" placeholder="Username" required />
                </div>
                <div className="field">
                    <label className="label">
                        Password
                    </label>
                    <input className="input is-primary" type="password" id="pass-login" placeholder="Password" required />
                </div>
                <p id="warning" className="">
                </p>
                <div className="">
                    <p>
                        No tienes una cuenta?
                    </p>
                    <NavLink to="/register" className="" >Registrate</NavLink>
                </div>
                <div>
                <button className="button is-primary" onClick={consumir_login}>Login </button>
                {(localStorage.getItem('token')!==null || logeo === true)&& <Navigate to={'/profile/'+localStorage.getItem('id_user')}/>}
                </div>
            </div>
        </div>
    )
}

export default Login2;