import React from "react";
import axios from "axios";
import styled from "styled-components";

import { LogIn } from "styled-icons/feather/LogIn";

class SignIn extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  login = ev => {
    ev.preventDefault();

    const endpoint = process.env.REACT_APP_API_URL;
    axios
      .post(`${endpoint}/api/login`, this.state)
      .then(res => {
        this.props.toggleLogin();
        this.setState({ username: "", password: "" });
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <StyledForm onSubmit={this.login}>
        <h1>Sign In!</h1>
        <h3>Username:</h3>
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="username"
        />
        <h3>Password:</h3>
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="password"
        />
        <button type="submit">
          <LogInIcon />
          Sign In
        </button>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  color: lightblue;

  h1 {
    text-align: center;
    text-decoration: underline;
  }

  h3 {
    margin: 10px 0 0;
    font-size: 20px;
  }

  input {
    font-size: 16px;
  }

  button {
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      box-shadow: 0 0 5px 3px lightblue;
    }
    &:active {
      background: black;
      color: lightblue;

      svg {
        color: lightblue;
      }
    }
  }
`;

const LogInIcon = styled(LogIn)`
  color: black;
  height: 30px;
  padding-right: 20px;
`;

export default SignIn;
