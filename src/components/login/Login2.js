import axios from "axios";
import '../../bulma.css';

function Login2() {

    const consumir_login = () => {
        let warnings = "";
        var postData = {
            username : document.getElementById('user-login').value,
            password : document.getElementById('pass-login').value
        }
        axios.post("http://localhost:8000/api/v1/login/",postData,{
            Headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            // alert("Bienvenido " + response.data.email);
            alert("Bienvenido USUARIO: "+ response.data.user_id+" Nombre " +response.data.first_name +" "+response.data.last_name)
            console.log(response.data.token);
            console.log(response.data.user_id);
            localStorage.setItem('token', response.data.token)
        }).catch((error) => {
            console.log(error.response.data);
            if(error.response.data.non_field_errors != null){
                warnings = error.response.data.non_field_errors[0];
            }else{
                if(error.response.data.username != null && error.response.data.password == null){
                    warnings = "Username is empty"; 
                }else if(error.response.data.username == null && error.response.data.password != null){
                    warnings = "Password is empty";
                }else{
                    warnings = "Username and password are empty";
                }
            }
            document.getElementById("warning").textContent = warnings;
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
                <p id="warning">

                </p>
                <button className="button is-primary" onClick={consumir_login}>Login </button>

            </div>
        </div>
    )
}

export default Login2;