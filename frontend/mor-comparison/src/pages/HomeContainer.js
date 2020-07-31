import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import About from "./HomePages/About";
import Home from "./HomePages/Home";

import {AppBar, Toolbar, IconButton, Button, ThemeProvider} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import * as constants from "../theme.js";
import Login from "./HomePages/Login";

import {toast} from 'react-toastify'

import {FirebaseContext} from '../components/Firebase';

class HomeContainer extends React.Component{


  render(){

    return(
      <FirebaseContext.Consumer>
      {(context)=>{
          return(
            <Router>
              <AppBar position="sticky" color="primary">
                <Toolbar>
                  <Link to="/">
                    <Button>Home</Button>
                  </Link>
                  <Link to="/about">
                    <Button>About</Button>
                  </Link>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </Toolbar>
              </AppBar>

              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/about">
                  <About/>
                </Route>
                <Route path="/login">
                  <Login/>
                </Route>
              </Switch>
          </Router>
          )
        }}
      </FirebaseContext.Consumer>
    
    )
  }
}

export default HomeContainer