import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp(props) {
    
    const navigate = useNavigate();

    const sendSignUpInfo = async (e) => {


        e.preventDefault();



        const username = e.target.username.value
        const firstname = e.target.firstname.value
        const lastname = e.target.lastname.value 
        const email = e.target.email.value
        const password = e.target.password.value
        const password2 = e.target.password2.value
        

        // Front end validation --> Does not need to check with database (just checking for typing errors, this case if passwords match)
        if (password !== password2) {
            console.log('passwords do not match')
            return
        }

        const res = await fetch('http://localhost:5000/api/signup', {
            method: "POST",
            // NEED To turn body to Dictionary before sending. Use JSON.stringfy()
            body: JSON.stringify({
                username: username,
                firstname: firstname, 
                lastname: lastname, 
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (data.status === 'ok') {
            console.log(data.status)
            props.addMessage(data.message, 'success')
        } else {        
            props.addMessage(data.message, 'danger')
            console.log(data.status)
        }

        navigate('/login');
    }

    return (
        <div>
            <form onSubmit={(e) => { sendSignUpInfo(e) }}>
                <div class="signup-container">
                    <div class="card-signup card">
                        <div class="card-body">
                            <h5 class="signup-title">Create your Padawans Shop Account!</h5>
                            <p class="username-text my-2"><b>Username</b></p>
                            <div class="input-group flex-nowrap">
                                <input placeholder='Username' name='username' className='form-control' type='text' />
                            </div>
                            <p class="firstname-text my-2"><b>Firstname</b></p>
                            <div class="input-group flex-nowrap">
                                <input placeholder='Firstname' name='firstname' className='form-control' type='text' />
                            </div>
                            <p class="lastname-text my-2"><b>Lastname</b></p>
                            <div class="input-group flex-nowrap">
                                <input placeholder='Lastname' name='lastname' className='form-control' type='text' />
                            </div>
                            <p class="email-text my-2"><b>Email Address</b></p>
                            <div class="input-group flex-nowrap">
                                <input placeholder='Email' name='email' className='form-control' type='email' />
                            </div>
                            <div class="password-text">
                                <p class="password my-2"><b>Password</b></p>
                            </div>
                            <div class="input-group flex-nowrap">
                                <input placeholder='Password' name='password' className='form-control' type='password' />
                            </div>
                            <div class="confirm-password-text">
                                <p class="password my-2"><b>Confirm Password</b></p>
                            </div>
                            <input placeholder='Confirm Password' name='password2' className='form-control' type='password' />
                        </div>
                        <div class="sign-up-button">
                            <button type='submit' className='btn btn-primary w-50' >Create Account</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className='alreadyAccountContainer'>
                <div class="alreadyAccount">
                    <h5>Already have an Account?</h5>
                    <Link to="/login">
                    <button type='submit' className='btn btn-primary w-100' >Log In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}