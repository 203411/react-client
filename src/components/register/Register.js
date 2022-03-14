import axios from "axios";
import register from './Register.module.css';
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [first_name,setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [warnings,setWarnings] = useState('');

    let navigate = useNavigate();
    
    const register_user = () => {
        var postData = {
            username: username,
            password: password,
            email: email,
            last_name: last_name,
            first_name: first_name,
            password2: password2
        }

        axios.post("http://localhost:8000/api/v1/register/user/", postData, {
            Headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            navigate('/login');
        }).catch((error) => {
            console.log(error.response.data);
            setWarnings("Error al registrar");
        });
       
        
    };

    return (
        <div className={register.body}>
            <div className={register.container}>
                <div className={register.formContainer}>
                    <h1>Register</h1>
                    <div className={register.formRegister}>
                        <div className={register.group}>
                            <input type="text" onChange={e => setFirstName(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Name</label>
                        </div>
                        <div className={register.group}>
                            <input type="text" onChange={e => setLastName(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Last name</label>
                        </div>
                        <div className={register.group}>
                            <input type="password" onChange={e => setPassword(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Password</label>
                        </div>
                        <div className={register.group}>
                            <input type="password" onChange={e => setPassword2(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label id="lbl-pass2">Confirm password</label>
                        </div>
                        <div className={register.group}>
                            <input type="text" onChange={e => setUsername(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Username</label>
                        </div>
                        <div className={register.group}>
                            <input type="email" onChange={e => setEmail(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Email</label>
                        </div>
                        
                        <button type="submit" onClick={()=> register_user()}> Register </button>
                        
                    </div>
                    <p id="message">{warnings}</p>
                    <div className={register.group}>
                        <p>
                            Ya tienes una cuenta?
                        <NavLink to="/login" > Inicia Sesion</NavLink>
                        </p>
                    </div>
                    
                </div>
                <div className={register.imgForm}>
                    
                </div>
            </div>
        </div>
    )
}

export default Register;