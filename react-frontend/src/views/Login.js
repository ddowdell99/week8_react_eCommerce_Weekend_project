import React from 'react'

export default function Login( {addMessageToHeader, logInUser} ) {

    const sendLoginInfo = async (e) => {
        e.preventDefault();

        const username = e.target.username.value
        const password = e.target.password.value

        const res = await fetch ('http://localhost:5000/api/login', {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type" : "application/json",
            }
        });

        const data = await res.json();
        if (data.status === 'ok') {
            addMessageToHeader(data.message, 'success')
            logInUser(data.customer)
        }
console.log(data.status, data.message)
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={(e) => { sendLoginInfo(e) }}>
                <input placeholder='Username' name='username' className='form-control' type='text' />
                <input placeholder='Password' name='password' className='form-control' type='password' />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}
