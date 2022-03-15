import axios from "axios";
import login from './Login.module.css';
import { NavLink , useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

    let navigate =useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const consumir_login = () => {
        let warnings = "";
        var postData = {
            username: username,
            password: password
        }
        axios.post("http://localhost:8000/api/v1/login/", postData, {
            Headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('id_user', response.data['user_id']);
            navigate('/profile',{replace:true});
        }).catch((error) => {
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
           
        });
    }

    return (
        <div className={login.body}>
            <div className={login.container}>
                
                <div className={login.formContainer}>
                    <div className={login.form}>
                        <h1>Login</h1>
                        <div className={login.group}>
                            <input type="text" onChange={e => setUsername(e.target.value)}  required /> <span className={login.borderBottom}></span>
                            <label>Username</label>
                        </div>
                        <div className={login.group}>
                            <input type="password" onChange={e =>setPassword(e.target.value)} required /> <span className={login.borderBottom}></span>
                            <label>Password</label>
                        </div>
                        <p id="warning"></p>
                        <p>
                            No tienes una cuenta?
                            <NavLink to="/register" >  Registrate</NavLink>
                        </p>
                        <button type="submit" onClick={() => consumir_login()}> Send </button>
                       
                    </div>
                </div>
                <div className={login.imgForm}>
                </div>
            </div>
        </div>
    )
}

export default Login;