import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {
    const navigate = useNavigate();

    const sendLoginInfo = async (e) => {
        e.preventDefault();

        const username = e.target.username.value
        const password = e.target.password.value

        const res = await fetch('http://localhost:5000/api/login', {
            method: "POST",
            // NEED To turn body to Dictionary before sending. Use JSON.stringfy()
            body: JSON.stringify({
                username: username,
                password: password
            }), 
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (data.status === 'ok') {
            props.addMessage(data.message, 'success')

            // log in user (comes from App prop)

            props.logInUser(data.user)
        } else {
            props.addMessage(data.message, 'danger')         
        }

        navigate('/')
    }

    const sendBasicAuthInfo = async (e) => {
        e.preventDefault();

        const username = e.target.username.value
        const password = e.target.password.value

        const res = await fetch('http://localhost:5000/api/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(username+":"+password)}`
            }
        });
        const data = await res.json();
        if (data.status === 'ok') {
            props.addMessage(data.message, 'success')

            // log in user (comes from App prop)

            props.logInUser(data.user)
        }
        else {
        props.addMessage(data.message, 'danger')}
    }

  return (
    <div>
        <form onSubmit={(e) => {sendLoginInfo(e)}}>
        <div class="login-container">
        <div class="card-signup card">
            <div class="card-body">
                <h5 class="signup-title">Login to your Account!</h5>
                <p class="username-text my-2"><b>Username</b></p>
                <div class="input-group flex-nowrap">
                <input placeholder='Username' name='username' className='form-control' type='text' />
                </div>
                <div class="password-text">
                    <p class="password my-2"><b>Password</b></p>
                </div>
                <div class="input-group flex-nowrap">
                <input placeholder='Password' name='password' className='form-control' type='password' />
                </div>
                <div class="sign-up-button">
                <button type='submit' className='btn btn-primary' >Log In</button>
                </div>
            <div id="middle-bar">
                <div class="left-bar">
                    <hr />
                </div>
                <div class="middle-text">New To Padawans Shop?</div>
                <div class="left-bar">
                    <hr />
                </div>
            </div>
            <div class="create-account">
                <Link to="/signup">
                    <button type="button" class="btn btn-primary w-100">Create an Account</button>
                </Link>
            </div>
        </div>
    </div>
    </div>



        </form>
    </div>
  )
}