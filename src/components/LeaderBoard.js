import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class LeaderBoard extends Component {
  render() {
    const { leaders, users } = this.props;
    return (
      <div>
        <ul className="dashboard-list">
          {Object.keys(leaders).map(id => {
            const { answered, asked } = leaders[id];
            const total = answered + asked;
            return (
              <li key={id}>
                {users[id].name} answered: {answered}, asked:{asked}, total:
                {total}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }) {
  var leaders = Object.keys(questions).reduce((acc, currValue) => {
    var question = questions[currValue];
    if (acc[question.author] === undefined) {
      acc[question.author] = { answered: 0, asked: 1 };
    } else {
      acc[question.author].asked++;
    }
    question.optionOne.votes.forEach(o => {
      if (acc[o] === undefined) {
        acc[o] = { answered: 1, asked: 0 };
      } else {
        acc[o].answered++;
      }
    });
    question.optionTwo.votes.forEach(o => {
      if (acc[o] === undefined) {
        acc[o] = { answered: 1, asked: 0 };
      } else {
        acc[o].answered++;
      }
    });
    return acc;
  }, {});
  return {
    leaders,
    users
  };
}

export default connect(mapStateToProps)(LeaderBoard);
