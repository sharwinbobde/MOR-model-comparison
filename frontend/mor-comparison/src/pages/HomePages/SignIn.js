import React from "react";
import { Router } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import CardComponent from "../../components/CardComponent";
import { FirebaseContext } from '../../components/Firebase';
import '../../styles/GlobalStylesheet.css'

import { toast } from 'react-toastify';

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      pass: ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this)
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handlePassChange(event) {
    this.setState({ pass: event.target.value })
  }

  render() {

    return (
      <FirebaseContext.Consumer>
        {(context) => {
          var handleSubmit = (event) => {
            const { email, pass } = this.state
            try {
              context.doSignInWithEmailAndPassword(email, pass)
            } catch (error) {
            }

            event.preventDefault();
          }

          handleSubmit = handleSubmit.bind(this)

          return (
            <CardComponent>
              <h1>SignIn</h1>
              <h5>Contact Sharwin Bobde at <a href="mailto:S.P.Bobde@student.tudelft.nl">S.P.Bobde@student.tudelft.nl</a> for access.</h5>
              <form onSubmit={handleSubmit}>
                <TextField
                  m={"10px"}
                  id="email"
                  value={this.state.email}
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={this.handleEmailChange} /><br />
                <TextField
                className="TextField"
                  id="pass"
                  value={this.state.pass}
                  type="password"
                  label="Password"
                  variant="outlined"
                  onChange={this.handlePassChange} /><br />
                <Button color="secondary" type="submit">Submit</Button>
              </form>
            </CardComponent>
          );
        }}

      </FirebaseContext.Consumer>
    );
  }
}

export default SignIn