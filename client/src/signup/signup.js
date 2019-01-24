import React from "react";
import axios from "axios";
import styled from "styled-components";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  register = ev => {
    ev.preventDefault();

    const endpoint = process.env.REACT_APP_API_URL;
    axios
      .post(`${endpoint}/api/register`, this.state)
      .then(res => {
        this.props.toggleLogin();
        this.setState({ username: "", password: "", department: "" });
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <StyledForm onSubmit={this.register}>
        <h3>Username:</h3>
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="username"
        />
        <h3>Department:</h3>
        <input
          name="department"
          type="text"
          value={this.state.department}
          onChange={this.handleChange}
          placeholder="department"
        />
        <h3>Password:</h3>
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="password"
        />
        <button type="submit">Sign Up</button>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;

  h3 {
    color: lightblue;
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

    &:hover {
      box-shadow: 0 0 5px 3px lightblue;
    }
    &:active {
      background: black;
      color: lightblue;
    }
  }
`;

export default SignUp;
