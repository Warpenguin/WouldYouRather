import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/questions";

class PollUnanswered extends Component {
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { question, author, dispatch } = this.props;
    const { id } = question;

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
            this.props.history.push(`/questions/${id}/pollAnswered`);
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
