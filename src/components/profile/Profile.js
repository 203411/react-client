import axios from "axios";

function Profile() {
    let token = localStorage.getItem('token');
    let image_profile = "";
    let user = localStorage.getItem('id_user');

    const upload_image = () =>{

        let postData = new FormData();
        postData.append('id_user',user);
        postData.append('url_img', document.getElementById('img').files[0]);

        axios.post("http://localhost:8000/api/v1/user/profile", postData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization' : 'Token '+ token,
            }
        })
        .then((response) =>{
            console.log(response.data);
            image_profile = "http://localhost:8000"+response.data.url_img;
            console.log(image_profile);
            document.getElementById('preview').src = image_profile;
        }).catch((error)=>{
            console.log(error.response.data);
            if(error.response.data=== "Metodo post no permitido"){
                console.log("Enviar a un metodo put");
                put_image();
            }
        })   
    }

    let put_image = () =>{
        let putData = new FormData();
        putData.append('id_user', user);
        putData.append('url_img', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/user/perfil/"+user+"/",putData, {
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization' : 'Token '+ token,
            },
        }).then((response)=>{
            console.log(response.data);
            image_profile = "http://localhost:8000"+response.data.url_img;
            console.log(image_profile);
            document.getElementById('preview').src = image_profile;
        }).catch((error)=>{
            console.log(error.response.data);
            alert("No se pudo actualizar la imagen");
        })
    }

    let delete_image = () =>{
        axios.delete("http://localhost:8000/api/v1/user/perfil/"+user+"/",{
            headers:{
                'Authorization' : 'Token '+ token,
            }
        }).then((response)=>{
            console.log(response.data);
            alert("Imagen eliminada");
            image_profile = "";
            document.getElementById('preview').src = image_profile;
        })
    }

    window.onload = function visualize_data(){
        let userId = localStorage.getItem('id_user');
        axios.get("http://localhost:8000/api/v1/user/perfil/"+userId+"/",{
            headers:{
                'Authorization' : 'Token '+ token,
            },
        })
        .then((response) =>{
            console.log(response.data);
            image_profile = "http://localhost:8000"+response.data.url_img;
            document.getElementById('preview').src = image_profile;
        }).catch((error)=>{
            console.error("Error al obtener la imagen");
            document.getElementById('preview').src = "";
        })
    }
    
    return (
        <div>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <div class="content">
                            <figure className="image is-48x48">
                                <img className="is-rounded" id="preview" src="" alt="Placeholder image"/>
                            </figure>
                            <input accept="image/png,image/jpeg" type="file" id="img">
                            </input>
                            <button onClick={upload_image}>
                                Subir imagen
                            </button>
                            <button  onClick={delete_image}>
                                Eliminar imagen
                            </button>
                        </div>
                        <div class="content">
                            <p class="title is-4">{localStorage.getItem('first_name')} {localStorage.getItem('last_name')}</p>
                            <p class="subtitle is-6">{localStorage.getItem('username')}</p>
                            <p class="subtitle is-6">{localStorage.getItem('email')}</p>
                        </div>
                    </div>

                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a href="#">#css</a> <a href="#">#responsive</a>
                        <br/>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;