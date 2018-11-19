import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";
import {
  Card,
  Button,
  Segment,
  Header,
  Image,
  Form,
  Radio,
  Progress
} from "semantic-ui-react";

class QuestionPage extends Component {
  state = {
    answered: false
  };

  handleChange = (e, { value }) => this.setState({ value });

  renderUnanswered = () => {
    const { question, author, dispatch } = this.props;
    const { id } = question;

    return (
      <Card centered>
        <Card.Content>
          <Card.Header>
            <div>
              <Image src={author.avatarURL} avatar />
              <span>{author.name} asks</span>
            </div>
          </Card.Header>
          <Header as="h4">Would You Rather ...</Header>
          <Form>
            <Form.Field>
              <Radio
                label={question.optionOne.text}
                name="radioGroup"
                value="optionOne"
                checked={this.state.value === "optionOne"}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label={question.optionTwo.text}
                name="radioGroup"
                value="optionTwo"
                checked={this.state.value === "optionTwo"}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form>
          <br />
          <Button
            color="teal"
            disabled={!this.state.value}
            onClick={e => {
              dispatch(handleAddQuestionAnswer(id, this.state.value));
              this.setState({ answered: true });
            }}
          >
            View Poll
          </Button>
        </Card.Content>
      </Card>
    );
  };

  renderAnswered = () => {
    const { question, authedUser, author } = this.props;
    const { optionOne, optionTwo } = question;

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    return (
      <Card centered>
        <Card.Content>
          <Card.Header>
            <div>
              <Image src={author.avatarURL} avatar />
              <span>Asked by {author.name}</span>
            </div>
          </Card.Header>
          <Segment basic>Results</Segment>
          <Segment
            color={optionOne.votes.indexOf(authedUser) !== -1 ? "teal" : null}
          >
            <div>
              {optionOne.text}{" "}
              <strong>
                {optionOne.votes.indexOf(authedUser) !== -1
                  ? "(Your vote)"
                  : ""}
              </strong>
            </div>
            <Progress
              percent={
                totalVotes
                  ? Math.round((optionOne.votes.length / totalVotes) * 1000) /
                    10
                  : 0
              }
              color="teal"
              progress
            />
            <h5>
              {optionOne.votes.length} out of {totalVotes} votes
            </h5>
          </Segment>
          <Segment
            color={optionTwo.votes.indexOf(authedUser) !== -1 ? "teal" : null}
          >
            <div>
              {optionTwo.text}{" "}
              <strong>
                {optionTwo.votes.indexOf(authedUser) !== -1
                  ? "(Your vote)"
                  : ""}
              </strong>
            </div>
            <Progress
              percent={
                totalVotes
                  ? Math.round((optionTwo.votes.length / totalVotes) * 1000) /
                    10
                  : 0
              }
              color="teal"
              progress
            />
            <h5>
              {optionTwo.votes.length} out of {totalVotes} votes
            </h5>
          </Segment>
        </Card.Content>
      </Card>
    );
  };

  componentDidMount() {
    const { question, authedUser } = this.props;

    if (!this.props.question) {
      return <Redirect to="/nomatch" />;
    }

    this.setState({
      answered:
        question.optionOne.votes.indexOf(authedUser) !== -1 ||
        question.optionTwo.votes.indexOf(authedUser) !== -1
    });
  }

  render() {
    if (!this.props.question) {
      return <Redirect to="/nomatch" />;
    }

    return this.state.answered
      ? this.renderAnswered()
      : this.renderUnanswered();
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const author = question && question.author ? users[question.author] : null;

  return {
    authedUser,
    question,
    author
  };
}

export default connect(mapStateToProps)(QuestionPage);
