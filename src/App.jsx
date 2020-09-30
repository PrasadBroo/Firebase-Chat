import React, { Component } from "react";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./services/firebase";
import Chat from "./components/chat";
import "./css/navbar.css";

class App extends Component {
  componentDidMount() {
    auth().onAuthStateChanged(user =>{
      if(user){
        this.setState({ user: user });
      }
      else{
        this.setState({user:auth().currentUser});
      }
    })
    
    
  }

  state = {
    user:null,
  };
  render() {
    return (
      <React.Fragment>
        <Navbar signout={this.state.user} signOut={this.handelSignOut} />
        {this.signedIn()}
      </React.Fragment>
    );
  }

  signedIn = () => {
    if (this.state.user) return <Chat />;
    return <Signin signin={this.googlesignin} />;
  };
  googlesignin = async () => {
    try {
      let provider = new auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
      this.setState({ user: auth().currentUser, signout: !this.state.signout });
    } catch (error) {
      return alert(error.code);
    }
  };
  handelSignOut = async () => {
    try {
      auth().currentUser && (await auth().signOut());
    this.setState({ user: auth().currentUser });
    } catch (error) {
      alert(error.code)
    }
    
  };
}

export default App;
