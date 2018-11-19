import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
  toAnsweredPoll = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}/pollAnswered`);
  };
  toUnansweredPoll = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}/pollUnanswered`);
  };
  render() {
    const { question, author, answered } = this.props;

    if (question === null) {
      return <p>This Question doesn't existd</p>;
    }

    const { id, timestamp, optionOne, optionTwo } = question;

    return (
      <Link to={`/questions/${id}/` + (answered ? 'pollAnswered' : 'pollUnanswered') } className="question">
        {/* <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        /> */}
        <div className="question-info">
          <div>
            <div>{formatDate(timestamp)}</div>
            {author && (
              <button
                className="replying-to"
                onClick={e =>
                  answered
                    ? this.toAnsweredPoll(e, id)
                    : this.toUnansweredPoll(e, id)
                }
              >
                View Poll
              </button>
            )}
            <p>{optionOne.text}</p>
            <p>{optionTwo.text}</p>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id, answered }) {
  const question = questions[id];
  const author = question && question.author ? users[question.author] : null;

  return {
    authedUser,
    question,
    author,
    answered
  };
}

export default withRouter(connect(mapStateToProps)(Question));
