import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';
import Organization from './Organization';
import { RegistrationPage } from './Registration/registration-view';
import { LoginPage } from './Login/Login-view';
import { Navigation } from '../Components/Navbar/navbar';
import { ProfilePage } from './Profile/profile-view';
import { MyPinsPage } from './MyPins/mypins-view';
import { Footer } from '../Components/Footer/footer'
import { WelcomePage } from './Welcome/welcome-view';
import Admin from './Admin/admin-view';
import './app.scss'

export default props =>

<BrowserRouter>
  <div className="app">
    <div className="app-main">
    <Route path="/seulrene" component={Admin}/>
    <Route exact path="/" component={Home}/>

    </div>
    <Footer/>
  </div>
</BrowserRouter>
