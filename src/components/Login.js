import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Form, Grid, Header, Segment } from "semantic-ui-react";

class Login extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = event => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(this.state.value));
  };

  render() {
    const { users } = this.props;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Header as="h3" textAlign="center">
              Welcome to the Would You Rather App!
            </Header>
            <Header as="h4" textAlign="center">
              Please sign in to continue
            </Header>
            <Header as="h2" color="teal" textAlign="center">
              Sign in
            </Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Dropdown
                fluid
                selection
                placeholder="Select User"
                onChange={this.handleChange}
                options={Object.keys(users).map(id => {
                  return {
                    image: users[id].avatarURL,
                    text: users[id].name,
                    value: id
                  };
                })}
              />
              <Form.Button color="teal" fluid disabled={!this.state.value}>
                Submit
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users),
    users
  };
}

export default connect(mapStateToProps)(Login);
