import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import "./App.css";
import SignUp from "./signup/signup";
import SignIn from "./signin/signin";
import Users from "./users/users";

class App extends Component {
  state = {
    signedIn: false
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: { authorization: token }
        })
        .then(res => {
          this.setState({ signedIn: true });
          this.props.history.push("/users");
        })
        .catch(err => console.log(err));
    }
  }

  toggleLogin = () => {
    this.setState({ signedIn: !this.state.signedIn });
  };

  render() {
    return (
      <>
        <StyledHeader>
          <nav>
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;&nbsp;
            <NavLink to="/users">Users</NavLink>
          </nav>
        </StyledHeader>

        <main>
          <Route
            path="/signup"
            render={props => (
              <SignUp {...props} toggleLogin={this.toggleLogin} />
            )}
          />

          <Route
            path="/signin"
            render={props => (
              <SignIn {...props} toggleLogin={this.toggleLogin} />
            )}
          />

          <Route
            path="/users"
            render={props => (
              <Users
                {...props}
                isLoggedIn={this.state.signedIn}
                toggleLogin={this.toggleLogin}
              />
            )}
          />
        </main>
      </>
    );
  }
}

const StyledHeader = styled.header`
  border-bottom: 1px solid lightblue;

  nav {
    width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  a,
  a:visited {
    color: lightblue;
    padding: 5px;
    text-decoration: none;
  }

  a.active {
    color: white;
    font-weight: bold;
    border: 1px solid white;
  }
`;

export default withRouter(App);
