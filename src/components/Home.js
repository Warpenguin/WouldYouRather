import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  state = {
    answered: false
  };
  render() {
    var questionIds = this.state.answered
      ? this.props.answeredQuestionIds
      : this.props.unAnsweredQuestionIds;
    return (
      <div>
        <nav className="nav">
          <ul>
            <li
              onClick={e =>
                this.setState({
                  answered: false
                })
              }
            >
              Unanswered Questions
            </li>
            <li
              onClick={e =>
                this.setState({
                  answered: true
                })
              }
            >
              Answered Questions
            </li>
          </ul>
          <ul className="dashboard-list">
            {questionIds.map(id => (
              <li key={id}>
                <Question id={id} answered={this.state.answered} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    answeredQuestionIds: Object.keys(questions)
      .filter(
        q =>
          questions[q].optionOne.votes.indexOf(authedUser) !== -1 ||
          questions[q].optionTwo.votes.indexOf(authedUser) !== -1
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unAnsweredQuestionIds: Object.keys(questions)
      .filter(
        q =>
          questions[q].optionOne.votes.indexOf(authedUser) === -1 &&
          questions[q].optionTwo.votes.indexOf(authedUser) === -1
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  };
}

export default connect(mapStateToProps)(Home);
