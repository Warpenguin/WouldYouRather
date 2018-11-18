import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { handleAddQuestionAnswer } from "../actions/questions";
import NewQuestion from "./NewQuestion";

class PollUnanswered extends Component {
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { question, authedUser, author, dispatch } = this.props;
    const { id, timestamp, optionOne, optionTwo } = question;

    return (
      <div>
        <h3>{author.name} asks:</h3>
        <h4>Would You Rather ...</h4>
        <div onChange={this.handleChange}>
          <input type="radio" value="optionOne" name="option" />
          {question.optionOne.text}
          <input type="radio" value="optionTwo" name="option" />
          {question.optionTwo.text}
        </div>
        <button
          className="replying-to"
          onClick={e => {
            dispatch(handleAddQuestionAnswer(id, this.state.value));
            this.props.history.push(`/question/${id}/pollAnswered`);
          }}
        >
          Submit
        </button>
      </div>
    );
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

export default connect(mapStateToProps)(PollUnanswered);
