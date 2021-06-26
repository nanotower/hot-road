import React, { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader,
} from 'semantic-ui-react';
import styles from './Home.module.css';
import Topic from '../Topic/Topic';
import { getTopics } from '../../api/forumApi';

const Home = (props) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = props.auth.userRegistered
    ? props.auth.userRegistered
    : props.userState;

  useEffect(() => {
    try {
      fetchTopics();
      setLoading(false);
    } catch (error) {
      alert(`Failed to fetch topics: ${error.message}`);
    }
  }, []);

  const fetchTopics = async () => {
    const topics = await getTopics(props.auth.getIdToken());
    setTopics(topics);
  };

  const topicsList = () =>
    loading ? (
      <Loader indeterminate active inline="centered">
        Loading Topics
      </Loader>
    ) : (
      <div className={styles.topics}>
        <Grid padded>
          {topics.map((topic, pos) => (
            <Topic topic={topic} pos={pos} />
          ))}
        </Grid>
      </div>
    );

  const userBox = () => (
    <div className={styles.user}>
      <Image src={user.attachmentUrl} avatar />
      <span>{user.userName}</span>
    </div>
  );

  return (
    <div className={styles.home}>
      {userBox()}
      <Header as="h1" className={styles.title}>
        Join the discussion
      </Header>
      {topicsList()}
    </div>
  );
};

export default Home;
