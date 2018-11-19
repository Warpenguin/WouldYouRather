import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Segment,
  Header,
  Form,
  Divider
} from "semantic-ui-react";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  };
  handleOptionOneChange = e => {
    const optionOneText = e.target.value;

    this.setState(() => ({
      optionOneText
    }));
  };
  handleOptionTwoChange = e => {
    const optionTwoText = e.target.value;

    this.setState(() => ({
      optionTwoText
    }));
  };
  handleSubmit = e => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id, author } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText, author));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: id ? false : true
    }));
  };
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Header as="h3" textAlign="center">
              Create New Question
            </Header>
            <span>Complete the question:</span>
            <Header as="h4">Would You Rather ...</Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Input
                placeholder="Enter Option One Text Here"
                value={optionOneText}
                onChange={this.handleOptionOneChange}
                className="textarea"
                maxLength={280}
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                placeholder="Enter Option Two Text Here"
                value={optionTwoText}
                onChange={this.handleOptionTwoChange}
                className="textarea"
                maxLength={280}
              />
              <Form.Button
                fluid
                color="teal"
                disabled={optionOneText === "" || optionTwoText === ""}
              >
                Submit
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    author: authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
