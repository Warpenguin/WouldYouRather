import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

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
      <div>
        <h3 className="center">Create new Question</h3>
        <h3 className="center">Complete the question:</h3>
        <h3 className="center">Would you rather ...:</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter Option One Text Here?"
            value={optionOneText}
            onChange={this.handleOptionOneChange}
            className="textarea"
            maxLength={280}
          />
          <h3 className="center">OR</h3>
          <textarea
            placeholder="Enter Option Two Text Here?"
            value={optionTwoText}
            onChange={this.handleOptionTwoChange}
            className="textarea"
            maxLength={280}
          />
          <button
            className="btn"
            type="submit"
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    author: authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
