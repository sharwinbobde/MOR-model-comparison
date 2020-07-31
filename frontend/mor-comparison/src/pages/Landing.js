import React from "react";
import {FirebaseContext} from '../components/Firebase';
import HomeContainer from "./HomeContainer";
import DashboardContainer from "./DashboardContainer";

class Landing extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isSignedIn: false
    }
    this.signinListener = this.signinListener.bind(this)
  }


  signinListener = (user)=>{
    if(user){
      if(!this.state.isSignedIn)
        this.setState({isSignedIn: true})
    }else{
      if(this.state.isSignedIn)
        this.setState({isSignedIn: false})
    }
  }

  render(){
    return(
      <FirebaseContext.Consumer>
        {(context)=>{
          context.auth.onAuthStateChanged( user => this.signinListener(user))

          if(this.state.isSignedIn){
            return(
              <DashboardContainer/>
            )
          } else {
            return(
              <HomeContainer/>
            )
          }
          }}
      </FirebaseContext.Consumer>
    )
  }
}

export default Landing