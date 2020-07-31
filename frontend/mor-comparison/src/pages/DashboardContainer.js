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

class DashboardContainer extends React.Component{

  render(){
    return(
    <Router>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <IconButton>
                <MenuIcon/>
            </IconButton>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
    </Router>
    )
  }
}

export default DashboardContainer