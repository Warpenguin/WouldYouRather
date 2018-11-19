import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Card,
  Button,
  Segment,
  Image,
} from "semantic-ui-react";

class Question extends Component {
  render() {
    const { question, author } = this.props;

    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }

    const { id, optionOne } = question;

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <div>
              <Image src={author.avatarURL} avatar />
              <span>{author.name} asks</span>
            </div>
          </Card.Header>
          <Segment basic>Would you rather</Segment>
          <Segment basic>..{optionOne.text.substring(0, 16)}..</Segment>
          <Link to={`/questions/${id}`}>
            <Button color="teal">View Poll</Button>
          </Link>
        </Card.Content>
      </Card>
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
