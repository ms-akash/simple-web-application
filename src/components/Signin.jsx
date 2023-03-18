import React from 'react';
import {useState} from 'react'

function Signin({onRouteChange, loadUser}) {

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const onEmailChange = (event)=>{
        setInputEmail(event.target.value);
    }

    const onPasswordChange = (event)=>{
        setInputPassword(event.target.value);
    }

    const onSubmit = ()=>{
        fetch("http://localhost:3001/signin", {
            method: "post",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email : inputEmail,
                password : inputPassword
            })
        })
        .then(response => response.json())
        .then(user=>{
            if(user.id){
                loadUser(user);
                onRouteChange('home')
            }
        })
    }


  return (
    <div>
          <article className="br3 ba b--black-10 mv5 w-100 w-50-m w-25-l shadow-5 mw6 center">
          <main className="pa4 black-80">
              <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                      <div className="mt3">
                          <label className="db fw6 lh-copy f6" >Email</label>
                          <input 
                          onChange={onEmailChange}
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                          type="email" name="email-address" id="email-address" />
                      </div>
                      <div className="mv3">
                          <label className="db fw6 lh-copy f6">Password</label>
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
                      value="Sign in" />
                  </div>
                  <div className="lh-copy mt3">
                      <p
                        onClick={() => onRouteChange('register')}  
                      className="f6 link dim black db pointer">Register</p>
                  </div>
              </div>
          </main>
          </article>
    </div>
  );
}

export default Signin;
