import React from "react";
import axios from "axios";

class Users extends React.Component {
  state = {
    users: []
  };

  async componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/signin");
    }

    const endpoint = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${endpoint}/api/userslikeme`, {
        headers: { authorization: localStorage.getItem("token") }
      });
      console.log(response);
      this.setState({ users: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  logOut = () => {
    localStorage.removeItem("token");
    this.props.toggleLogin();
    this.props.history.push("/signin");
  };

  render() {
    return (
      <>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
        {this.props.isLoggedIn ? (
          <button onClick={this.logOut}>Log Out</button>
        ) : null}
      </>
    );
  }
}

export default Users;
