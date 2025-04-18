import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
};


const Login = () => {

    // eslint-disable-next-line no-unused-vars
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post("http://localhost:3001/auth/login", { username, password });
            setCookies("access_token", result.data.token);
            window.localStorage.setItem("userID", result.data.userID);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit} />
}

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", { username, password });
            alert("Registration Completed! Now Login.");
        } catch (err) {
            console.error(err);
        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit} />
}

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h1>{label}</h1>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    <button type='submit'>{label}</button>
                </div>
            </form>
        </div >

    )
}

