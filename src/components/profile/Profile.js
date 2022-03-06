import axios from "axios";
import { useState } from "react";
import './Profile.css';
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('id_user');
    let image_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const [logueo, setLogueo] = useState(true);

    const change_image = () => {
        let postData = new FormData();
        postData.append('id_user', user);
        postData.append('url_img', document.getElementById('img').files[0]);

        axios.post("http://localhost:8000/api/v1/user/profile", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        })
            .then((response) => {
                console.log(response.data);
                image_profile = "http://localhost:8000" + response.data.url_img;
                console.log(image_profile);
                document.getElementById('preview').src = image_profile;
                window.location.reload();
            }).catch((error) => {
                console.log(error.response.data);
                if (error.response.data === "Metodo post no permitido") {
                    console.log("Enviar a un metodo put");
                    put_image();
                }
            })
    }

    let put_image = () => {
        let putData = new FormData();
        putData.append('id_user', user);
        putData.append('url_img', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/user/perfil/" + user + "/", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000" + response.data.url_img;
            document.getElementById('preview').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
            alert("No se pudo actualizar la imagen");
        })
    }

    let delete_image = () => {
        axios.delete("http://localhost:8000/api/v1/user/perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            console.log(response.data);
            alert("Imagen eliminada");
            image_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            document.getElementById('preview').url = image_profile;
            window.location.reload();
        });
    }

    window.onload = function visualize_data() {
        let userId = localStorage.getItem('id_user');
        axios.get("http://localhost:8000/api/v1/user/perfil/" + userId + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            },
        })
            .then((response) => {
                console.log(response.data);
                image_profile = "http://localhost:8000" + response.data.url_img;
                document.getElementById('preview').src = image_profile;
                document.getElementById("firstName").placeholder =response.data.first_name;
                document.getElementById("lastName").placeholder = response.data.last_name;
                document.getElementById("email").placeholder = response.data.email;
                document.getElementById("username").placeholder = response.data.username;
            }).catch((error) => {
                console.error("Error al obtener la imagen");
                document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            })
    }

    let change_profile = () =>{

    }

    const navigate = useNavigate();
    let cerrar_sesion = () => {
        localStorage.clear();
        setLogueo(false);
        navigate("/");
    }

    return (
        <div className="body">
            <div className="profileContainer">
                <div className="options">
                    <button id="userTitle">User {user}</button>
                    <button className="backLogin" onClick={cerrar_sesion}>Logout</button>
                </div>
                
                <div className="profileImg">
                    <div className="bordeImg"></div>
                    <img alt="error img" id="preview" />
                </div>
                <div className="image">
                    <input accept="image/*" type="file" id="img"></input>
                    <button onClick={change_image}>Change Image</button>
                    <button onClick={delete_image}>Delete Image</button>
                </div>
                <div className="profileInfo">
                    <div className="profileField">
                        <p><b>First name: </b></p><input id="firstName"></input>
                    </div>
                    <div className="profileField">
                        <p><b>Last name: </b></p><input id="lastName"></input>
                    </div>
                    <div className="profileField">
                        <p><b>Username: </b></p><input id="username"></input>
                    </div>
                    <div className="profileField">
                        <p><b>E-mail: </b></p><input id="email"></input>
                    </div>
                </div>
                <div className="update" onClick={change_profile}>
                    <button>
                        Change Profile
                    </button>
                </div>
                
                
            </div>
           
        </div>
    )
}

export default Profile;