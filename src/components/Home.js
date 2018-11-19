import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Menu, Segment } from "semantic-ui-react";

class Home extends Component {
  state = {
    answered: false
  };
  render() {
    const { answered } = this.state;

    var questionIds = this.state.answered
      ? this.props.answeredQuestionIds
      : this.props.unAnsweredQuestionIds;
    return (
      <Segment>
        <div>
          <Menu widths={2}>
            <Menu.Item
              name="Unanswered Questions"
              active={!answered}
              onClick={e =>
                this.setState({
                  answered: false
                })
              }
            />
            <Menu.Item
              name="Answered Questions"
              active={answered}
              onClick={e =>
                this.setState({
                  answered: true
                })
              }
            />
          </Menu>
        </div>
        <ul className="dashboard-list">
          {questionIds.map(id => (
            <Question key={id} id={id} answered={this.state.answered} />
          ))}
        </ul>
      </Segment>
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
