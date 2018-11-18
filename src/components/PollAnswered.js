import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import NewQuestion from "./NewQuestion";

class PollAnswered extends Component {
  render() {
    const { question, authedUser, author } = this.props;
    const { id, timestamp, optionOne, optionTwo } = question;

    const totalVotes = optionOne.votes.length + optionTwo.votes.length

    return (
      <div>
        <h3>Asked by {author.name}</h3>
        <h4>Results:</h4>
        <h5>{optionOne.text} {optionOne.votes.indexOf(authedUser) != -1 ? '(Your vote)' : ''}</h5>
        <h5>{optionOne.votes.length / totalVotes * 100}%</h5>
        <h5>{optionOne.votes.length} out of {totalVotes} votes</h5>
        <h5>{optionTwo.text} {optionTwo.votes.indexOf(authedUser) != -1 ? '(Your vote)' : ''}</h5>
        <h5>{optionTwo.votes.length / totalVotes * 100}%</h5>
        <h5>{optionTwo.votes.length} out of {totalVotes} votes</h5>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id];
  const author = question && question.author ? users[question.author] : null;

  return {
    authedUser,
    question,
    author
  };
}

export default connect(mapStateToProps)(PollAnswered);
