import axios from "axios";
import React, { Component } from "react";

class Post extends Component {
    state = {
        user: "",
        pass: ""
    };
    userChange = e => {
        this.setState(
            {
                user: e.target.value
            }
        );
    };
    passChange = e => {
        this.setState(
            {
                pass: e.target.value
            }
        );
    };
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.state.user,
            password: this.state.pass,
        };
        axios
            .post("http://localhost:8000/api/v1/login/", data)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    };
    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                        </label>
                        <input type="text" value={this.state.user} onChange={this.userChange} required />
                        <label>
                            Password:
                        </label>
                        <input type="text" value={this.state.pass} onChange={this.passChange} required />
                        <button type="submit">Login </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Post;