import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import PollAnswered from "./PollAnswered";
import PollUnanswered from "./PollUnanswered";
import Nav from "./Nav";
import { setAuthedUser } from "../actions/authedUser";
import LeaderBoard from "./LeaderBoard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser, dispatch } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <div>
              <div>
                <Nav />
              </div>
              {this.props.loading === false && (
                <nav className="nav">
                  <ul>
                    <li>Hello {authedUser}</li>
                    <li onClick={e => dispatch(setAuthedUser(null))}>Logout</li>
                  </ul>
                </nav>
              )}
            </div>
            {this.props.loading === true ? (
              <Login />
            ) : (
              <div>
                <Route path="/" exact component={Home} />
                <Route
                  path="/question/:id/pollAnswered"
                  component={PollAnswered}
                />
                <Route
                  path="/question/:id/pollUnanswered"
                  component={PollUnanswered}
                />
                <Route path="/new" component={NewQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  };
}

export default connect(mapStateToProps)(App);
