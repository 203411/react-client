import axios from "axios";
import profile from './Profile.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('id_user');

    const [imagen, setImagen] = useState('');

    const [username,setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [usernameR,setUsernameR] = useState('');
    const [first_nameR, setFirstNameR] = useState('');
    const [last_nameR, setLastNameR] = useState('');
    const [emailR, setEmailR] = useState('');

    
    const [form, setForm] = useState(false);

    const change_image = () => {
        let postData = new FormData();
        postData.append('id_user', user);
        postData.append('url_img', document.getElementById('img').files[0]);

        axios.post("http://localhost:8000/api/v1/user/profile", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            setImagen("http://localhost:8000" + response.data.url_img);
            get_imagen();
        }).catch((error) => {
            if (error.response.data === "Metodo post no permitido") {
                put_image();
            }
        })
    }

    let put_image = () => {
        let putData = new FormData();
        putData.append('url_img', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/user/perfil/" + user + "/", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            setImagen("http://localhost:8000" + response.data.url_img);
            get_imagen();
        })
    }

    let delete_image = () => {
        axios.delete("http://localhost:8000/api/v1/user/perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            alert("Imagen eliminada");
            setImagen("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
        });
    }

    useEffect(()=>{
        get_imagen();
        get_perfil();
    },[]);

    let get_imagen = () =>{
        axios.get("http://localhost:8000/api/v1/user/perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
                if(response.data.url_img != null){
                    setImagen("http://localhost:8000" + response.data.url_img);
                }else{
                    setImagen("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
                }
            }).catch((error) => {
                setImagen("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
            });
    }

    let get_perfil = () =>{
        axios.get("http://localhost:8000/api/v1/user/data/"+user+"/",{
            headers:{
                'Authorization': 'Token ' + token,
            },
        }).then((response) =>{
            setUsernameR(response.data.username);
            setFirstNameR(response.data.first_name);
            setLastNameR(response.data.last_name);
            setEmailR(response.data.email);
        }).catch((error)=>{
            alert("No se pudieron obtener los datos");
        })
    }

    let change_profile = () =>{
        let putData= {
            username : username !== "" ? username : usernameR,
            last_name : last_name !== "" ? last_name : last_nameR,
            first_name : first_name !== "" ? first_name : first_nameR,
            email : email !== "" ? email : emailR
        }
        axios.put("http://localhost:8000/api/v1/user/data/"+user+"/",putData,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setForm(false);
            get_perfil();
        }).catch((error)=>{
            alert("No se pudieron actualizar los datos");
        })
    }

    return (
        <div className={profile.body}>
            <div className={profile.profileContainer}>
                <div className={profile.options}>
                    <button className={profile.userTitle}>User {user}</button>
                    <button className={profile.backLogin} >Logout</button>
                </div>
                
                <div className={profile.profileImg}>
                    <div className={profile.bordeImg}></div>
                    <img src={imagen} alt="error img" />
                </div>
                <div className={profile.image}>
                    <input className={profile.inputImage} accept="image/*" type="file" id="img"></input>
                    <button onClick={change_image}>Change Image</button>
                    <button onClick={delete_image}>Delete Image</button>
                    
                </div>
                {form ?
                    <div className={profile.container}>
                        <div className={profile.profileForm}>
                            <div className={profile.profileField}>
                                <p><b>First name: </b></p><input onChange={e => setFirstName(e.target.value)}></input>
                            </div>
                            <div className={profile.profileField}>
                                <p><b>Last name: </b></p><input onChange={e => setLastName(e.target.value)}></input>
                            </div>
                            <div className={profile.profileField}>
                                <p><b>Username: </b></p><input onChange={e => setUsername(e.target.value)}></input>
                            </div>
                            <div className={profile.profileField}>
                                <p><b>E-mail: </b></p><input onChange={e => setEmail(e.target.value)}></input>
                            </div>
                        </div>
                        <div className={profile.update} >
                                <button onClick={()=>change_profile()}>
                                    Save
                                </button>
                                <button onClick={()=> setForm(false)}>
                                    Cancel
                                </button>
                            </div>
                    </div>
                :
                    <div className={profile.container}>
                        <div className={profile.profileInfo}>
                            <div className={profile.profileField}>
                                <p><b>First name: </b></p>
                                <p className={profile.profileData}>{first_nameR}</p>
                            </div>
                            <div className={profile.profileField}>
                                <p><b>Last name: </b></p>
                                <p className={profile.profileData}>{last_nameR}</p>
                            </div>
                            <div className={profile.profileField}>
                                <p><b>Username: </b></p>
                                <p className={profile.profileData}>{usernameR}</p>
                            </div>
                            <div className={profile.profileField}>
                                <p><b>Email </b></p>
                                <p className={profile.profileData}>{emailR}</p>
                            </div>
                        </div>
                        <div className={profile.update}>
                            <button onClick={() => setForm(!form)} >Change profile</button>
                        </div>
                    </div>
                }
            </div>
           
        </div>
    )
}

export default Profile;