import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import {
  Menu,
  Item
} from "semantic-ui-react";

class Nav extends Component {
  render() {
    const { loading, dispatch, author } = this.props;
    return (
      <Menu pointing secondary color="teal">
        <Menu.Item name="Home" as={NavLink} exact to="/" />
        <Menu.Item name="New Question" as={NavLink} exact to="/add" />
        <Menu.Item name="Leaderboard" as={NavLink} exact to="/leaderboard" />
        {loading === false && (
          <Menu.Menu position="right">
            <Item>
              <Item.Content verticalAlign="middle">
                Hello {author.name}
              </Item.Content>
              <Item.Image size="tiny" src={author.avatarURL} avatar />
            </Item>
            <Menu.Item
              name="Logout"
              onClick={() => {
                this.props.history.push("/");
                dispatch(setAuthedUser(null));
              }}
            />
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    author: users[authedUser],
    loading: authedUser === null
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
