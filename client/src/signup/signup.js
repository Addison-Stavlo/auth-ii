import React from "react";
import axios from "axios";

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
      <form onSubmit={this.register}>
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="username"
        />
        <input
          name="department"
          type="text"
          value={this.state.department}
          onChange={this.handleChange}
          placeholder="department"
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="password"
        />
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

export default SignUp;
