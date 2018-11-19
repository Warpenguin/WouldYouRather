import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";
import LeaderBoard from "./LeaderBoard";
import NoMatch from "./NoMatch";
import { Container } from "semantic-ui-react";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar  style={{ backgroundColor: 'teal' }}/>
          <Container>
            <Nav />
            {this.props.loading === true ? (
              <Login />
            ) : (
              <div>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/questions/:id" component={QuestionPage} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            )}
          </Container>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
