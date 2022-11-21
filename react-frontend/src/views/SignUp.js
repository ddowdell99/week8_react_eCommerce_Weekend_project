import React from 'react'

export default function SignUp( {addMessageToHeader} ) {

    const sendSignUpInfo = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const password2 = e.target.password2.value

        if (password !== password2) {
            console.log('passwords dont match') //Turn this into a popup message for user
            return
        }

        const res = await fetch ('http://localhost:5000/api/signup', {
            method: "POST",
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password
            }),
            headers: {
                "Content-Type" : "application/json"
            }
        });

        const data = await res.json();
        if (data.status === 'ok') {
            addMessageToHeader(data.message, 'success')
        }
        console.log(data.status, data.message)
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => { sendSignUpInfo(e) }}>
                <input placeholder='First Name' name='firstName' className='form-control' type='text' />
                <input placeholder='Last Name' name='lastName' className='form-control' type='text' />
                <input placeholder='Username' name='username' className='form-control' type='text' />
                <input placeholder='Email' name='email' className='form-control' type='email' />
                <input placeholder='Password' name='password' className='form-control' type='password' />
                <input placeholder='Confirm Password' name='password2' className='form-control' type='password' />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}
