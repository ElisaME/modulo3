import React, { Component, createContext } from 'react';
import AUTH_SERVICE from '../services/auth';

export const MyContext = createContext();

class MyProvider extends Component {
  state = {
    loggedUser: null,
    currentProfile:null
  };

  logUser = (loggedUser) => {
    this.setState({ loggedUser });
    this.getProfile()
  };

  getProfile = () => {
    AUTH_SERVICE.profile()
      .then((response) => {
        this.setState({currentProfile: response.data.user.profile})
        console.log('here in getProfile<<<<<<<<' + this.state.currentProfile)
      })
  }

  logOut = () => {
    AUTH_SERVICE.logOut()
      .then((response) => {
        console.log(response);
        this.setState({ loggedUser: null })
      })
      .catch((err) => console.log(err));
  };
  
  render() {
    const { state, logUser, logOut } = this;
    return (
      <MyContext.Provider value={{ state, logUser, logOut }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;