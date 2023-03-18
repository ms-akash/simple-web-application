import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkFrom from './components/ImageLinkFrom';
import Rank from './components/Rank';
import Signin from './components/Signin';
import Register from './components/Register';

import { useState, useEffect } from 'react';

import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles"; 


function App() {

  const [searchField, setSearchField] = useState('');
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({id : '', name :'', email: '', entries : 0, joined : ''})

  const loadUser = (data)=>{
    setUser({
      id : data.id,
      name : data.name,
      email : data.email,
      entries : data.entries,
      joined : data.joined
    })
  }

  const onRouteChange = (route)=>{
    if(route === 'signin'){
      setIsSignedIn(false);
    }else if(route === 'home'){
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  const onSearchChange = (event)=>{
    console.log(event.target.value);
    setSearchField(event.target.value);

  }

  const onButtonClick = (event)=>{
    console.log("clicked");

  }

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);


  return (
    <div className="App">
      <Particles className="particle"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{

          fpsLimit: 120,
          particles: {
            number : {
              value : 30,
              line_linked :{
                enabled : true,
                value_area : 800
              }
            }  
          },
          detectRetina: true,
        }}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { route === 'home'
        ? <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkFrom
            onSearchChange={onSearchChange}
            onButtonClick={onButtonClick}
          />
        </div>
      :
      (
        route === 'signin'
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser}/>
          : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
      )
      }

    </div>
  );
}

export default App;
