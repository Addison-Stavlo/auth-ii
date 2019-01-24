import React from "react";
import axios from "axios";

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
      <form onSubmit={this.login}>
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="username"
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="password"
        />
        <button type="submit">Sign In</button>
      </form>
    );
  }
}

export default SignIn;
