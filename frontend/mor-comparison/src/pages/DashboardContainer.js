import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button, ThemeProvider, Typography, Drawer, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { FirebaseContext } from "../components/Firebase";
import { toast } from 'react-toastify';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import '../styles/GlobalStylesheet.css'
import ModelComparason from "./DashboardPages/ModelComparison";
import Overview from "./DashboardPages/Overview";
import Guide from "./DashboardPages/Guide";
import TestComponents from "./TestComponents";
import YourModels from "./DashboardPages/YourModels";
import YourSheetMusic from "./DashboardPages/YourSheetMusic";
import Explore from "./DashboardPages/Explore";



class DashboardContainer extends React.Component {

  constructor(props) {
    super(props)
    this.doSignOut = this.doSignOut.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)

  }

  state = {
    drawerOpen: false,

    fetchedUser: false,
    isUserDeveloper: false
  }
  doSignOut(context) {
    context.doSignOut()
    toast.info("Logged Out")
  }

  toggleDrawer() {
    if (this.state.drawerOpen)
      this.setState({ drawerOpen: false })
    else
      this.setState({ drawerOpen: true })
  }

  render() {
    return (
      <FirebaseContext>
        {context => {

          if (!this.state.fetchedUser) {
            context.db.collection('users').where('uid', "==", context.auth.currentUser.uid).limit(1).get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  console.log('here');
                  if (doc.data().developer == true) {
                    toast("Hello Developer ;)")
                    this.setState({ isUserDeveloper: true })
                  }
                });
              })
            this.setState({ fetchedUser: true })
          }

          return (
            <div className="DashboardContainer">

              <Router>

                {/* Basic UI Setup */}
                <AppBar position="static" color="primary" style={{ flexGrow: 1 }}>
                  <Toolbar>
                    <IconButton>
                      <MenuIcon onClick={this.toggleDrawer} />
                    </IconButton>
                    <Link to="/">
                      <Button>Dashboard</Button>
                    </Link>
                    <Link to="/guide">
                      <Button>Guide</Button>
                    </Link>

                    {(this.state.isUserDeveloper == true) ?
                      <div style={{ borderBottom: "2px solid yellow" }}>

                        <Link to="/explore">
                          <Button>Explore</Button>
                        </Link>
                        <Link to="/test-components">
                          <Button>Test Components</Button>
                        </Link>
                      </div> : <div />}

                    <Button color="inherit"
                      onClick={() => this.doSignOut(context)}>SignOut</Button>
                  </Toolbar>
                </AppBar>

                <Drawer
                  className="Drawer"
                  variant="persistent"
                  anchor="left"
                  open={this.state.drawerOpen}
                  style={{ padding: "20px" }}>
                  <IconButton
                    style={{ justifyContent: 'right' }}
                    onClick={this.toggleDrawer}>
                    {<ChevronLeftIcon />}
                  </IconButton>

                  <Divider />

                  <Link to="/">
                    <Button>Overview</Button>
                  </Link>
                  <Link to="/model-comparison">
                    <Button>Model Comparison</Button>
                  </Link>

                  <Divider />

                  <Link to="/your-sheet-music">
                    <Button>Your sheet music</Button>
                  </Link>
                  <Link to="/your-models">
                    <Button>Your models</Button>
                  </Link>

                </Drawer>


                {/* Components start here */}

                <Switch>
                  <Route exact path="/">
                    <Overview />
                  </Route>
                  <Route exact path="/guide">
                    <Guide />
                  </Route>
                  
                  <Route path="/model-comparison">
                    <ModelComparason />
                  </Route>
                  <Route path="/your-sheet-music">
                    <YourSheetMusic />
                  </Route>
                  <Route path="/your-models">
                    <YourModels />
                  </Route>


                  {(this.state.isUserDeveloper == true) ?
                    <div>
                      <Route exact path="/explore">
                        <Explore/>
                      </Route>
                      <Route path="/test-components">
                        <TestComponents />
                      </Route>

                    </div> : <div />}
                </Switch>
              </Router>

            </div>
          )
        }}
      </FirebaseContext>
    )
  }
}

export default DashboardContainer