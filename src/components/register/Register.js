import axios from "axios";
import '../../bulma.css';
import './Register.css';

function Register() {

    const register_user = () => {
        let warnings = "";
        var postData = {
            username: document.getElementById('user').value,
            password: document.getElementById('pass').value,
            email: document.getElementById('email').value,
            last_name: document.getElementById('lastName').value,
            first_name: document.getElementById('firstName').value,
            password2: document.getElementById('pass2').value
        }

        axios.post("http://localhost:8000/api/v1/register/user/", postData, {
            Headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            alert("Registro exitoso");
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response.data);
            warnings = error.response.data.email[0];
            document.getElementById("warning").textContent = warnings;
        });
    };

    return (
        <div className="container">
            <div className="card">
                <div>
                    <div>
                        <div className="container">
                            <div className="field">
                                <label className="label">
                                    First-Name:
                                </label>
                                <input className="input is-danger" type="text" id="firstName" placeholder="First Name" required />
                            </div>
                            <div className="field">
                                <label className="label">
                                    Last-Name:
                                </label>
                                <input className="input is-danger" type="text" id="lastName" placeholder="Last Name" required />
                            </div>
                            <div className="field">
                                <label className="label">
                                    Email:
                                </label>
                                <div class="control has-icons-left has-icons-right">
                                    <input className="input is-danger" type="email" id="email" placeholder="Email" required />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Username:
                                </label>
                                <div class="control has-icons-left has-icons-right">
                                    <input className="input is-danger" type="text" id="user" placeholder="Username" required />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="label">
                                <label className="label">
                                    Password:
                                </label>
                                <input className="input is-danger" type="password" id="pass" placeholder="Password" required />
                            </div>
                            <div className="field">
                                <label className="label">
                                    Confirm Password:
                                </label>
                                <input className="input is-danger" type="password" id="pass2" placeholder="Confirm Password" required />
                            </div>
                            <p id="warning">

                            </p>
                            <button className="button is-danger" onClick={register_user}>Register </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;