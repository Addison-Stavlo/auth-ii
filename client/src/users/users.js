import React from "react";
import axios from "axios";
import styled from "styled-components";

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
      <UserDiv>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
        {this.props.isLoggedIn ? (
          <button onClick={this.logOut}>Log Out</button>
        ) : null}
      </UserDiv>
    );
  }
}

const UserDiv = styled.section`
  color: lightblue;
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h2 {
    text-decoration: underline;
    text-align: center;
  }

  ul {
    /* list-style-type: none; */

    li {
      padding: 5px;
      /* border: 1px solid lightblue; */
    }
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

export default Users;
