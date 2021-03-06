import React, { useState, useEffect } from 'react';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { Grid, Menu, Segment, Header } from 'semantic-ui-react';
import styles from './App.module.css';
import LogIn from './components/Login';
import NotFound from './components/NotFound';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import TopicComments from './components/TopicComments/TopicComments';
import UserBox from './components/UserBox/UserBox';
import UserProfile from './components/UserProfile/UserProfile';


const App = (props) => {
  const [userState, setUserState] = useState({});
  const [topic, setTopic] = useState({});
  const appProps = { props };

  useEffect(() => {
    if(props.auth.getWs())
    props.auth.getWs().onopen = () => {
      console.log('WebSocket Client Connected');
    };
    return () => props.auth.getWs().close();

  }, [props.auth])

  const handleLogin = () => {
    props.auth.login();
  };

  const handleLogout = () => {
    props.auth.logout();
  };

  const handleGetUser = () => {
    return props.auth.getUser();
  };

  const generateMenu = () => {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
      </Menu>
    );
  };

  const logInLogOutButton = () => {
    if (props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={handleLogout}>
          Log Out
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item name="login" onClick={handleLogin}>
          Log In
        </Menu.Item>
      );
    }
  };

  const generateCurrentPage = () => {
    if (!props.auth.isAuthenticated()) {
      return <LogIn auth={props.auth} />;
    }

    const user = props.auth.userRegistered
      ? props.auth.userRegistered
      : userState;

    return (
      <>
        <Switch>
          <Route
            path="/register"
            exact
            render={(props) => {
              return (
                <Register
                  {...props}
                  auth={appProps.props.auth}
                  setUserState={setUserState}
                  userState={userState}
                  history={props.history}
                />
              );
            }}
          />

          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <>
                  <div className={styles.userbox}>
                    <UserBox
                      user={user}
                      className={styles.user}
                      history={props.history}
                    />
                  </div>
                  <Home
                    {...props}
                    auth={appProps.props.auth}
                    getUser={handleGetUser}
                    userState={userState}
                    setUserState={setUserState}
                    setTopic={setTopic}
                  />
                </>
              );
            }}
          />

          <Route
            path="/topic/:topicId"
            exact
            render={(props) => {
              return (
                <>
                  <div className={styles.userbox}>
                    <UserBox
                      user={user}
                      className={styles.user}
                      history={props.history}
                    />
                  </div>
                  <TopicComments
                    {...props}
                    auth={appProps.props.auth}
                    getUser={handleGetUser}
                    userState={userState}
                    setUserState={setUserState}
                    topic={topic}
                    user={user}
                  />
                </>
              );
            }}
          />

          <Route
            path="/profile"
            exact
            render={(props) => {
              return (
                <UserProfile
                  {...props}
                  auth={appProps.props.auth}
                  user={user}
                  history={props.history}
                />
              );
            }}
          />

          <Route component={NotFound} />
        </Switch>
      </>
    );
  };

  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Header as="h1" className={styles.title}>
            Hot Road
          </Header>
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={props.history}>
                {generateMenu()}

                {generateCurrentPage()}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default App;
