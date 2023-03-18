import React from 'react';
import { useState } from 'react'

function Register({ onRouteChange, loadUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = () => {
        fetch("http://localhost:3001/register", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                name : name
            })
        })
        .then(response =>response.json())
        .then(user => {
            if (user) {
                loadUser(user);
                onRouteChange('home');
            }
        })
    }
    return (
        <div>
            <article className="br3 ba b--black-10 mv5 w-100 w-50-m w-25-l shadow-5 mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Name</label>
                                <input 
                                onChange={onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Email</label>
                                <input onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" >Password</label>
                                <input
                                onChange={onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={onSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        </div>
    );
}

export default Register;
