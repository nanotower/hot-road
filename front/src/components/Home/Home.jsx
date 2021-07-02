import React, { useState, useEffect } from 'react';
import {
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import styles from './Home.module.css';
import Topic from './components/Topic';
import { getTopics } from '../../api/forumApi';
import CreateTopic from '../CreateTopic';

const Home = (props) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchTopics();
    } catch (error) {
      alert(`Failed to fetch topics: ${error.message}`);
    }
  }, []);

  const fetchTopics = async () => {
    const topics = await getTopics(props.auth.getIdToken());
    setTopics(topics);
    setLoading(false);
  };

  const topicsList = () => {
    const onTopicButtonClick = (topic) => {
      props.setTopic(topic);
      props.history.push(`/topic/${topic.topicId}`);
    };

    return loading ? (
      <Loader indeterminate active inline="centered">
        Loading Topics
      </Loader>
    ) : (
      <div className={styles.topics}>
        <Grid padded className={styles.grid}>
          <CreateTopic auth={props.auth} fetchTopics={fetchTopics} setLoading={setLoading} />
          {topics.map((topic, pos) => (
            <Topic
              topic={topic}
              pos={pos}
              history={props.history}
              onTopicButtonClick={onTopicButtonClick}
            />
          ))}
        </Grid>
      </div>
    );
  };

  // const userBox = () => (
  //   <div className={styles.user}>
  //     <Image src={user.attachmentUrl} avatar />
  //     <span>{user.userName}</span>
  //   </div>
  // );

  return (
    <div className={styles.home}>
      <Header as="h1" className={styles.title}>
        Join the discussion
      </Header>
      {topicsList()}
    </div>
  );
};

export default Home;
