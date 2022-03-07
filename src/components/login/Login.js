import axios from "axios";

import login from './Login.module.css';
import { NavLink , useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
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
            navigate("/profile");
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
        <div className={login.body}>
            <div className={login.container}>
                
                <div className={login.formContainer}>
                    <div className={login.form}>
                        <h1>Login</h1>
                        <div className={login.group}>
                            <input type="text" id="user-login" required /> <span className={login.borderBottom}></span>
                            <label>Username</label>
                        </div>
                        <div className={login.group}>
                            <input type="password" id="pass-login" required /> <span className={login.borderBottom}></span>
                            <label>Password</label>
                        </div>
                        <p id="warning"></p>
                        <p>
                            No tienes una cuenta?
                            <NavLink to="/register" >  Registrate</NavLink>
                        </p>
                        <button type="submit" onClick={consumir_login}> Send </button>
                        {/* {(localStorage.getItem('token')!==null || logeo === true)&& <Navigate to={'/profile/'+localStorage.getItem('id_user')}/>} */}
                    </div>
                </div>
                <div className={login.imgForm}>
                </div>
            </div>
        </div>
    )
}

export default Login;