import axios from "axios";
import register from './Register.module.css';
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

    let navigate = useNavigate();

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [first_name,setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [validationPass, setValidationPass] = useState('');
    const [validationPass2, setValidationPass2] = useState('');
    const [validationEmail, setValidationEmail] = useState('');
    const [warnings,setWarnings] = useState('');
    
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
            navigate('/login',{replace:true})
        }).catch((error) => {
            console.log(error.response.data);
            setWarnings("Error al registrar");
        });     
    }

    const check_email = (e) =>{
        let expresionRegular = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(expresionRegular.test(email) === false && email !== ""){
            setValidationEmail("Correo inválido");
        }else{
            setValidationEmail('');
        }
    }


    const check_password = (e) =>{
        let expresionRegular = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/; 
        if(expresionRegular.test(password) === false && password !== ""){
            setValidationPass("Incluye una mayuscula y un numero");
            console.log(validationPass);
        }else{
            setValidationPass("");
        }
    }


    const check_password2 = () =>{
        if(password !== password2){
            setValidationPass2("no match");
        }else{
            setValidationPass2("match");
        }
    }



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
                            <input onBlur={()=> check_password()} onKeyUp={()=> check_password()} type="password" onChange={e => setPassword(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Password</label>
                            <p className={register.warning}>{validationPass}</p>
                        </div>
                        <div className={register.group}>
                            <input onBlur={()=> check_password2()} onKeyUp={()=> check_password2()} type="password" onChange={e => setPassword2(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label id="lbl-pass2">Confirm password</label>
                            <p className={register.warning}>{validationPass2}</p>
                        </div>
                        <div className={register.group}>
                            <input type="text" onChange={e => setUsername(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Username</label>
                        </div>
                        <div className={register.group}>
                            <input onBlur={() => check_email()} onKeyUp={()=> check_email()} type="email" onChange={e => setEmail(e.target.value)} required /> <span className={register.borderBottom}></span>
                            <label>Email</label>
                            <p className={register.warning}>{validationEmail}</p>
                        </div>
                        
                        <button type="submit" onClick={()=> register_user()}> Register </button>
                        
                    </div>
                    <p className={register.warning}>{warnings}</p>
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